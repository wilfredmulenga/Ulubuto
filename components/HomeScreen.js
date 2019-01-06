import React from 'react';
import Map from './Map'
import { Location, Permissions } from 'expo'
import {Text,Container, Button} from 'native-base'
import {View} from 'react-native'

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
        //this.getLocationAsync();
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
                          <View style={{flex:1,position:'absolute',flexDirection:'column',justifyContent:'center', alignItems:'flex-end'}}>
                          <Button>
            <Text>Click Me!</Text>
          </Button>
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