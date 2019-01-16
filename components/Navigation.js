import React from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './HomeScreen'
import Order from './Order'

const TabNavigator = createBottomTabNavigator({
    Home: { screen: HomeScreen },
    Order : {screen:Order}
  });

  export default createAppContainer(TabNavigator);