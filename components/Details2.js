import React, { Component } from 'react';
import { Button, View, TextInput,Text, KeyboardAvoidingView} from 'react-native';
import {  Header } from 'react-native-elements';

export default class Details extends Component {
    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('title'),
      };
    };
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
       
    }
    
    handleNext= async ()=>{
        //send order to firebase
        var details='';
        (this.state.checkbox1)? details += 'Plastic Bottles, ': '';
        (this.state.checkbox2)? details += 'Cardboard Box, ': '';
        (this.state.checkbox3)? details += 'Paper, ': '';
        (this.state.checkbox4)? details += 'Food': '';
        Firebase.database()
        .ref(`Users/${userUID}/pending`)
        .push({
            location: this.props.navigation.getParam('location'),
            details: details,    
            date:this.state.date,
            time: this.state.time,
            phoneNumber: this.state.phoneNumber,
            comment: this.state.comment,
          
        })
        //send an sms
        var message = `New Trash PickUp Request. Location: ${this.props.navigation.getParam('location')}, details: ${details}, date of pickup:${this.state.date}, time: ${this.state.time}, phoneNumber: ${this.state.phoneNumber}, comment:${this.state.comment}`
        await fetch("http://bf8fb1c5.ngrok.io/?message="+message).then((res)=>{
        console.log(res);
        if(res.status == 200){
          //this.setState({sucess: true})
          console.log("success")
        }
      }).catch((err)=>{
        console.log("err"+err);
      });
    
  
        this.props.navigation.navigate('Order',{userUID:userUID,title:'Pending Trash PickUps'})
        
      }

    render(){
        return(
            <View style={{flex:1}}>
                     <Header
  leftComponent={{ icon: 'menu', color: '#fff' }}
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
                    <Button onPress={console.log('')} title='CONFIRM'></Button>
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