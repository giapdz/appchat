import React, { useEffect, useState, useRef } from 'react';
import {FlatList, ImageBackground, View, TouchableOpacity, Text, Alert} from 'react-native'
import { useRoute } from '@react-navigation/native';
import { Header } from 'react-native-elements';
// import EmojiPicker from 'emoji-picker-react';
// import Peer from "simple-peer"
// import io from "socket.io-client"
// import MessageItem from './MessageItem';
import Api from '../auth/Api';
import firebase from 'firebase'
import ChatMessage from './ChatMessage'
import InputBox from './InputBox'
import BG from '../../images/BG.png'
import {
    MaterialIcons,
    FontAwesome5,
  } from '@expo/vector-icons';
// const socket = io.connect('http://localhost:5000')
// function LogoTitle() {
//     return (
//         <View style={{
//             flexDirection: 'row',
//             width: 100,
//             justifyContent: 'space-between',
//             marginRight: 10,
//           }}>
//             <FontAwesome5 name="video" size={24} color={'midnightblue'} />
//             <MaterialIcons name="call" size={24} color={'midnightblue'} />
//             <MaterialCommunityIcons name="dots-vertical" size={24} color={'midnightblue'} />
//           </View>
//     );
//   }

function ChatScreen({ navigation }) {
    function LogoTitle() {
        return (
            <View style={{
                flexDirection: 'row',
                width: 70,
                justifyContent: 'space-between',
                marginRight: 10,
              }}>
                <FontAwesome5 name="video" size={24} color={'midnightblue'} onPress={() => Alert.alert('Video')} />
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

    // useEffect(() => {
    //     if (body.current.scrollHeight > body.current.offsetHeight) {
    //         body.current.scrollTop = body.current.scrollheight - body.current.offsetHeight;
    //     }
    // }, [messages])

    // const handleEmojiClick = (e, emojiObject) => {
    //     setText(text + emojiObject.emoji);
    // }

    // const handleOpenEmoji = () => {
    //     setEmojiOpen(true);
    // }

    // const handleCloseEmoji = () => {
    //     setEmojiOpen(false);
    // }

    // const handleMicClick = () => {
    //     if (recognition !== null) {
    //         recognition.onstart = () => {
    //             setListening(true);
    //         }
    //         recognition.onend = () => {
    //             setListening(false);
    //         }
    //         recognition.onresult = (e) => {
    //             setText(e.results[0][0].transcript);
    //         }
    //         recognition.start();
    //     }
    // }


    // {/*Viseo*/}
    // const [ me, setMe ] = useState("")
	// const [ stream, setStream ] = useState()
	// const [ receivingCall, setReceivingCall ] = useState(false)
	// const [ caller, setCaller ] = useState("")
	// const [ callerSignal, setCallerSignal ] = useState()
	// const [ callAccepted, setCallAccepted ] = useState(false)
	// const [ idToCall, setIdToCall ] = useState("")
	// const [ callEnded, setCallEnded] = useState(false)
	// const [ name, setName ] = useState("")
	// const myVideo = useRef()
	// const userVideo = useRef()
    // const connectionRef = useRef()
    
    // useEffect(() => {
    //     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
    //         setStream(stream)
    //         myVideo.current.srcObject = stream
    //     })

    //     socket.on("me", (id) => {
    //         setMe(id)
    //     })

    //     socket.on("callUser", (data) => {
    //         setReceivingCall(true)
    //         setCaller(data.from)
    //         setName(data.name)
    //         setCallerSignal(data.signal)
    //     })
    // }, [])

    // const callUser = (id) => {
    //     const peer = new Peer({
    //         initiator: true,
    //         trickle: false,
    //         stream: stream
    //     })
    //     peer.on("signal", (data) => {
    //         socket.emit("callUser", {
    //             userToCall: id,
    //             signalData: data,
    //             from: me,
    //             name: name
    //         })
    //     })
    //     peer.on("stream", (stream) => {

    //         userVideo.current.srcObject = stream

    //     })
    //     socket.on("callAccepted", (signal) => {
    //         setCallAccepted(true)
    //         peer.signal(signal)
    //     })

    //     connectionRef.current = peer
    // }

    // const answerCall = () => {
    //     setCallAccepted(true)
    //     const peer = new Peer({
    //         initiator: false,
    //         trickle: false,
    //         stream: stream
    //     })
    //     peer.on("signal", (data) => {
    //         socket.emit("answerCall", { signal: data, to: caller })
    //     })
    //     peer.on("stream", (stream) => {
    //         userVideo.current.srcObject = stream
    //     })

    //     peer.signal(callerSignal)
    //     connectionRef.current = peer
    // }

    // const leaveCall = () => {
    //     setCallEnded(true)
    //     connectionRef.current.destroy()
    // }
    
    // const [vidCon, setVidCon] = useState("");

    // const handleVideoOn = () => {
    //     setVidCon(true)
    // }

    // const handleVideoOff = () => {
    //     setVidCon(false)
    // }
    
    const yourRef = useRef(null);
   
    
    return (
      
        <ImageBackground style={{width: '100%', height: '100%'}} source={BG}>
        <FlatList 
          ref={yourRef}
          onContentSizeChange={() => yourRef.current.scrollToEnd() }
          onLayout={() => yourRef.current.scrollToEnd( ) }
          data={messages}        
          renderItem={({ item, key }) => <ChatMessage myId={user.id} message={item} index={key} />}
          keyExtractor={(item) => item.id}
        />
  
        <InputBox chatRoomID={route.params.id} />
        
      </ImageBackground>
                
    );
}

export default ChatScreen;

