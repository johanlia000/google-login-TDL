import React, {useState, useEffect} from 'react';
import './App.css';
import * as firebase from 'firebase';
import 'firebase/firestore'

import Button from '@material-ui/core/Button';
import './db'
import puppy from './puppy.jpg';
import puppylogin from './puppylogin.jpg'


function App() {
  const [user, setUser] = useState(null)
  console.log('user: ' + user)

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(function(user) {
      console.log(user)
      if (user) {
        setUser(user)
      } else {
        // No user is signed in.
        setUser(null)
      }
    });
  }, [])

  return (
    <div className="App">
      <Header user={user}/>
      {user && <Welcome />}
      {!user && <PleaseLogin />}
      
    </div>
  );
}

function Header(props){
  return <div className='header'>
    {!props.user && <Login/>}
    {props.user && <Logout/>}
  </div>
}

function PleaseLogin(){
  return <div>
    <div className='loginSaying'>
      Please login!
    </div>
    <img src={puppylogin} className='puppyPhoto' alt="Cu<te puppy" />
  </div>
    

}

function Welcome(){
  return <div>
    <div className='welcomeSaying'>
      Hello! Welcome to the Teen Design Lab
    </div>
    <img src={puppy} className='puppyPhoto' alt="Cute puppy" />
  </div>
}


function Login(){
  var provider = new firebase.auth.GoogleAuthProvider();

  // Login with Google
  function googleLogin(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      console.log(error)
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  // function userPersistance(){
  //   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
  //     .then(function() {
  //       provider = new firebase.auth.GoogleAuthProvider();
  //       // In memory persistence will be applied to the signed in Google user
  //       // even though the persistence was set to 'none' and a page redirect
  //       // occurred.
  //       return firebase.auth().signInWithRedirect(provider);
  //     })
  //     .catch(function(error) {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //   });
  // }

  return <div className='loginButton'>
    <Button 
     variant="contained" 
     color="primary"
     onClick={async ()=> {
        googleLogin() 
    }}
    >
        Login
    </Button>
  </div>
}

function Logout(){
  function logout(){
    firebase.auth().signOut().then(function() {
      console.log('successful logout!')
    }).catch(function(error) {
      console.log(error)
    }); 
  }

  return <div className='logoutButton'>
    <Button 
      variant="contained" 
      color="primary"
      onClick={async ()=> {
        logout() 
    }}
    >
        Logout
    </Button>
  </div>
}



export default App;

