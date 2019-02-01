import React, { Component } from 'react';
import { Button, View, TextInput,Text, KeyboardAvoidingView} from 'react-native';
import {  Header, Icon } from 'react-native-elements';
import Firebase from './config/firebase'

export default class Account extends Component {
    constructor(props){
        super(props)
        this.state = {
            fullName : '',
            phoneNumber : ''
        }
    }
    
    render(){
        return(
            <View style={{flex:1}}>
            <Header backgroundColor='#008000'
  leftComponent= {<Icon
    name='menu'
    type='material'
    color='#fff'
    onPress={() => this.props.navigation.openDrawer()} />}
  centerComponent={{ text: 'My Profile', style: { color: '#fff' } }}
  // rightComponent={{ icon: 'home', color: '#fff' }}
/>
<View style={styles.container}>

      <View style={{flex:1}}>
      <Text style={styles.heading}>Full Name</Text>         
    <TextInput style={styles.textInput} id='fullName' value={this.state.fullName} 
    onChangeText={(fullName)=> this.setState({fullName})}  /> 
    <Text style={styles.heading}>Phone Number</Text>         
    <TextInput style={styles.textInput}  id='phoneNumber' value={this.state.phoneNumber} onChangeText={(phoneNumber) => this.setState({phoneNumber})}  /> 
    
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.form}><View style={styles.button}> 
          <Button color='#008000' onPress={this.handleSubmit} title='SAVE'></Button>
      </View></KeyboardAvoidingView>
      

  </View>
  </View>
 
        )
    }
}

const styles = {
    container : {
        flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: 20,
    paddingLeft : 15,
    paddingRight: 15,    
    justifyContent: 'space-between'
    },
    card : {
        marginBottom: 200
    },
    button:{
        flex:1,
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
      },
      textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
      }
}