import firebase from 'firebase'
import 'firebase/firestore';
import { now } from 'moment';
import firebaseConfig from './firebaseConfig'


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
  }
const db = firebase.firestore();

export default {
    addUser: async (user) => {
        await db.collection('users').doc(user.id).set({
            name: user.name,
            avatar: user.avatar,
            email: user.email
        }, { merge: true });
    },
    getContactList: async (userId) => {
        let list = [];

        let results = await db.collection('users').get();
        results.forEach(result => {
            let data = result.data();
            if (result.id !== userId) {
                list.push({
                    id: result.id,
                    name: data.name,
                    avatar: data.avatar
                });
            }
        });
        return list;
    },
    // getChatList: async () => {
    //     let chatList = [];

    //     let results = await db.collection('chats').get();
    //     results.forEach(result => {
    //         let data = result.data();
            
    //             chatList.push({
    //                 chatId: result.id,
    //                 messages: data.messages,
    //                 users: data.users,
    //                 name: data.users.
    //             });
            
    //     });
    //     return chatList;
    // },
    // addNewChat: async (user, user2) => {
    //     let newChat = await db.collection('chats').add({
    //         messages: [],
    //         users: [user.id, user2.id]
    //     });

    //     db.collection('users').doc(user.id).update({
    //         chats: firebase.firestore.FieldValue.arrayUnion({
    //             chatId: newChat.id,
    //             title: user2.name,
    //             image: user2.avatar,
    //             with: user2.id
    //         })
    //     });

    //     db.collection('users').doc(user2.id).update({
    //         chats: firebase.firestore.FieldValue.arrayUnion({
    //             chatId: newChat.id,
    //             title: user.name,
    //             image: user.avatar,
    //             with: user.id
    //         })
    //     });
    // },
    onChatList: (userId) => {
        let chatList = [];
         db.collection('users').doc(userId).onSnapshot((doc) => {
            
            if (doc.exists) {
                let data = doc.data();
                if (data.chats){           
                  chatList.push(
                       data.chats
                    )
                };  
                                     
        };
         return chatList; 
    })
},

    onChatContent: (chatId, setList, setUsers) => {
        return db.collection('chats').doc(chatId).onSnapshot((doc) => {
            if (doc.exists) {
                let data = doc.data();
                setList(data.messages.reverse());
                setUsers(data.users);
            }
        })
    },

    sendMessage:async (chatId, userId, type, body, users) => {
        let now = new Date().toJSON()

        db.collection('chats').doc(chatId).update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                type,
                author: userId,
                body,
                date: now
            })
        });

        for (let i in users) {
            let u = await db.collection('users').doc(users[i]).get();
            let uData = u.data();
            if (uData.chats) {
                let chats = [...uData.chats];
                for (let e in chats) {
                    if (chats[e].chatId == chatId) {
                        chats[e].lastMessage = body;
                        chats[e].lastMessageDate = now;
                        chats[e].author = userId;
                    }
                }

                await db.collection('users').doc(users[i]).update({
                    chats
                });
            }
        }
    }
};