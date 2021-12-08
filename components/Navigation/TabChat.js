import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListChat from "../main/Chat/ListChat";
import ChatScreen from "../main/Chat/ChatScreen";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DrawerActions } from "@react-navigation/native";
const Stack = createStackNavigator();

const TabChat = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="List Chat">
            <Stack.Screen
                name="List Chat"
                component={ListChat}
                options={{
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 15 }}
                            onPress={() =>
                                navigation.dispatch(DrawerActions.openDrawer())
                            }
                        >
                            <Ionicons
                                name="ios-menu-sharp"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={({ route }) => ({
                    headerTitleAlign: "center",
                    headerShown: true,
                    title: route.params.name,
                })}
            />
        </Stack.Navigator>
    );
};
export default TabChat;
