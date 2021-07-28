import React, { Component, useEffect, useState } from 'react'
import { Card, Icon,Avatar } from 'react-native-elements'
import {
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { firebase } from "../../Api/firebaseConfig"
import Api from '../../Api/Api'

import Email from './Email'
import Separator from './Separator'
import Tel from './Tel'
import { useNavigation } from '@react-navigation/native';
const Profile =() => {
  const navigation = useNavigation();
  const [userDetails,setUserDetails]=useState({});

  useEffect (()=>{
    fetchUserDetails()
  },[userDetails])
  
  const fetchUserDetails = async () => {
    try {
      const user= await Api.getUserDetails()
      setUserDetails(user)
    } catch (error) {
      console.log(error)
    }
  }
  const onPressPlace = () => {
    console.log('place')
  }

  const onPressTel = number => {
    Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err))
  }

  const onPressSms = () => {
    console.log('sms')
  }

  const onPressEmail = email => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err =>
      console.log('Error:', err)
    )
  }

  // renderHeader = () => {


  //   const {
  //     avatar,
  //     avatarBackground,
  //     name,
  //     // address: { city, country },
  //   } = this.state.userDetails
   
  //   return (
  //     <View style={styles.headerContainer}>
  //       {/* <ImageBackground
  //         style={styles.headerBackgroundImage}
  //         blurRadius={10}
  //         source={{uri: avatarBackground}}
  //       > */}
  //         <View style={styles.headerColumn}>
  //           <View>
  //           <Image         
  //             style={styles.userImage}
  //             source={{uri: avatar}}
  //           />
  //            <View style={styles.add}>
  //             <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('EditAvatar')}}>
  //               <Icon 
  //               type="material-icons-outlined"
  //               name='edit' 
  //               width={20} 
  //               height={20} 
  //               fill='#111' />
  //             </TouchableOpacity>
  //           </View>
  //           </View>
  //           <Text style={styles.userNameText}>{name}</Text>
  //           <View style={styles.userAddressRow}>
  //             <View>
  //               <Icon
  //                 name="place"
  //                 underlayColor="transparent"
  //                 iconStyle={styles.placeIcon}
  //                 onPress={this.onPressPlace}
  //               />
  //             </View>
  //             <View style={styles.userCityRow}>
  //               <Text style={styles.userCityText}>
  //                 {/* {city}, {country} */}
  //               </Text>
  //             </View>
  //           </View>
  //         </View>
  //       {/* </ImageBackground> */}
  //     </View>
  //   )
  // }

  // renderTel = () => {
  //   const {
  //     phoneNumber
  //     // address: { city, country },
  //   } = this.state.userDetails

  //   return (
  //         <Tel
  //           phoneNumber={phoneNumber}
  //           onPressSms={this.onPressSms}
  //           onPressTel={this.onPressTel}
  //         />
  //   )
    
  //   }

  // renderEmail = () => {
  //   const {
  //     email
  //     // address: { city, country },
  //   } = this.state.userDetails
  //   return (
  //         <Email
  //           email={email}
  //           onPressEmail={this.onPressEmail}
  //         />
  //   )
 
  // }
  const handleEditAvatarNavigation = () => {
    navigation.navigate('EditAvatar')
  }

  
    const {
      avatar,
      name,
      email,
      phoneNumber
      // address: { city, country },
    } = userDetails
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
          <View style={styles.headerContainer}>
        {/* <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{uri: avatarBackground}}
        > */}
          <View style={styles.headerColumn}>
            <View>
            
             <Avatar
                rounded
                size='xlarge'
                source={{uri: avatar}}
                style={{width: 150, height: 150}}
              />
             <View style={styles.add}>
              <TouchableOpacity  onPress={handleEditAvatarNavigation}>
                <Icon 
                type="material-icons-outlined"
                name='edit' 
                width={20} 
                height={20} 
                fill='#111' />
              </TouchableOpacity>
            </View>
            </View>
            <Text style={styles.userNameText}>{name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  onPress={onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {/* {city}, {country} */}
                </Text>
              </View>
            </View>
          </View>
        {/* </ImageBackground> */}
      </View>
          <Tel
            phoneNumber={phoneNumber}
            onPressSms={onPressSms}
            onPressTel={onPressTel}
          />
            {Separator()}
            <Email
            email={email}
            onPressEmail={onPressEmail}
          />
          </Card>
        </View>
      </ScrollView>
    )
  
}

export default Profile

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  // userImage: {
  //   borderColor: '#FFF',
  //   borderRadius: 80,
  //   borderWidth: 3,
  //   height: 160,
  //   marginBottom: 0,
  //   width: 160,
  // },
  userNameText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  add: {
    backgroundColor: '#939393',
    position: 'absolute',
    bottom: 0,
    right: 10,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center'
  }
})