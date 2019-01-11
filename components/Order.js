import React from 'react'
import {Container, Text, Card , Body, CardItem } from 'native-base'
import Firebase from './config/firebase'

var element = []
var listOfOrders


export default class Order extends React.Component{
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
        console.log(this.state.userUID)
        Firebase.database()
        .ref(`Users/${this.state.userUID}`)
        .once('value', (snapshot) => {
            if (snapshot.val() !== null) {
                listOfOrders = snapshot.val()
                console.log(snapshot.val())
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
            <Container>
                {(this.state.order!==null)? this.state.order.map((element,i)=>
                <Card key={i}>
                <CardItem header >
                <Text>Order #</Text>
                </CardItem>
                <CardItem>
                <Body>
                    <Text>Date {element.date}</Text>
                    <Text>Time {element.time}</Text>
                    <Text>Details {element.details}</Text>
                    <Text>Cost: K25</Text>
                </Body>
                </CardItem>
            </Card>
                ):null}
            </Container>
        )
    }
}