import React from 'react';
import {Text, View, StyleSheet, Dimensions,Image} from 'react-native';
import moment from "moment";


const ChatMessage = (props) => {
  const { message, myId } = props;

  const isMyMessage = () => {
    return message.author === myId;
  }

  return (
    // <View style={styles.container}>
    //   <View style={[
    //     styles.messageBox, {
    //       backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
    //       marginLeft: isMyMessage() ? 50 : 0,
    //       marginRight: isMyMessage() ? 0 : 50,
    //     }
    //   ]}>
    //     {!isMyMessage() && <Text style={styles.name}>{message.title}</Text>}
    //     <Text style={styles.message}>{message.body}</Text>
    //     <Text style={styles.time}>{moment(message.date).fromNow()}</Text>
    //   </View>
    // </View>

<View style={{ marginVertical: 5, maxWidth: Dimensions.get('window').width / 2 + 10, alignSelf: isMyMessage() ? 'flex-end' : 'flex-start' }}>
<View style={{ borderRadius: 20, backgroundColor: isMyMessage() ? '#DCF8C5' : '#ccc' }}>
    {message.type === "text" || message.type ==="document" ? <Text style={{ padding: 10, fontSize: 16, fontWeight: 'bold' }}>
        {message.body} {"   "} <Text style={{ fontSize: 12 }}>{moment(message.date).fromNow()}</Text>
    </Text> :
        <View>
            <Image source={{ uri: message.body }} style={{ width: Dimensions.get('window').width / 2 + 10, height: 150, resizeMode: 'stretch', borderRadius: 30 }} />
            <Text style={{ fontSize: 12,position:'absolute',bottom:5,right:5 }}>{moment(message.date).fromNow()}</Text>
        </View>
    }
</View>
</View>
  )
}

export default ChatMessage;
const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    messageBox: {
      borderRadius: 5,
      padding: 10,
    },
    name: {
      color: '#0C6157',
      fontWeight: "bold",
      marginBottom: 5,
    },
    message: {
  
    },
    time: {
      alignSelf: "flex-end",
      color: 'grey'
    }
  });