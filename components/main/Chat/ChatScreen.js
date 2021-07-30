import React, { useEffect, useState, useRef } from 'react';
import {FlatList, ImageBackground, View, TouchableOpacity, Text, Alert, TextInput} from 'react-native'
import { useRoute } from '@react-navigation/native';
import Api from '../../Api/Api';
import { firebase } from '../../Api/firebaseConfig';
import ChatMessage from './ChatMessage'
import InputBox from './InputBox'
// import BG from '../../../images/BG.png'
import {
    MaterialIcons,
    FontAwesome5,
  } from '@expo/vector-icons';
import { RTCPeerConnection, RTCIceCandidate, RTCSessionDescription} from 'react-native-webrtc';
import GettingCall from './GettingCall';
import Video from './Video';
import Utils from '../../../Utils';

const configuration = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };
function ChatScreen({ navigation }) {
    function LogoTitle() {
        return (
            <View style={{
                flexDirection: 'row',
                width: 70,
                justifyContent: 'space-between',
                marginRight: 10,
              }}>
                <FontAwesome5 name="video" size={24} color={'midnightblue'} onPress={create} />
                <MaterialIcons name="call" size={24} color={'midnightblue'} onPress={() => Alert.alert('Call')}/>
            
              </View>
        );
      }
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    const route = useRoute();
    // const body = useRef();
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: props => <LogoTitle {...props} /> 
        });
      }, [navigation]);
    let u = firebase.auth().currentUser;
    let user = {
        id: u.uid,
        name: u.displayName,
        avatar: u.photoURL,
        email: u.email
    };
    useEffect(() => {
        setMessages([]);
        let unsub = Api.onChatContent(route.params.id, setMessages, setUsers);
        return unsub;
    }, [route.params.id]);
  
  const yourRef = useRef();

  const [localStream, setLocalStream] = useState();
    const [remoteStream, setRemoteStream] = useState();
    const [gettingCall, setGettingCall] = useState(false);
    const pc = useRef();
    const connecting = useRef(false);
    const chatId = route.params.id;
    useEffect(() => {
        const cRef = firebase.firestore().collection('meet').doc(chatId);
        const subscribe = cRef.onSnapshot(snapshot => {
            const data = snapshot.data();
            if (pc.current && !pc.current.remoteDescription && data && data.answer) {
                pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
            }
            if (data && data.offer && !connecting.current) {
                setGettingCall(true);
            }
        });
        const subscribeDelete = cRef.collection('callee').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type == 'removed') {
                    hangup();
                }
            });
        });
        return () => {
            subscribe();
            subscribeDelete();
        };
    }, []);
    const setupWebrtc = async () => {
        pc.current = new RTCPeerConnection(configuration);
        const stream = await Utils.getStream();
        if (stream) {
            setLocalStream(stream);
            pc.current.addStream(stream);
        }
        pc.current.onaddstream = (event) => {
            setRemoteStream(event.stream);
        };
    };
    const create = async () => {
        console.log("calling");
        connecting.current = true;
        await setupWebrtc();
        const cRef = firebase.firestore().collection("meet").doc(chatId);
        collectIceCandidates(cRef,"caller", "callee");
        if (pc.current) {
            const offer = await pc.current.createOffer();
            pc.current.setLocalDescription(offer);
            const cWithOffer = {
                offer: {
                    type: offer.type,
                    sdp: offer.sdp
                },
            };
            cRef.set(cWithOffer);
        }
    };
    const join = async () => {
        console.log("Joining the call");
        connecting.current = true;
        setGettingCall(false);
        const cRef = firebase.firestore().collection('meet').doc(chatId);
        const offer = (await cRef.get()).data()?.offer;
        if (offer) {
            await setupWebrtc();
            collectIceCandidates( cRef,"callee", "caller");
            if (pc.current) {
                pc.current.setRemoteDescription(new RTCSessionDescription(offer));
                const answer = await pc.current.createAnswer();
                pc.current.setLocalDescription(answer);
                const cWithAnswer = {
                    answer: {
                        type: answer.type,
                        sdp: answer.sdp
                    },
                };
                cRef.update(cWithAnswer);
            }
        }
    };
    const hangup = async () => {
        setGettingCall(false);
        connecting.current = false;
        streamCleanUp();
        firestoreCleanUp();
        if (pc.current) {
            pc.current.close();
        }
    };
    const streamCleanUp = async () => {
        if (localStream) {
            localStream.getTracks().forEach((t) => t.stop());
            localStream.release();
        }
        setLocalStream(null);
        setRemoteStream(null);
    };
    const firestoreCleanUp = async () => {
        const cRef = firebase.firestore().collection('meet').doc(chatId);
        if (cRef) {
            const calleeCandidate = await cRef.collection('callee').get();
            calleeCandidate.forEach(async (candidate) => {
                await candidate.ref.delete();
            });
            const callerCandidate = await cRef.collection('caller').get();
            callerCandidate.forEach(async (candidate) => {
                await candidate.ref.delete();
            });
            cRef.delete();
        }
    };
 
    const collectIceCandidates = async ( cRef,localName, remoteName) => {
       
        const candidateCollection =  cRef.collection(localName);
        if (pc.current) {
            pc.current.onicecandidate = (event) => {
                if (event.candidate) {
                    candidateCollection.add(event.candidate.toJSON());
                }
            };
        }
        cRef.collection(remoteName).onSnapshot(snapshot => {
            snapshot.docChanges().forEach((change) => {
                if (change.type == 'added') {
                    const candidate = new RTCIceCandidate(change.doc.data());
                    pc.current?.addIceCandidate(candidate)
                }
            });
        });
    };
    if (gettingCall) {
        return <GettingCall hangup={hangup} join={join}/>;
    }
    if (localStream) {
        return (<Video hangup={hangup} localStream={localStream} remoteStream={remoteStream}/>);
    }
    
  
    return (
      
          <View style={{width: '100%', height: '100%'}} >
        <FlatList 
          ref={yourRef}
          inverted={true}
          data={messages}        
          renderItem={({ item, key }) => <ChatMessage myId={user.id} message={item} index={key} />}
          keyExtractor={(_, index) => index.toString()}
          // Changing the key of the flatlist otherwise it doesn't update
          
        />
         
        <InputBox chatRoomID={route.params.id} />
        </View>
     
                
    );
}

export default ChatScreen;

