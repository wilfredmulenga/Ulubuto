import React from 'react';
import { MapView} from 'expo';
import { GOOGLE_MAPS_KEY } from 'react-native-dotenv'
import { View, Alert, Dimensions, Text, StyleSheet, Image, SafeAreaView } from 'react-native'
import { Location, Permissions, Font, AppLoading } from 'expo'

const deltas = {
  latitudeDelta: 0.005,
  longitudeDelta: 0.005
};

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = -15.3875;
const LONGITUDE = 28.3228;


const initialRegion = {
  latitude: LATITUDE,
  longitude: LONGITUDE ,
  latitudeDelta: deltas.latitudeDelta,
  longitudeDelta: deltas.longitudeDelta
};

class Map extends React.Component {
  constructor(props){
    super(props)
    this.state={
      location : this.props.location,
      locationStatus: '',
      region:   initialRegion,
      newLocation : {
        latitude : LATITUDE,
        longitude: LONGITUDE
      },
      newRegion : {
        latitude : LATITUDE,
        longitude: LONGITUDE
      },
     
    }
    this.locationPrompt = this.locationPrompt.bind(this)
    this.onRegionChange = this.onRegionChange.bind(this)
    this.onRegionChangeComplete = this.onRegionChangeComplete(this)
    
}

onRegionChange(region) {
  this.setState({
    region : region
  })
}

onRegionChangeComplete(region){
  console.log('onRegionChangeComplete',region)
}

locationPrompt = ()=>{
  Alert.alert('Please turn on location services')
}
async componentWillMount() {
 
    this.getLocationAsync();
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
//         location : JSON.stringify(responseJson.results[1].formatted_address)
//       }) 
//       return this.state.location
// }).then((location)=>{
//    this.props.handleChange(location)
// })
  
  await this.setState({region:region ,  });
 
  await this.setState({
      show : true
  })
  

}

   
  render() {
    return ( 
        <View style={styles.map}>
           <MapView
      style={{flex:1}}
      region={this.state.region}
      initialRegion={{ ...initialRegion, ...deltas }}
      showsUserLocation
     // onRegionChange={this.onRegionChange}
      onRegionChangeComplete={this.onRegionChange}
      minZoomLevel = {0}
      maxZoomLevel = {16}
      loadingEnabled = {true}
    
      scrollEnabled={true}
        moveOnMarkerPress={false}
      
      >
       
      <MapView.Marker coordinate={this.state.region}
        //onPress={(press)=>console.log(press)}
  image={require('../assets/icons8-place-marker-48.png')}
      draggable
      />
      </MapView>
      {/* <View style={styles.markerFixed}>
          <Image style={styles.marker} source={marker} />
        </View> */}
        <SafeAreaView style={styles.footer}>
          <Text style={styles.region}>{JSON.stringify(this.state.region, null, 2)}</Text>
        </SafeAreaView>
        </View>  
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  marker: {
    height: 48,
    width: 48
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%'
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20
  }
})

export default Map;