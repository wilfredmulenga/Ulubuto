import React from 'react'
import {Container, Text, Card , Body, CardItem } from 'native-base'
import Firebase from './config/firebase'
import { ScrollView } from 'react-native'

var element = []
var listOfOrders

export default class PendingOrders extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('title'),
        };
      };
    constructor(props){
        super(props)
        this.state={
            userUID: 'uOuwqfL9oJbsCex5JYSxAaoDeCz1',
            //this.props.navigation.getParam('userUID'),
            order : null
        }
        this.loadOrders = this.loadOrders.bind(this)
        this.loadOrders()
    }

    loadOrders=()=>{
       
        Firebase.database()
        .ref(`Users/${this.state.userUID}/pending`)
        .once('value', (snapshot) => {
            if (snapshot.val() !== null) {
                listOfOrders = snapshot.val()
             
                for (const index in listOfOrders) {
                    element.push(listOfOrders[index])
                }
                this.setState({
                    order: element,
                    loaded: true
                })
            }
          })
          console.log(this.state.order)
    }
  
    render(){
        return(
            <ScrollView>
                {(this.state.order!==null)? this.state.order.map((element,i)=>
                <Card key={i}>
                {/* <CardItem header >
                <Text>Order #</Text>
                </CardItem> */}
                <CardItem>
                <Body>
                    <Text>Date: {element.date}</Text>
                    <Text>Time: {element.time}</Text>
                    <Text>Details: {element.details}</Text>
                    <Text>Cost: K25</Text>
                </Body>
                </CardItem>
            </Card>
                ):null}
            </ScrollView>
        )
    }
}