import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Map from './components/Map'
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
  Home: Map,
  Details: Details,
  Auth: Auth
  
},{
  initialRouteName: 'Details'
}));

