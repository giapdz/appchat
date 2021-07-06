import React, { useEffect, useState, useRef } from 'react';
import {FlatList, ImageBackground, View, TouchableOpacity, Text, Alert, TextInput} from 'react-native'
import { useRoute } from '@react-navigation/native';

import Peer from "simple-peer"
import io from "socket.io-client"
import Api from '../../Api/Api';
import firebase from 'firebase'
import ChatMessage from './ChatMessage'
import InputBox from './InputBox'
// import BG from '../../../images/BG.png'
import {
    MaterialIcons,
    FontAwesome5,
  } from '@expo/vector-icons';
// import CopyToClipboard from 'react-copy-to-clipboard';
// const socket = io.connect('http://localhost:5000')


function ChatScreen({ navigation }) {
    function LogoTitle() {
        return (
            <View style={{
                flexDirection: 'row',
                width: 70,
                justifyContent: 'space-between',
                marginRight: 10,
              }}>
                <FontAwesome5 name="video" size={24} color={'midnightblue'} onPress={() => Alert.alert('Video') } />
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

  //        socket.on("callUser", (data) => {
  //            setReceivingCall(true)
  //            setCaller(data.from)
  //            setName(data.name)
  //            setCallerSignal(data.signal)
  //        })
  //    }, [])

  //    const callUser = (id) => {
  //        const peer = new Peer({
  //            initiator: true,
  //            trickle: false,
  //            stream: stream
  //        })
  //        peer.on("signal", (data) => {
  //            socket.emit("callUser", {
  //                userToCall: id,
  //                signalData: data,
  //                from: me,
  //                name: name
  //            })
  //        })
  //        peer.on("stream", (stream) => {

  //            userVideo.current.srcObject = stream

  //        })
  //        socket.on("callAccepted", (signal) => {
  //            setCallAccepted(true)
  //            peer.signal(signal)
  //        })

  //        connectionRef.current = peer
  //    }

  //    const answerCall = () => {
  //        setCallAccepted(true)
  //        const peer = new Peer({
  //            initiator: false,
  //            trickle: false,
  //            stream: stream
  //        })
  //        peer.on("signal", (data) => {
  //            socket.emit("answerCall", { signal: data, to: caller })
  //        })
  //        peer.on("stream", (stream) => {
  //            userVideo.current.srcObject = stream
  //        })

  //        peer.signal(callerSignal)
  //        connectionRef.current = peer
  //    }

  //    const leaveCall = () => {
  //        setCallEnded(true)
  //        connectionRef.current.destroy()
  //    }
    
  //    const [vidCon, setVidCon] = useState("");

  //    const handleVideoOn = () => {
  //        setVidCon(true)
  //   }
  //   const handleVideoOff = () => {
  //        setVidCon(false)
  //    }
  // const [useInverted, setUseInverted] = React.useState(false);
  // const [reversing, setReversing] = React.useState(false);
  
  // const loadTop = React.useCallback(() => {
  //     if (!useInverted) {
  //         setUseInverted(true);
  //         setReversing(true);
  //     } else {
  //        // Load old messages
  //     }
  // }, [useInverted]);
  
  // const loadBottom = React.useCallback(() => {
  //     if (useInverted) {
  //         setUseInverted(false);
  //         setReversing(true);
  //     } else {
  //        // Load recent messages
  //     }
  // }, []);
  
  // React.useEffect(() => {
  //         // Should be called after FlatList rerendered completely
  //         if(reversing){
  //             FlatList.current.scrollToEnd({ animated: false }); // <--- THIS doesn't work. List stays at start
  //             if (useInverted) {
  //                 loadTop();
  //             }else{
  //                 loadBottom();
  //         }
  // }
  // }, [useInverted, loadBottom, loadTop ]);
  const yourRef = useRef();
    // useEffect(()=> {
    //   setTimeout(() => {
    //     yourRef.current.scrollToEnd();
    //   });
    // })
    return (
      
          <View style={{width: '100%', height: '100%'}} >
        <FlatList 
          ref={yourRef}
          inverted={true}
          // onContentSizeChange={() => yourRef.current.scrollToEnd({ animated: false, index: -1 })  }
          // onLayout={() => yourRef.current.scrollToEnd( ) }
          data={messages}        
          renderItem={({ item, key }) => <ChatMessage myId={user.id} message={item} index={key} />}
          keyExtractor={(item) => item.id}
          // Changing the key of the flatlist otherwise it doesn't update
          
        />
         
        <InputBox chatRoomID={route.params.id} />
        </View>
     
                
    );
}

export default ChatScreen;

