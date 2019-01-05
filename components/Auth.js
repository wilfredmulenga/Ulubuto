import React, { Component } from 'react';
import {Container} from 'native-base'
import Firebase from '../components/config/firebase'
Firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode,errorMessage)
  });
Firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      console.log("We are authenticated now!");
    }
  
    // Do other things
  });
export default class Auth extends Component{
    constructor(props){
        super(props)
    }
  
      
    render(){
        return(
            <Container>

            </Container>
        )
    }
}