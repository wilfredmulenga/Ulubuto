import React, { Component } from 'react';
import {Divider, CheckBox,Header, Icon } from 'react-native-elements'
import {TimePickerAndroid, DatePickerAndroid, Button, ScrollView, View,Text} from 'react-native'
import Firebase from './config/firebase'


 

export default class Details extends Component {
  constructor(props){
    super(props)
    this.state ={
      clicked: false,
      time: 'now',
      date: 'today',
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
     
      userUID: 'uOuwqfL9oJbsCex5JYSxAaoDeCz1',
   
    }
    this.showTime =this.showTime.bind(this)  
    this.showDate =  this.showDate.bind(this) 
    this.handleNext = this.handleNext.bind(this)
    this.handleAuth = this.handleAuth.bind(this)
    this.getCurrentDate = this.getCurrentDate.bind(this)
   
   // this.handleAuth()
  }



  handleAuth = ()=>{
    //uncomment when ready to use authentication
Firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  console.log(errorCode,errorMessage)
});
Firebase.auth().onAuthStateChanged((user) => {
  if (user.uid != null) {
   
    userUID = user.uid
  }


})
  }

    handleNext= async ()=>{
      //send order to firebase
      var details='';
      (this.state.checkbox1)? details += 'Plastic Bottles, ': '';
      (this.state.checkbox2)? details += 'Cardboard Box, ': '';
      (this.state.checkbox3)? details += 'Paper, ': '';
      (this.state.checkbox4)? details += 'Food': '';
     
      
      this.props.navigation.navigate('Details2',{time:this.state.time,date:this.state.date,details:details,userUID:this.state.userUID})
      
    }
  showTime =  async() =>{
    try {
      let {action, hour, minute} = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        if(minute<10){
          minute = '0' + minute
        }
        this.setState({
          time : `${hour}:${minute} hrs`
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }

  showDate = async()=>{
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(2019, 1, 1)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({
          date: `${day}/${month}/${year}`
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  getCurrentDate = ()=>{
    var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
var hr = today.getHours()
var mins = today.getMinutes()
if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
}
if(mins < 10){
  mins = '0' + mins
}
console.log(mins)
today = mm + '/' + dd + '/' + yyyy;
this.setState({
  date : today
})
var time = hr+':'+mins + ' hrs'
this.setState({
  time : time
})
  }
 componentWillMount(){
  this.getCurrentDate()
 }
  render() {
    return (
      
      <ScrollView>
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
          <View>  
              <Text style={styles.heading}  h5>When would you like your trash picked up</Text>
            {/* try to put the date and time in one line similar to google calendar when creating a reminder or event */}
            <Text style={styles.text} onPress={()=>this.showDate()}>Date: {this.state.date}</Text>
    
          <Text style={styles.text} onPress={()=>this.showTime()}>Time: {this.state.time}</Text>
        
     
          <Divider style={{ backgroundColor: 'grey' }} />
 
             <Text style={styles.heading}>Select the type of trash you have</Text>
             

            <CheckBox title='Plastic Bottles' checked={this.state.checkbox1} onPress={()=>this.setState({checkbox1:!this.state.checkbox1})} />
        
              
           
        
          <CheckBox title='Cardboard Box' checked={this.state.checkbox2} onPress={()=>this.setState({checkbox2:!this.state.checkbox2})} />
     
          <CheckBox title='Paper' checked={this.state.checkbox3} onPress={()=>this.setState({checkbox3:!this.state.checkbox3})} />          
          <CheckBox title='Food' checked={this.state.checkbox4} onPress={()=>this.setState({checkbox4:!this.state.checkbox4})} />      
          
     </View>
     <View style={{backgroundColor:'ecf0f1',height:50}}></View>
     {/* <KeyboardAvoidingView behavior="padding" style={styles.form}>

     <Text style={styles.heading}>Contact Number</Text>         
              <TextInput id='phoneNumber' value={this.state.phoneNumber} onChangeText={(phoneNumber) => this.setState({phoneNumber})} placeholder="0967 999 000" />       
            <TextInput style={{height:200}} value={this.state.comment}  editable = {true}
         multiline={true} onChangeText={(comment) => this.setState({comment})}
         numberOfLines={4} placeholder="Notes" />
     </KeyboardAvoidingView> */}
        <View style={styles.button}>
          <Button title='NEXT' onPress={()=>this.handleNext()} />
        </View>
       
      </View>
      </ScrollView>
    
    );
  }
}

const styles = {
  container:{
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingLeft : 15,
    paddingRight: 15,
    paddingTop: 20
  },
  heading:{
    fontSize:20,
    paddingTop:10,
    paddingBottom:5
  },
  text:{
    paddingTop:10,
    paddingBottom:10,
    fontSize:16
  },
  textInput:{

  },
  button:{
    flex:1,
    paddingTop:15,
    marginBottom:80
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
  }
}