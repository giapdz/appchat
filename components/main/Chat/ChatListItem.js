import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import moment from "moment";
import { useNavigation } from '@react-navigation/native';


const ChatListItem = (props) => {
    const { chatRoom } = props;
    let message=chatRoom.lastMessage;
    const navigation = useNavigation();
  
  let authorName = (chatRoom.author== chatRoom.with) ? chatRoom.title : 'You' 
  
    const onClick = () => {
      navigation.navigate('Chat', {
        id: chatRoom.chatId,
        name: chatRoom.title,
      })
    }
  
    if (!chatRoom.with) {
      return null;
    }
  
    return (
      <TouchableWithoutFeedback onPress={onClick}>
        <View style={styles.container}>
          <View style={styles.lefContainer}>
            <Image source={{ uri: chatRoom.image }} style={styles.avatar}/>
  
            <View style={styles.midContainer}>
              <Text style={styles.username}>{chatRoom.title}</Text>
              <Text
                numberOfLines={2}
                style={styles.lastMessage}>
                {(() => {
                if(message && !String(message).includes('data:image/jpg')) {
                  return ( `${authorName}: ${chatRoom.lastMessage}`)
                }
                
                else if ( String(message).includes('data:image/jpg')) {
                  return ( `${authorName}: sent a photo`)
                }
                else if(!message) return (" ")
                })()}
              </Text>
            </View>
  
          </View>
  
          <Text style={styles.time}>
              {
            moment(chatRoom.lastMessageDate).format("DD/MM/YYYY")
              }
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  };
  
  export default ChatListItem;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: "100%",
      justifyContent: 'space-between',
      padding: 10,
      marginTop: 22
    },
    lefContainer: {
      flexDirection: 'row',
    },
    midContainer: {
      justifyContent: 'space-around'
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 50,
      marginRight: 15,
    },
    username: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    lastMessage: {
      fontSize: 16,
      color: 'grey',
    },
    time: {
      fontSize: 14,
      color: 'grey'
    },
  });