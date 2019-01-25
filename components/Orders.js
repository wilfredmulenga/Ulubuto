import React from 'react'
import {Container, Text, Card , Body, CardItem } from 'native-base'
import Firebase from './config/firebase'
import { ScrollView } from 'react-native'
import { ButtonGroup,Header  } from 'react-native-elements';

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
            order : null,
            pendingOrders : [],
            completedOrders : [],
            selectedIndex: 1
        }
          this.updateIndex = this.updateIndex.bind(this)
        this.loadOrders = this.loadOrders.bind(this)
        this.loadOrders()
    }
    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
      }
      

    loadOrders=()=>{
       
        Firebase.database()
        .ref(`Users/${this.state.userUID}`)
        .orderByChild("status")
        .equalTo('pending')
        .once('value', (snapshot) => {
            if (snapshot.val() !== null) {
                listOfOrders = snapshot.val()
                for (const index in listOfOrders) {
                    element.push(listOfOrders[index])
                }
                this.setState({
                    pendingOrders: element,
                    loaded: true
                })
                listOfOrders = []
                element = []
            }
          })
          Firebase.database()
          .ref(`Users/${this.state.userUID}`)
          .orderByChild("status")
          .equalTo('completed')
          .once('value', (snapshot) => {
              if (snapshot.val() !== null) {
                  listOfOrders = snapshot.val()
                  for (const index in listOfOrders) {
                      element.push(listOfOrders[index])
                  }
                  this.setState({
                      completedOrders: element,
                      loaded: true
                  })
                  listOfOrders = []
                  element = []
              }
            })
          console.log(this.state.order)
    }
  
    render(){
        const buttons = [ 'Completed','Pending']
        const { selectedIndex } = this.state
        console.log(selectedIndex)
        return(
            <ScrollView>
                 <Header
  leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={{ text: 'Details', style: { color: '#fff' } }}
  // rightComponent={{ icon: 'home', color: '#fff' }}
/>
                  <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{height: 50}}
    />
                {(selectedIndex===1)? this.state.pendingOrders.map((element,i)=>
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
                {(selectedIndex===0)? this.state.completedOrders.map((element,i)=>
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