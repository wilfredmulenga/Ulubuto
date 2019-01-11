import React from 'react';
import { MapView} from 'expo';
import {Text,Container, Button} from 'native-base'
import {View} from 'react-native'


const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

const initialRegion = {
  latitude: -15.3875,
  longitude: 28.3228,
};

class Map extends React.Component {
  constructor(props){
    super(props)
    this.state={
      locationStatus: this.props.locationStatus
    }
}


   
 
  render() {
    return ( 
        <MapView
      style={{flex:1}}
      region={this.props.region}
      initialRegion={{ ...initialRegion, ...deltas }}
      showsUserLocation
        showsMyLocationButton
      />
      
    );
  }
}

export default Map;