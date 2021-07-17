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
  
  const yourRef = useRef();
  
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

