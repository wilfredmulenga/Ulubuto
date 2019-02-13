import React from 'react';
import { Text, Button, StatusBar, Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import  Swiper  from 'react-native-swiper'


class Swipers extends React.Component {
    constructor(props){
        super(props)
    }
  
  render() {
    return (
      <Swiper style={{flex:1, color:'#FFFFF'}} showsButtons={true}
      nextButton={<Text style={{ fontSize: 60,
        color: '#008000',
        fontWeight: '200',
        marginTop: 10}}>›</Text>}
prevButton={<Text style={{ fontSize: 60,
        color: '#008000',
        fontWeight: '200',
        marginTop: 10}}>‹</Text>}
      
      >
                <View style={styles.slide1}>
                    <Image source={require('../assets/Olive.png')} style={{
                        width: 200,
                        height: 200,
                        marginTop: StatusBar.currentHeight,
                        padding: 0,
                        resizeMode: 'cover'}}/>
                        <Text style={{
                            color: '#60ad5e',
                            fontSize: 25,
                            marginTop:50,
                            fontWeight: 'bold',
                        }}>Make the City cleaner</Text>
                    {/* <TouchableOpacity style={{marginLeft: '80%', paddingBottom:'5%'}}
                                      onPress={() => this.props.navigation.goBack(null)}>
                        <Text style={{
                            color: '#00abcd',
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>Skip</Text>
                    </TouchableOpacity> */}
                </View>
                 <View style={styles.slide1}>
                 <Image source={require('../assets/Olive.png')} style={{
                        width: 200,
                        height: 200,
                        marginTop: StatusBar.currentHeight,
                        padding: 0,
                        resizeMode: 'cover'}}/>
                        <Text style={{
                            color: '#60ad5e',
                            fontSize: 25,
                            marginTop:50,
                            fontWeight: 'bold',
                        }}>Earn money through recycling</Text>
                    {/* <TouchableOpacity style={{marginLeft: '80%', paddingBottom:'5%'}}
                                      onPress={() => this.props.navigation.goBack(null)}>
                        <Text style={{
                            color: '#ffffff',
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>Skip</Text>
                    </TouchableOpacity> */}
                </View>
                <View style={styles.slide1}>
                <Image source={require('../assets/Olive.png')} style={{
                        width: 200,
                        height: 200,
                        marginTop: StatusBar.currentHeight,
                        padding: 0,
                        resizeMode: 'cover'}}/>
                        <TouchableOpacity style={{width:140,height:60, marginTop:50}}>
      <Button  color='#008000' title='START' onPress={()=> this.props.navigation.navigate('Home')}/>
      </TouchableOpacity>
                </View>
  </Swiper>
);
}
    
}

const styles = {
  slide1 : {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  slide2 :{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
}

export default Swipers