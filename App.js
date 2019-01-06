import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './components/HomeScreen'
import Details from './components/Details'
import Auth from './components/Auth'

export default class App extends React.Component {
  constructor(props){
    super(props)  
  }

    
  render() {
    
    return (
      <Root/>
    );
  }
}

const Root = createAppContainer(createStackNavigator({
  Home: HomeScreen,
  Details: Details,
  Auth: Auth
  
},{
  initialRouteName: 'Home'
}));

