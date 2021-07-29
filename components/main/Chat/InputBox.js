import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, PermissionsAndroid} from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import Api from '../../Api/Api';
import { firebase } from '../../Api/firebaseConfig';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
} from '@expo/vector-icons';

const InputBox = (props) => {

  const { chatRoomID } = props;
  const [messages, setMessages] = useState([]);
   const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] =useState(false);
  const [myUserId, setMyUserId] = useState(null);
  const [recording, setRecording] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await firebase.auth().currentUser;
      setMyUserId(userInfo.uid);
    }
    fetchUser();
  }, [])
  useEffect(() => {
    setMessages([]);
    let unsub = Api.onChatContent(chatRoomID, setMessages, setUsers);
    return unsub;
}, [chatRoomID]);

async function startRecording() {
  const { status, permissions } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
  if(status === 'granted') {
    console.log('Requesting permissions..');
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    }); 
    console.log('Starting recording..');
    const { recording } = await Audio.Recording.createAsync(
       Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
    );
    setRecording(recording);
    console.log('Recording started');
  } else  {
    throw new Error('Location permission not granted');
  }
}
async function stopRecording() {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    playsInSilentLockedModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
  });

  setRecording(undefined);
  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();
  await Api.sendMessage(chatRoomID, myUserId,'sound', uri, users);
  console.log('Recording stopped and stored at', uri);
}
 
  const handleInputKeyUp = (e) => {
    if (e.keyCode === 13) {
        handleSendClick();
    }
}

const handleSendClick = () => {
    if (message !== '') {
        Api.sendMessage(chatRoomID, myUserId,'text', message, users);
        setMessage('');
        
    }
}
// const onPress = () => {
//     if (!message) {
//       handleMicClick();
//     } else {
//         handleSendClick();
//     }
//   }
  const _selectFile =async () => {
   
      const res = await DocumentPicker.getDocumentAsync({
        
      });
      // Api.sendMessage(chatRoomID, myUserId,allFiles , uploadFile(res), users);
      // setMessage('');
      console.log(res);

      if (!res.cancelled) {
        
        Api.sendMessage(chatRoomID, myUserId, 'document', res.uri , users);
      }
  }

 const  _askPermission = async (failureMessage) => { 
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "denied") {
      alert(failureMessage);
    }
  };
  const _takePhoto = async () => {
    await _askPermission(
      "We need the camera permission to take a picture..."
    );
    let pickerResult = await ImagePicker.launchCameraAsync({
      base64: true,
      aspect: [4, 3],
    });

    _handleImagePicked(pickerResult);
  }

  const _pickImage = async() => {
    await _askPermission(
      "We need the camera-roll permission to read pictures from your phone..."
    );

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      aspect: [4, 3],
    });

    _handleImagePicked(pickerResult);
  }

  const _handleImagePicked = async (pickerResult) => {
    try {
      setUploading(true);

      if (!pickerResult.cancelled) {
        let imageUri = pickerResult ? `data:image/jpg;base64,${pickerResult.base64}` : null;
        Api.sendMessage(chatRoomID, myUserId,'photo', imageUri , users);
        setMessage('');
      }
                
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
       setUploading(false );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{width: '100%'}}
    >
      <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TouchableOpacity>
        <FontAwesome5 name="laugh-beam" size={24} color="grey" />
        </TouchableOpacity>
        <TextInput
          placeholder={"Type a message"}
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          onKeyUp={handleInputKeyUp}
        />
        <TouchableOpacity onPress={_selectFile}>
        <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={_pickImage}>
        {!message && <Entypo name="image" size={24} color="grey" style={styles.icon} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={_takePhoto}>
        {!message && <Fontisto name="camera" size={24} color="grey" style={styles.icon} />}
        </TouchableOpacity>
      </View>
      
        <View style={styles.buttonContainer}>
          {!message
            ? <TouchableOpacity
               onPressIn={startRecording}
               onPressOut={stopRecording}>
              <MaterialCommunityIcons name="microphone" size={24} color={ recording ? "#126EcE":"#919191"} />
              </TouchableOpacity>
            : <TouchableOpacity onPress={handleSendClick}>
              <MaterialIcons name="send" size={26} color="white" />
            </TouchableOpacity>
            }
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default InputBox;
  
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-end',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    height: 60,
    borderRadius: 25,
    marginRight: 10,
    flex: 1,
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    backgroundColor: '#0C6157',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
})