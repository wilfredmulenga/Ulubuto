import React from 'react'
import Firebase from './config/firebase'
import { ScrollView } from 'react-native'
import { ButtonGroup, Card, Text, Header, Icon  } from 'react-native-elements';
import TabHeader from './TabHeader'
import Loading from './Loading'

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
            userUID: 'RDN8nzjqLahu7Q06l8Dlao4gsX02',
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
          
    }
  
    render(){
        const buttons = [ 'Completed','Pending']
        const { selectedIndex } = this.state
       
        return(
            <ScrollView>
                   <Header backgroundColor='#008000'
leftComponent= {<Icon
  
  name='menu'
  type='material'
  color='#fff'
  size={32}
 
  onPress={() => this.props.navigation.openDrawer()} />}
centerComponent={{ text: 'Orders', style: { color: '#fff' } }}
// rightComponent={{ icon: 'home', color: '#fff' }}
/>
                  <ButtonGroup 
                  underlayColor="#008000"
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{height: 50}}
    />
                {(listOfOrders===undefined) ? <Loading/> :(selectedIndex===1)? this.state.pendingOrders.map((element,i)=>
                <Card key={i}>
                {/* <CardItem header >
                <Text>Order #</Text>
                </CardItem> */}
             
           
                    <Text>Date: {element.date}</Text>
                    <Text>Time: {element.time}</Text>
                    <Text>Details: {element.details}</Text>
                    <Text>Cost: K25</Text>
              
               
            </Card>
                ):null}
                {(selectedIndex===0)? this.state.completedOrders.map((element,i)=>
                <Card key={i}>
                {/* <CardItem header >
                <Text>Order #</Text>
                </CardItem> */}
              
          
                    <Text>Date: {element.date}</Text>
                    <Text>Time: {element.time}</Text>
                    <Text>Details: {element.details}</Text>
                    <Text>Cost: K25</Text>
              
            </Card>
                ):null}
            </ScrollView>
        )
    }
}