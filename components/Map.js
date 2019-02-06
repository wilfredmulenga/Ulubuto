import React from 'react';
import { MapView} from 'expo';
import { GOOGLE_MAPS_KEY } from 'react-native-dotenv'
import { View, Alert, Dimensions, Button, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Location, Permissions, Font, AppLoading } from 'expo'
import marker from '../assets/icons8-place-marker-48.png'
import { Header, Icon } from 'react-native-elements'

const deltas = {
  latitudeDelta: 0.005,
  longitudeDelta: 0.005
};

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = -15.3875;
const LONGITUDE = 28.3228;
let newLocation = ''

const initialRegion = {
  latitude: LATITUDE,
  longitude: LONGITUDE ,
  latitudeDelta: deltas.latitudeDelta,
  longitudeDelta: deltas.longitudeDelta
};

class Map extends React.Component {
  static navigationOptions = {
    title: 'Trash Pickup',
  };
  constructor(props){
    super(props)
    this.state={
   
      locationStatus: '',
      region:   initialRegion,  
       
    }
    this.locationPrompt = this.locationPrompt.bind(this)
    this.onRegionChange = this.onRegionChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handlebuttonClick = this.handlebuttonClick.bind(this)
    this.getLocationAsync();
    
}

handlebuttonClick=()=>{
  this.props.navigation.navigate('Details',{location:newLocation,title:'Details'})
  console.log('button click') 
}



handleLocationChange = (region)=>{
  // this.setState({
  //   region : region
  // })
}


onRegionChange(region) {
  // this.setState({
  //   region : region
  // })
//   console.log('onRegionChange',region)
  fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ region.latitude + ',' + region.longitude + '&key=' + GOOGLE_MAPS_KEY )
.then((response) => response.json())
.then((responseJson) => {
    //console.log("address", JSON.stringify(responseJson.results[1].formatted_address));
    
    newLocation = responseJson.results[1].formatted_address
    console.log(newLocation)
})
}
  


locationPrompt = ()=>{
  Alert.alert('Please turn on your locations service')
  console.log("location off")
}



getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if(!status.locationServicesEnabled){
    this.setState({
      locationStatus:false
    })
    this.locationPrompt()
   
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
 
 
  await this.setState({region:region ,  });
 
}

   
  render() {
    return ( 
        <View style={styles.map}>
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
           <MapView
      style={{flex:1}}
      region={this.state.region}
      initialRegion={{ ...this.state.region, ...deltas }}
     // onRegionChange={this.onRegionChange}
      onRegionChangeComplete={this.onRegionChange}
      minZoomLevel = {0}
      maxZoomLevel = {16}
      loadingEnabled = {true}
      showsUserLocation ={true}
      onUserLocationChange = {this.handleLocationChange}
      scrollEnabled={true}
        provider='google'
      
      >
{/*        
      <MapView.Marker coordinate={this.state.region}
        //onPress={(press)=>console.log(press)}
  image={require('../assets/icons8-place-marker-48.png')}
      draggable
      /> */}
      </MapView>
      <View style={styles.markerFixed}>
          <Image style={styles.marker} source={marker} />
        </View>
        {/* <SafeAreaView style={styles.footer}>
          <Text style={styles.region}>{JSON.stringify(this.state.region, null, 2)}</Text>
        </SafeAreaView> */}
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
      </View></View>
        </View>  
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  markerFixed: {
    position: 'absolute',//use absolute position to show button on top of the map
    top: '50%', //for center align
    alignSelf: 'center' //for align to right
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