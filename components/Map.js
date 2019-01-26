import React from 'react';
import { MapView} from 'expo';
import { GOOGLE_MAPS_KEY } from 'react-native-dotenv'
import { View, Alert } from 'react-native'
import { Location, Permissions, Font, AppLoading } from 'expo'

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0021
};

const initialRegion = {
  latitude: -15.3875,
  longitude: 28.3228,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0021
};

class Map extends React.Component {
  constructor(props){
    super(props)
    this.state={
      locationStatus: '',
      region:  initialRegion,
      newLocation : {
        latitude : -15.442,
        longitude:28.349
      }
     
    }
    this.locationPrompt = this.locationPrompt.bind(this)
}
locationPrompt = ()=>{
  Alert.alert('Please turn on location services')
}
async componentWillMount() {
  await Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
  });
 
   // this.getLocationAsync();
  }

getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if(!status.locationServicesEnabled){
    this.setState({
      locationStatus:false
    })
  }else{
    this.setState({
      locationStatus:true
    })
  }
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
  console.log(region)
//   fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ region.latitude + ',' + region.longitude + '&key=' + GOOGLE_MAPS_KEY )
//   .then((response) => response.json())
//   .then((responseJson) => {
//       console.log("address", JSON.stringify(responseJson.results[1].formatted_address));
//       this.setState({
//         address : JSON.stringify(responseJson.results[1].formatted_address)
//       })
// })
  await this.setState({region:region,  });
  await this.setState({
      show : true
  })
  

}

   
  render() {
    return ( 
    
        <MapView
      style={{flex:1}}
      region={initialRegion}
      initialRegion={{ ...initialRegion, ...deltas }}
      showsUserLocation
      minZoomLevel = {0}
      maxZoomLevel = {16}
    
      scrollEnabled={true}
        moveOnMarkerPress={false}
      //  onRegionChange={(region)=>this.setState({
      //    region:region
      //  })}
      >
      <MapView.Marker coordinate={this.state.region}
        onPress={(press)=>console.log(press)}
        moveOnMarkerPress={(press)=>console.log(press)}
      draggable
      />
      </MapView>
       
    );
  }
}

export default Map;