import React, { useState, useEffect } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import Api from "../../Api/Api";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../Api/firebaseConfig";

const db = firebase.firestore();
function ListContact() {
    const navigation = useNavigation();
    const [list, setList] = useState([]);
    // let user = firebase.auth().currentUser;
    let u = firebase.auth().currentUser;
    let user = {
        id: u.uid,
        name: u.displayName,
        avatar: u.photoURL,
        email: u.email,
    };
    useEffect(() => {
        const getList = async () => {
            if (user !== null) {
                let results = await Api.getContactList(user.id);
                setList(results);
            }
        };
        getList();
    }, []);

    // const handleClose = () => {
    //     setShow(false);
    // }

    return (
        <View style={{ flex: 1, marginTop: 22 }}>
            <FlatList
                data={list}
                renderItem={({ item, index }) => {
                    index = { index };
                    //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                    return (
                        // <FlatListItem item={item} index={index}>

                        // </FlatListItem>
                        <TouchableOpacity
                            onPress={async () =>
                                await Api.addNewChat(user, item, navigation)
                            }
                            style={{
                                flex: 1,
                                flexDirection: "column",
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    backgroundColor: "white",
                                    padding: 5,
                                }}
                            >
                                <Image
                                    source={{ uri: item.avatar }}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 70,
                                        margin: 5,
                                    }}
                                ></Image>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "column",
                                        height: 50,
                                    }}
                                >
                                    <Text style={styles.flatListItem}>
                                        {item.name}
                                    </Text>
                                    <View
                                        style={{
                                            height: 1,
                                            flexDirection: "column",
                                            backgroundColor: "gainsboro",
                                            marginHorizontal: 10,
                                            marginTop: 12,
                                        }}
                                    ></View>
                                </View>
                            </View>
                            {/* <View style={{
                          height: 1,
                          flexDirection:'column',  
                          backgroundColor:'darkgray'                            
                      }}>
                  
                      </View> */}
                        </TouchableOpacity>
                    );
                }}
            ></FlatList>
        </View>
    );
}

export default ListContact;

const styles = StyleSheet.create({
    flatListItem: {
        color: "black",
        paddingTop: 20,
        paddingLeft: 10,
        paddingBottom: 20,
        fontSize: 16,
        fontWeight: "bold",
    },
});
