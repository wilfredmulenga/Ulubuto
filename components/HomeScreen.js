import React from 'react';
import Map from './Map'
import { Location, Permissions } from 'expo'
import {Text,Container } from 'native-base'
import {View,Button} from 'react-native'

const deltas = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };


class HomeScreen extends React.Component {
    constructor(props){
      super(props)
      this.state={
          region : null,
          show : false
      }
    }
    componentWillMount() {
        this.getLocationAsync();
      }
      getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied'
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
      <Button title='SET TRASH'onPress={() => this.props.navigation.navigate('Details',{location:this.state.region})}/>
    
     
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