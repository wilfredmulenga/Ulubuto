import React from 'react';
import Map from './Map'
import { Location, Permissions } from 'expo'
import {Text,Container } from 'native-base'
import {View,Button, Alert} from 'react-native'

const deltas = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };


class HomeScreen extends React.Component {
    constructor(props){
      super(props)
      this.state={
          region : null,
          show : false,
          locationStatus : false
      } 
      this.locationPrompt = this.locationPrompt.bind(this)
     // this.locationPrompt()
    }
    locationPrompt = ()=>{
      Alert.alert('turn on location services')
    }

    componentWillMount() {
        this.getLocationAsync();
      }
      getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        console.log(status)
        if (status !== 'granted') {
          console.log('location')
          this.setState({
            errorMessage: 'Permission to access location was denied',
            locationStatus : false
          });
        }
    
        let location = await Location.getCurrentPositionAsync({});
        const region = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          ...deltas
        };
        await this.setState({ region });
        // await this.setState({
        //     show : true
        // })
      }
    render(){
        
            if(true){
                return(
                  <View style={{flex:1}}>
                    <Map/>
                    <View
        style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: '80%', //for center align
            alignSelf: 'center' //for align to right
        }}
    >
      <Button title='SET TRASH PICKUP'onPress={() => this.props.navigation.navigate('Details',{location:this.state.region})}/>
    
     
      </View>
                  </View>
                          
                         
                     
                )
            }else{
                return(
                   <Container>
                       <Text>Loading Map...</Text>
                   </Container>
                )
            }
       
    }
}

export default HomeScreen;