import React from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import Map from './components/Map'
import Details from './components/Details'
import Details2 from './components/Details2'
import Orders from './components/Orders'
import {Provider} from 'react-redux';
import store from './components/store'
import Firebase from './components/config/firebase'
import {connect} from 'react-redux'
import {addUserUID} from './components/actions'
import Demo from './components/Demo'
import Profile from './components/Profile'
import Authentication from './components/Authentication'
import Auth from './components/Auth'
import firebase from './components/config/firebase'


 class App extends React.Component {
  constructor(props){
    super(props)  
    this.state={
      come : ''
    }
    this.HandleAuthentication = this.HandleAuthentication.bind(this)
    this.HandleAuthentication()
  }
  

  HandleAuthentication = ()=>{
    console.log('auth')
    firebase.auth().signInAnonymously().catch(function(error){
        console.log(error.code,error.message)
    })
    firebase.auth().onAuthStateChanged((user)=>{
        if(user !==null){
          console.log(user.uid)
        }
       
    })
}


 
    
  render() {
    
    return (     
      
      <MyApp />
    );
  }
}

// const Root = createAppContainer(createStackNavigator({
//   Home: HomeScreen,
//   Details: Details,
//   Orders : Orders,
//   Demo: Demo
  
  
// },{
//   initialRouteName: 'Home'
// }));

const MyDrawerNavigator = createDrawerNavigator({
  
  
  
  Home: {
    screen: Map,
  },
  
  Authentication : {
    screen : Authentication
  },
  
  Auth : {
    screen : Auth
  },
  Details: {
    screen: Details,
  },
  Details2: {
    screen: Details2,
  },
  // Demo: {
  //   screen : Demo
  // },
  Orders : {
    screen : Orders
  },
 
  Profile : {
    screen : Profile
  },
  
  
});

const MyApp = createAppContainer(MyDrawerNavigator);


  
  

// export default createAppContainer(TabNavigator);
// class Auth extends React.Componet{
//   constructor(props){
//     super(props)
//     this.handleAuth = this.handleAuth.bind(this)
//     this.handleAuth()
//   }
//   handleAuth = ()=>{
//     //uncomment when ready to use authentication
// Firebase.auth().signInAnonymously().catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
//   console.log(errorCode,errorMessage)
// });
// Firebase.auth().onAuthStateChanged((user) => {
//   if (user != null) {
//     console.log("We are authenticated now!", user.uid);
//    console.log( this.props)
//   }

//   // Do other things
// });
//   }

// }

// const ConnectAuth = connect(mapStateToProps)(mapDispatchToProps)(Auth)

export default App

