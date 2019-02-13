import React, { Component } from 'react';
import { Text, Button, StatusBar, Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import {Swiper} from 'react-native-swiper'


export default class Demo extends Component {

  
  render() {
    return (
      <Swiper style={{flex:1}} showsButtons={true}>
                <View style={styles.slide1}>
                    <Image source={require('../assets/Olive.png')} style={{ flex: 1,
                        width: 100,
                        height: 100,
                        marginTop: StatusBar.currentHeight,
                        padding: 0,
                        resizeMode: 'cover'}}/>
                        <Text style={{
                            color: '#00abcd',
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>Make the city cleaner</Text>
                    <TouchableOpacity style={{marginLeft: '80%', paddingBottom:'5%'}}
                                      onPress={() => this.props.navigation.goBack(null)}>
                        <Text style={{
                            color: '#00abcd',
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>Skip</Text>
                    </TouchableOpacity>
                </View>
                 <View style={styles.slide2}>
                    <Image source={require('../assets/Olive.png')} style={{ flex: 1,
                        width: '100%',
                        height: '100%',
                        marginTop: StatusBar.currentHeight,
                        padding: 0,
                        resizeMode: 'cover'}}/>
                    <TouchableOpacity style={{marginLeft: '80%', paddingBottom:'5%'}}
                                      onPress={() => this.props.navigation.goBack(null)}>
                        <Text style={{
                            color: '#ffffff',
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>Skip</Text>
                    </TouchableOpacity>
                </View>
  </Swiper>
);
}
    
}

const styles = {
  slide1 : {
    flex:1,
    flexDirection: 'column'
  },
  slide2 :{
    flex:1
  }
}
