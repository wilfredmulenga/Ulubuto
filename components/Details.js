import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, ListItem, CheckBox, Body } from 'native-base';
import TextArea from './Textarea'
import DatePicker from './DatePicker'
import TimePickerAndroid from 'react-native'

export default class Details extends Component {
  constructor(props){
    super(props)
    this.state ={
      clicked: false
    }
     this.timePicker = this.timePicker.bind(this) 
  }
  timePicker = ()=>{
    try {
      const {action, hour, minute} =  TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
   }
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem header>
              <Text>When would you like your trash picked up</Text>
             </CardItem>
             <DatePicker/>
             <Text onPress={()=>this.timePicker()}>Select Time</Text>
           </Card>
           <Card>
             <CardItem header>
             <Text>Select the type of trash you have</Text>
             </CardItem>
             <Content>
          <ListItem>
            <CheckBox checked={this.state.clicked} onPress={()=>this.setState({clicked:!this.state.clicked})} />
            <Body>
              <Text>Plastic Bottles</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Cardboard Box</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} color="green"/>
            <Body>
              <Text>Paper</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} color="green"/>
            <Body>
              <Text>Food</Text>
            </Body>
          </ListItem>
        </Content>
           </Card>
           <TextArea/>
        </Content>
      </Container>
    );
  }
}