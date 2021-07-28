import React, { Component, useEffect, useState } from 'react'
import { ScrollView, Switch, StyleSheet, Text, View } from 'react-native'
import firebase from 'firebase'
import { Avatar, ListItem } from 'react-native-elements'
import PropTypes from 'prop-types'
import Api from '../../Api/Api'
import BaseIcon from './Icon'
import Chevron from './Chevron'
import InfoText from './InfoText'
const styles = StyleSheet.create({
    scroll: {
      backgroundColor: 'white',
    },
    userRow: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingBottom: 8,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 6,
    },
    userImage: {
      marginRight: 12,
    },
    listItemContainer: {
      height: 55,
      borderWidth: 0.5,
      borderColor: '#ECECEC',
    },
  })
  
  const Setting =() => {
  const [userDetails, setUserDetails] =useState({});
  const [pushNotifications,setPushNotifications]=useState(true);
    useEffect(()=>{
      fetchUserDetails()
    })
    
  
    // onPressSetting = () => {
    //   this.props.navigation.navigate('Options')
    // }
    
    const onChangePushNotifications = () => {
      
        setPushNotifications(!pushNotifications)
      
    }
   const  fetchUserDetails = async () => {
      try {
        const userDetails = await Api.getUserDetails()
        setUserDetails(userDetails)
      } catch (error) {
        console.log(error)
      }
    }
      const { avatar, name, email } = userDetails
      return (
        <ScrollView style={styles.scroll}>
          <View style={styles.userRow}>
            <View style={styles.userImage}>
              <Avatar
                rounded
                size="large"
                source={{uri: avatar}}
              />
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>{name}</Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 16,
                }}
              >
                {email}
              </Text>
            </View>
          </View>
          <InfoText text="Account" />
          <View>
            <ListItem  
            containerStyle={styles.listItemContainer}         
              >
              <BaseIcon
                  containerStyle={{
                    backgroundColor: '#FFADF2',
                  }}
                  icon={{
                    type: 'material',
                    name: 'notifications',
                  }}
                />    
            <ListItem.Content>
            <ListItem.Title>Push Notifications</ListItem.Title>          
            </ListItem.Content>
            <Switch
                  onValueChange={onChangePushNotifications}
                  value={pushNotifications}
                />
            </ListItem>
         
            <ListItem
            //   onPress={() => this.onPressSetting()}
              containerStyle={styles.listItemContainer}
            >
            <BaseIcon
                containerStyle={{ backgroundColor: '#57DCE7' }}
                icon={{
                    type: 'material',
                    name: 'place',
                }}
            />
            <ListItem.Content>
            <ListItem.Title>Location</ListItem.Title>          
            </ListItem.Content>
            <ListItem.Title style={{ fontSize: 15 }}>Ha Noi</ListItem.Title>
            <Chevron />
            </ListItem> 
            <ListItem
            //   onPress={() => this.onPressSetting()}
              containerStyle={styles.listItemContainer}
            >
            <BaseIcon
                containerStyle={{ backgroundColor: '#FEA8A1' }}
                icon={{
                    type: 'material',
                    name: 'language',
                }}
            />
            <ListItem.Content>
            <ListItem.Title>Language</ListItem.Title>          
            </ListItem.Content>
            <ListItem.Title style={{ fontSize: 15 }}>English</ListItem.Title>
            <Chevron />
            </ListItem> 
          </View>
          <InfoText text="More" />
          <View>
            
            <ListItem containerStyle= {styles.listItemContainer}>
                <BaseIcon
                containerStyle={{backgroundColor: '#A4C8F0'}}
                icon={{
                    type: 'ionicon',
                    name: "information-circle"
                }}/>
                <ListItem.Content>
                    <ListItem.Title>About Us</ListItem.Title>
                </ListItem.Content>
                <Chevron/>
            </ListItem>
            <ListItem containerStyle= {styles.listItemContainer}>
                <BaseIcon
                containerStyle={{backgroundColor: '#C6C7C6'}}
                icon={{
                    type: 'entypo',
                    name: 'light-bulb',
                }}/>
                <ListItem.Content>
                    <ListItem.Title>Terms and Policies</ListItem.Title>
                </ListItem.Content>
                <Chevron/>
            </ListItem>
            
            <ListItem containerStyle= {styles.listItemContainer}>
                <BaseIcon
                containerStyle={{backgroundColor: '#C47EFF'}}
                icon={{
                    type: 'entypo',
                    name: 'share',
                }}/>
                <ListItem.Content>
                    <ListItem.Title>Share our App</ListItem.Title>
                </ListItem.Content>
                <Chevron/>
            </ListItem>
            
             <ListItem containerStyle= {styles.listItemContainer}>
                <BaseIcon
                containerStyle={{backgroundColor: '#FECE44'}}
                icon={{
                    type: 'entypo',
                    name: 'star',
                }}/>
                <ListItem.Content>
                    <ListItem.Title>Rate Us</ListItem.Title>
                </ListItem.Content>
                <Chevron/>
            </ListItem>
        
            <ListItem containerStyle= {styles.listItemContainer}>
                <BaseIcon
                containerStyle={{backgroundColor: '#00C001'}}
                icon={{
                    type: 'materialicon',
                    name: 'feedback',
                }}/>
                <ListItem.Content>
                    <ListItem.Title>Send FeedBack</ListItem.Title>
                </ListItem.Content>
                <Chevron/>
            </ListItem>
          </View>
        </ScrollView>
      )
    }
  
  
  export default Setting;
