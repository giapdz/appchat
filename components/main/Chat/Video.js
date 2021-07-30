import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { RTCView } from 'react-native-webrtc';
import { Ionicons } from '@expo/vector-icons';
function ButtonContainer(props) {
    return (<View style={styles.bcontainer}>
            <View style={styles.buttonCallEnd}>
               <TouchableOpacity onPress={props.hangup}>
               <Ionicons name="call-outline" size={24} color="black"/>
               </TouchableOpacity>
            </View>
            </View>);
}
export default function Video(props) {
    if (props.localStream && !props.remoteStream) {
        return (<View style={styles.container}>
         <RTCView streamURL={props.localStream.toURL()} objectFit='cover' style={styles.video}/>
         <ButtonContainer hangup={props.hangup}/>
         </View>);
    }
    if (props.localStream && props.remoteStream) {
        return (<View style={styles.container}>
         <RTCView streamURL={props.remoteStream.toURL()} objectFit='cover' style={styles.video}/>
         <RTCView streamURL={props.localStream.toURL()} objectFit='cover' style={styles.videoLocal}/>
         <ButtonContainer hangup={props.hangup}/>
         </View>);
    }
    return <ButtonContainer hangup={props.hangup}/>;
}
const styles = StyleSheet.create({
    bcontainer: {
        flexDirection: 'row',
        bottom: 30
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    buttonCallEnd: {
        elevation: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
    },
    video: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    videoLocal: {
        position: 'absolute',
        width: 100,
        height: 150,
        top: 0,
        left: 20,
        elevation: 10
    }
});