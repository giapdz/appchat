import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 

const GettingCall = (props) => {
    return (
        <View style={styles.container}>
       <Image source= {require('../../../images/backGroundImage.jpg')} style={styles.image}></Image>
       <View style={styles.bcontainer}>
           
               <TouchableOpacity onPress={props.join}  style={styles.buttonCallStart}>
               <Ionicons name="call-outline" size={24} color="black" />
               </TouchableOpacity>
    
           
               <TouchableOpacity onPress={props.hangup} style={styles.buttonCallEnd}>
               <Ionicons name="call-outline" size={24} color="black" />
               </TouchableOpacity>
           
       </View>
        </View>
    )
}
export default GettingCall
const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    image: {
        position: 'absolute',
    },
    bcontainer: {
        flexDirection:'row',
        bottom: 30,
    },
    buttonCallStart: {
    padding: 10,
    elevation:10,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    marginLeft: "30%"
    },
    buttonCallEnd: {
        position: 'absolute',
        padding: 10,
        elevation:10,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        }
})