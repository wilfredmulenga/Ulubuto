import React, { Component } from 'react';
import { Container,Form, Textarea,  Content, Card, CardItem, Text, Right, ListItem, CheckBox, Body, Input, Item } from 'native-base';
import {TimePickerAndroid, DatePickerAndroid, Button, KeyboardAvoidingView, ScrollView} from 'react-native'
import Firebase from './config/firebase'
 


var userUID
export default class Details extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
    };
  };
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
      textarea: '',
      userUID: '',
      phoneNumber:''
    }
    this.showTime =this.showTime.bind(this)  
    this.showDate =  this.showDate.bind(this) 
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAuth = this.handleAuth.bind(this)
    this.handleAuth()
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

    handleSubmit=()=>{
     
      // Firebase.database()
      // .ref(`Users/${userUID}`)
      // .push({
      //     location: this.props.navigation.getParam('location'),
      //     details:`${this.state.checkbox1}, ${this.state.checkbox2}, ${this.state.checkbox3}, ${this.state.checkbox4}`,    
      //     date:this.state.date,
      //     time: this.state.time,
      //     phoneNumber: this.state.phoneNumber,
      //     status: 'pending'
      // })
      //send an email
     

      this.props.navigation.navigate('Order',{userUID:userUID})
    }
  showTime =  async() =>{
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
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
 
  render() {
    return (
      // <ScrollView>
      // <KeyboardAvoidingView behavior="padding" enabled>
      //    <Form>
      //       <Item>
      //          <Input placeholder="contact number" />
      //       </Item>
      //       <Item>
      //          <Input placeholder="contact number" />
      //       </Item>
      //       <Item>
      //          <Input placeholder="contact number" />
      //       </Item>
      //       <Item>
      //          <Input placeholder="contact number" />
      //       </Item>
      //       <Item>
      //          <Input placeholder="contact number" />
      //       </Item>
      //       <Item>
      //          <Input placeholder="contact number" />
      //       </Item>
      //       <Item>
      //          <Input placeholder="contact number" />
      //       </Item>
      //        </Form>
      // </KeyboardAvoidingView>
      // </ScrollView>
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>When would you like your trash picked up</Text>
             </CardItem>
            <ListItem>
          <Body>
            {/* try to put the date and time in one line similar to google calendar when creating a reminder or event */}
          <Text onPress={()=>this.showDate()}>Set Date</Text>
          </Body>
          <Right>
          <Text>{this.state.date}</Text>
          </Right>
           </ListItem>
           <ListItem>
          <Body>
          <Text onPress={()=>this.showTime()}>Set time</Text>
          </Body>
          <Right>
          <Text>{this.state.time}</Text>
          </Right>
           </ListItem>
           </Card>
           <Card>
             <CardItem header>
             <Text>Select the type of trash you have</Text>
             </CardItem>
          
          <ListItem>
            <CheckBox checked={this.state.checkbox1} onPress={()=>this.setState({checkbox1:!this.state.checkbox1})} />
            <Body>
              <Text>Plastic Bottles</Text>
            </Body>
          </ListItem>
          <ListItem>
          <CheckBox checked={this.state.checkbox2} onPress={()=>this.setState({checkbox2:!this.state.checkbox2})} />
            <Body>
              <Text>Cardboard Box</Text>
            </Body>
          </ListItem>
          <ListItem>
          <CheckBox checked={this.state.checkbox3} onPress={()=>this.setState({checkbox3:!this.state.checkbox3})} />
            <Body>
              <Text>Paper</Text>
            </Body>
          </ListItem>
          <ListItem>
          <CheckBox checked={this.state.checkbox3} onPress={()=>this.setState({checkbox3:!this.state.checkbox3})} />
            <Body>
              <Text>Food</Text>
            </Body>
          </ListItem>
        
           </Card>
    
         <Card>
             <CardItem header>
               <Text>Contact Number</Text>
             </CardItem>
             <Form>
            <Item>
              <Input value={this.state.phoneNumber} placeholder="contact number" />
            </Item>
            </Form>
           </Card>
          <ScrollView>
            <KeyboardAvoidingView behavior="padding" enabled>
          <Form padder>
            <Textarea value={this.state.comment} rowSpan={5} bordered placeholder="Notes" />
          </Form>
          </KeyboardAvoidingView>
          </ScrollView>  
     
        <Body style={{flexDirection: "row", justifyContent: "center"}}>
          <Button title='CONFIRM' onPress={()=>this.handleSubmit()} />
        </Body>
        </Content>
      </Container>
      
    );
  }
}