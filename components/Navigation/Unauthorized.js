import React from 'react';
import Splash from '../auth/Splash'
import LoginScreen from '../auth/LoginScreen'
import RegisterScreen from '../auth/RegisterScreen'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

function Unauthorized () {
    return (
    <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
    );
}
export default Unauthorized;