import React, { useState } from 'react'
import { View, Image, Button, Text } from 'react-native'
import * as ImagePicker from "expo-image-picker";
import Api from '../../Api/Api';
import { useNavigation } from '@react-navigation/native';

const EditAvatar= ()=> {
  
  const [avatarImage, setAvatarImage] =useState(null); 
  const navigation = useNavigation();
  //   _askPermission = async (failureMessage) => { 
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  //   if (status === "denied") {
  //     alert(failureMessage);
  //   }
  // };
  //  _takePhoto = async () => {
  //   await _askPermission(
  //     "We need the camera permission to take a picture..."
  //   );
  //   const options = {
  //     noData: true
  //   }
  //    await  ImagePicker.launchCameraAsync(options, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker')
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error)
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton)
  //     } else {
  //       const source = { uri: response.uri }
  //       // console.log(source)
  //       this.setState({
  //         avatarImage: source
  //       })
  //     }
  //   })

  // }

  //  _pickImage = async() => {
  //   await _askPermission(
  //     "We need the camera-roll permission to read pictures from your phone..."
  //   );
  //   const options = {
  //     noData: true
  //   }
  //    ImagePicker.launchImageLibraryAsync(options, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker')
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error)
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton)
  //     } else {
  //       const source = { uri: response.uri }
  //       // console.log(source)
  //       this.setState({
  //         avatarImage: source
  //       })
  //     }
  //   })

    
  // }
  const _askPermission = async (failureMessage) => { 
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
     
    });

    _handleImagePicked(pickerResult);
  }

const _pickImage = async() => {
    await _askPermission(
      "We need the camera-roll permission to read pictures from your phone..."
    );

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
    });

    _handleImagePicked(pickerResult);
  }

   const _handleImagePicked = async (pickerResult) => {
    try {
      if (!pickerResult.cancelled) {
        let imageUri = pickerResult;
        // Api.sendMessage(chatRoomID, myUserId,'photo', imageUri , users);
        // setMessage('');
        // const source = { uri: response.uri }
        // console.log(source)
          
          setAvatarImage(imageUri)
      }
                
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
       
    }
  };

  
  // selectImage = () => {
  //   const options = {
  //     noData: true
  //   }
  //   ImagePicker.launchImageLibrary(options, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker')
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error)
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton)
  //     } else {
  //       const source = { uri: response.uri }
  //       // console.log(source)
  //       this.setState({
  //         avatarImage: source
  //       })
  //     }
  //   })
  // }

  const onSubmit = async () => {
    try {
      const avatar=avatarImage;
     await Api.uploadAvatar(avatar.uri)
    
    setAvatarImage(null)
     navigation.navigate('Profile')
    } catch (e) {
      console.error(e)
    }
    
  }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
           {avatarImage ? 
                    ( <Image
              source={avatarImage}
              style={{ width: 300, height: 300 }}
            />
         )
           : 
           ( 
             <View>
            <View style={{
            alignItems: 'center',
            padding: 10,
            margin: 10
          }} >
            <Button
              title="Add an image"
              onPress={_pickImage}
              />
            </View>
            <View style={{
              alignItems: 'center',
              padding: 10,
              marginBottom: 30
            }} >
            <Button
            title="take an image"
            onPress={_takePhoto}
            />
            </View>
    
            </View>
           ) 
          }
        </View>
        <View style={{ marginTop: 30 }}>
        <Button
        title="add post"
          status='success'
          onPress={onSubmit}
          />
          </View>
      </View>
    )
}

export default EditAvatar