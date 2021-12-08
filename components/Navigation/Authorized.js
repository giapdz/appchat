import React, { Component } from "react";
import { Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Home from "./Home";
import TabProfile from "./TabProfile";
import Setting from "../main/Setting/Setting";
import DrawerContent from "../main/DrawerContent";
import { firebase } from "../Api/firebaseConfig";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../redux/actions";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

const Drawer = createDrawerNavigator();
export class Authorized extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        // function getHeaderTitle(route) {
        //   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Chat';

        //   switch (routeName) {
        //     case 'Chat':
        //       return 'Chat';
        //     case 'Contact':
        //       return 'Contact';

        //   }
        // }

        return (
            <Drawer.Navigator
                drawerContent={(props) => <DrawerContent {...props} />}
            >
                <Drawer.Screen
                    name="Home"
                    component={Home}
                    options={({ route }) => ({
                        drawerIcon: ({ color }) => (
                            <Ionicons name="home" size={24} color={color} />
                        ),
                        // headerTitle: getHeaderTitle(route),
                        headerShown: false,
                    })}
                />
                <Drawer.Screen
                    name="TabProfile"
                    component={TabProfile}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <AntDesign name="profile" size={24} color={color} />
                        ),
                        title: "Profile",
                        headerTitleAlign: "center",
                        headerShown: false,
                    }}
                />
                <Drawer.Screen
                    name="Setting"
                    component={Setting}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <AntDesign name="setting" size={24} color={color} />
                        ),
                        title: "Setting",
                        headerTitleAlign: "center",
                        headerShown: true,
                        headerRight: () => (
                            <TouchableNativeFeedback
                                onPress={() => firebase.auth().signOut()}
                            >
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: `#6495ed`,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Log out
                                </Text>
                            </TouchableNativeFeedback>
                        ),
                    }}
                />
            </Drawer.Navigator>
        );
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
    bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Authorized);
