import React, { Component } from 'react';
import { Button, View, TextInput,Text, KeyboardAvoidingView} from 'react-native';
import {  Header, Icon } from 'react-native-elements';
import Firebase from './config/firebase'

export default class Details extends Component {
  
    constructor(props){
     super(props)
     this.state = {
         time: this.props.navigation.state.params.time,
         date: this.props.navigation.state.params.date,
         details: this.props.navigation.state.params.details,
         phoneNumber:'',
         comment : '',
         userUID : this.props.navigation.state.params.userUID
     }
     this.handleSubmit = this.handleSubmit.bind(this)
     console.log(this.state.userUID)
    }
    
    
    handleSubmit=  ()=>{
        //send order to firebase
        console.log("hello")
        Firebase.database()
        .ref(`Users/${this.state.userUID}`)
        .push({
            location: "location",
            //this.props.navigation.getParam('location'),
            details: this.state.details,    
            date:this.state.date,
            time: this.state.time,
            phoneNumber: this.state.phoneNumber,
            comment: this.state.comment,
            status: 'pending'
          
        })
        //send an sms
        var message = `New Trash PickUp Request. Location: ${this.props.navigation.getParam('location')}, details: ${this.state.details}, date of pickup:${this.state.date}, time: ${this.state.time}, phoneNumber: ${this.state.phoneNumber}, comment:${this.state.comment}`
         fetch("http://4ee906e8.ngrok.io/?message="+message+"&phoneNumber="+this.state.phoneNumber).then((res)=>{
        console.log(res);
        if(res.status == 200){
          //this.setState({sucess: true})
          console.log("success")
        }
      }).catch((err)=>{
        console.log("err"+err);
      });
    
        //go to Orders
        this.props.navigation.navigate('Orders')
        
      }

    render(){
        return(
            <View style={{flex:1}}>
                      <Header
            leftComponent= {<Icon
              name='menu'
              type='material'
              color='#fff'
              onPress={() => this.props.navigation.openDrawer()} />}
            centerComponent={{ text: 'Details', style: { color: '#fff' } }}
            // rightComponent={{ icon: 'home', color: '#fff' }}
          />
<View style={styles.container}>
        
                <View style={{flex:1}}>
                <Text style={styles.heading}>Contact Number</Text>         
              <TextInput id='phoneNumber' value={this.state.phoneNumber} onChangeText={(phoneNumber) => this.setState({phoneNumber})} placeholder="0967 999 000" /> 
              <Text style={styles.heading}>Notes</Text>          
            <TextInput style={{height:100}} value={this.state.comment}  editable = {true}
         multiline={true} onChangeText={(comment) => this.setState({comment})}
         numberOfLines={4} placeholder="I have assorted my trash..." />
                </View>
                <KeyboardAvoidingView behavior="padding" style={styles.form}><View style={styles.button}> 
                    <Button onPress={this.handleSubmit} title='CONFIRM'></Button>
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
}