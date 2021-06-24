import React, {useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Api from '../auth/Api';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';
const db = firebase.firestore();
function ListContact() {
  
    const navigation = useNavigation();
    const [list, setList] = useState([])
    // const user = firebase.auth().currentUser
    let u = firebase.auth().currentUser;
                let user = {
                id: u.uid,
                name: u.displayName,
                avatar: u.photoURL,
                email: u.email
                };
    useEffect(() => {
        const getList = async () => {
        //   let u = firebase.auth().currentUser;
        //         let user = {
        //         id: u.uid,
        //         name: u.displayName,
        //         avatar: u.photoURL,
        //         email: u.email
        //         };

            if (user !== null) {
                let results = await Api.getContactList(user.id);
                setList(results);
            }
        }
        getList();
    }, []);
    
    
    
    const addNewChat = async (user2) => {
        let u = await db.collection('users').doc(user.id).get();
        let uData = u.data();
        if (uData.chats) {
            let chats = [...uData.chats];
            for (let e in chats) {
                if (chats[e].with == user2.id) {
                    return navigation.navigate('Chat', {
                        id: chats[e].chatId,
                        name: chats[e].title,
                      });
                }
                
            }
            let newChat = await db.collection('chats').add({
                messages: [],
                users: [user.id, user2.id]
            });
    
            db.collection('users').doc(user.id).update({
                chats: firebase.firestore.FieldValue.arrayUnion({
                    chatId: newChat.id,
                    title: user2.name,
                    image: user2.avatar,
                    with: user2.id
                })
            });
    
            db.collection('users').doc(user2.id).update({
                chats: firebase.firestore.FieldValue.arrayUnion({
                    chatId: newChat.id,
                    title: user.name,
                    image: user.avatar,
                    with: user.id
                })
            });
            navigation.navigate('Chat', {
                id: newChat.id,
                name: user2.name,
              });
        }
        // await Api.addNewChat(user, user2);
    }
    // const handleClose = () => {
    //     setShow(false);
    // } 

    return (
       
        <View style={{flex: 1, marginTop: 22}}>
            <FlatList 
                data={list}
                renderItem={({item, index})=>{ index={index} 
                    //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                    return (
                    // <FlatListItem item={item} index={index}>

                    // </FlatListItem>
                    <TouchableOpacity onPress={() => addNewChat(item)} style={{
                      flex: 1,
                      flexDirection:'column',                                
                  }}>            
                      <View style={{
                              flex: 1,
                              flexDirection:'row',               
                              backgroundColor: 'white',
                              padding: 5
                      }}>            
                          <Image 
                              source={{uri: item.avatar}}
                              style={{width: 50,
                                height: 50,
                                borderRadius: 70,
                                margin: 5}}
                          >
              
                          </Image>
                          <View style={{
                                  flex: 1,
                                  flexDirection:'column',   
                                  height: 50              
                              }}>            
                                  <Text style={styles.flatListItem}>{item.name}</Text>
                                  <View style={{
                          height: 1,
                          flexDirection:'column',  
                          backgroundColor:'gainsboro',
                          marginHorizontal: 10,
                          marginTop: 12                           
                      }}>
                  
                      </View>  
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
                >

            </FlatList>
        </View>
    )
}

  
export default ListContact;


const styles = StyleSheet.create({
  flatListItem: {
      color: 'black',
      paddingTop: 20,
      paddingLeft:10,
      paddingBottom: 20,
      fontSize: 16,
      fontWeight: 'bold'  
  }
});