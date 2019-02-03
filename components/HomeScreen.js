import React from 'react';
import Map from './Map'
import { Header, Icon } from 'react-native-elements'
import {View, Alert, Button, TouchableOpacity } from 'react-native'
import TabHeader from './TabHeader'

 



class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Trash Pickup',
  };

    constructor(props){
      super(props)
      this.state={
         
          location: '',
         
         
      } 
      
      this.handlebuttonClick = this.handlebuttonClick.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }


    
    handleChange = (location) => {
      this.setState({
          location: location
      })
      console.log('in home', this.state.location)
  }

  handlebuttonClick=()=>{
    this.handleChange(this.state.location)
    this.props.navigation.navigate('Details',{location:this.state.location,title:'Details'})
    console.log('button click')
    
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
centerComponent={{ text: 'Trash PickUp', style: { color: '#fff' } }}
// rightComponent={{ icon: 'home', color: '#fff' }}
/>
                    <Map location={this.state.location} handleChange={this.handleChange} />
                    <View
        style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: '85%', //for center align
            alignSelf: 'center' //for align to right
        }}
    >
      <View>
      <TouchableOpacity style={{width:160,height:50}}>
      <Button  color='#008000' title='CONFIRM' onPress={()=> this.handlebuttonClick()}/>
      </TouchableOpacity>
      </View>
    
    
      </View>
                  </View>      
                )
          
       
    }
}

export default HomeScreen;