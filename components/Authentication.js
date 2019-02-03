import React, { Component } from 'react'
import { View, TextInput, Button, Text } from 'react-native'
import firebase from './config/firebase'


export default class Authentication extends Component{
   
   constructor(props){
       super(props)
       this.state = {phoneNumber:'', confirmResult:''}
       
   }

  

 
    render(){
        return(
            <View style={styles.container}>
            <Text style={styles.heading}>Phone Number</Text>     
             <TextInput style={styles.textInput}  id='phoneNumber' value={this.state.phoneNumber} onChangeText={(phoneNumber) => this.setState({phoneNumber})}  /> 
            {/* <Button id='verify' 
            //onPress={this.HandleAuthentication}
             title='VERIFY'></Button> */}
            </View>
        )
    }
}

const styles = {
    container : {
        flex: 1,
        flexDirection:'column',
    backgroundColor: '#ecf0f1',
    paddingTop: 20,
    paddingLeft : 15,
    paddingRight: 15, 
    justifyContent: 'center'  
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8,
        marginBottom: 20
      }
}