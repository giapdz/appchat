import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import TabContact from './TabContact';
import TabChat from './TabChat';
const Tab = createBottomTabNavigator();

function Home () {

        return (           
            <Tab.Navigator 
            initialRouteName="Chat"
            tabBarOptions={{
             activeTintColor: 'black',
             inactiveTintColor: 'grey',
             style: {
             backgroundColor: 'aliceblue',
             },
            }}
           >
              <Tab.Screen name="Chat" component={TabChat}
             options={() =>({
              // headerTitle: getHeaderTitle(route),
              tabBarLabel: 'Chat',
              style: { backgroundColor: 'aliceblue' },
                tabBarIcon: ({ color }) => (
                    <Ionicons name="chatbubble" size={24} color={color} />
                ),
              })} />
            <Tab.Screen name="Contact" component={TabContact}
             options={{
              tabBarLabel: 'Contact',
                tabBarIcon: ({ color}) => (
                  <MaterialIcons name="group" size={25} color={color} />
                ),
              }} />
           
            </Tab.Navigator>
           
            
        );
            
    
}


export default Home
