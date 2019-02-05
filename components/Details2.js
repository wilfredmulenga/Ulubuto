import React, { Component } from 'react';
import { Button, View, TextInput,Text, KeyboardAvoidingView} from 'react-native';
import {  Header, Icon } from 'react-native-elements';
import firebase from './config/firebase'
import Loader from './Loader'
import TabHeader from './TabHeader'

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
         location : this.props.navigation.getParam('location'),
         userUID : this.props.navigation.state.params.userUID,
         loading : false
     }
       this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSMS = async ()=>{
        this.setState({
            loading: true
        })
       await firebase.database()
        .ref(`Users/${'RDN8nzjqLahu7Q06l8Dlao4gsX02'}`)
        .push({
            location: this.state.location,
            details: this.state.details,    
            date:this.state.date,
            time: this.state.time,
            phoneNumber: this.state.phoneNumber,
            comment: this.state.comment,
            status: 'pending'
        })
        //send an sms
        var message = `New Trash PickUp Request. Location: ${this.state.location}, details: ${this.state.details}, date of pickup:${this.state.date}, time: ${this.state.time}, phoneNumber: ${this.state.phoneNumber}, comment:${this.state.comment}`
        await fetch("https://ulubuto-sms-backend.herokuapp.com/sms?message="+message).then((res)=>{
        console.log(res);
        if(res.status == 200){
          //this.setState({sucess: true})
          console.log("success")
          this.setState({
            loading: false
        })
        }
      }).catch((err)=>{
        console.log("err"+err);
      }).then(()=>{
        this.props.navigation.navigate('Orders',{userUID:this.state.userUID,title:'Pending Trash PickUps'})
      })
    
    }
    handleSubmit= async ()=>{
        //send order to firebase
       
        this.setState({
            loading : true
        })
      await this.handleSMS
      this.setState({
        loading : false
    })
     
        
      }

    render(){
        return(
            <View style={{flex:1}}>
                   <Header backgroundColor='#008000'
leftComponent= {<Icon
  
  name='menu'
  type='material'
  color='#fff'
  size={32}
 
  onPress={() => this.props.navigation.openDrawer()} />}
centerComponent={{ text: 'Details', style: { color: '#fff' } }}
// rightComponent={{ icon: 'home', color: '#fff' }}
/>{(this.state.loading)?<Loader loading={this.state.loading}/>:<View style={styles.container}>
<Loader
          loading={this.state.loading} />
                <View style={{flex:1}}>
                <Text style={styles.heading}>Contact Number</Text>         
              <TextInput id='phoneNumber' value={this.state.phoneNumber} onChangeText={(phoneNumber) => this.setState({phoneNumber})} placeholder="0967 999 000" /> 
              <Text style={styles.heading}>Notes</Text>          
            <TextInput style={{height:100}} value={this.state.comment}  editable = {true}
         multiline={true} onChangeText={(comment) => this.setState({comment})}
         numberOfLines={4} placeholder="I have assorted my trash..." />
                </View>
                <KeyboardAvoidingView behavior="padding" style={styles.form}><View style={styles.button}> 
                    <Button color='#008000' onPress={this.handleSMS} title='CONFIRM'></Button>
                </View></KeyboardAvoidingView>
                
          
            </View>
            }
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