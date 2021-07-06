import React from 'react';
import { View, Text, Button } from 'react-native';
// import DrawerButton from '../DrawerButton';

const Profile = ({navigation}) =>{
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
           
            <Text>Profile</Text>
            <Button
                        title="Back to Home"
                        onPress={() => navigation.navigate('Home')} 
                    />
        </View>
    );
}

export default Profile;
