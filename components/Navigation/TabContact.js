import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import ListContact from '../main/Contact/ListContact'
import ChatScreen from '../main/Chat/ChatScreen'
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {  DrawerActions } from '@react-navigation/native';
const Stack = createStackNavigator();

const TabContact = ({ navigation })=>{
 
  return (  
    <Stack.Navigator initialRouteName="Contact">
    <Stack.Screen name="Contact" component={ListContact} 
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
    <Stack.Screen name="Chat" component={ChatScreen}   
    options={({ route })  => ({
          headerShown:true,
          headerTitleAlign: 'center',
          title: route.params.name,
        })}/>
    </Stack.Navigator>
  )
}
export default TabContact;
