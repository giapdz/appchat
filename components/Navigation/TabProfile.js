import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import EditAvatar from '../main/Profile/EditAvatar'
import Profile from '../main/Profile/Profile';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {  DrawerActions } from '@react-navigation/native';
const Stack = createStackNavigator();

const TabContact = ({ navigation })=>{
 
  return (  
    <Stack.Navigator initialRouteName="Profile">
    <Stack.Screen name="Profile" component={Profile} 
    options={{
      headerShown:true,
      headerTitleAlign: 'center',
      headerLeft: () => (
        < TouchableOpacity  style={{marginLeft: 15}}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
            
            <Ionicons name="ios-menu-sharp" size={24} color="black" />
        </TouchableOpacity >     
      )}} />
    <Stack.Screen name="EditAvatar" component={EditAvatar}   
    options={()  => ({
          headerShown:true,
          headerTitleAlign: 'center',
    
        })}/>
    </Stack.Navigator>
  )
}
export default TabContact;
