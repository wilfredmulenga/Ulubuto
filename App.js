import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './components/HomeScreen'
import Details from './components/Details'
import Order from './components/Order'
import {Provider} from 'react-redux';
import store from './components/store'
import Firebase from './components/config/firebase'
import {connect} from 'react-redux'
import {addUserUID} from './components/actions'

const mapStateToProps = (userUID) => {
    return {userUID: userUID}
  };
  
  
  
  const mapDispatchToProps = (dispatch) => {
    return {
      submitNewTodo: (userUID) => {
        dispatch(addUserUID(userUID))
      }
    }
  };



 class App extends React.Component {
  constructor(props){
    super(props)  
   
  }
 
    
  render() {
    
    return (
      <Provider store={store()}>
      {/* <ConnectAuth/> */}
      <Root /></Provider>
    );
  }
}

const Root = createAppContainer(createStackNavigator({
  Home: HomeScreen,
  Details: Details,
  Order : Order
  
  
},{
  initialRouteName: 'Order'
}));

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

