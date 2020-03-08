import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"


let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])

    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            // msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds)
            return msgs
        })
    }
    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }
    
    useEffect(() => {
        store.collection(coll)
        //.where('room','==',room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }


const firebaseConfig = {
    apiKey: "AIzaSyAGU9BmBxbQo_VxET2glZYmHXSLLLNMyyo",
    authDomain: "teendesignlabproject.firebaseapp.com",
    databaseURL: "https://teendesignlabproject.firebaseio.com",
    projectId: "teendesignlabproject",
    storageBucket: "teendesignlabproject.appspot.com",
    messagingSenderId: "1017970897963",
    appId: "1:1017970897963:web:09abfce60fae14830de66e"
  };

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()




