import React from 'react';
import Map from './Map'
import { Location, Permissions, Font, AppLoading } from 'expo'
import {Text,Container, Button} from 'native-base'
import {View, Alert} from 'react-native'

const deltas = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Set Trash Pickup Location',
  };

    constructor(props){
      super(props)
      this.state={
          region : null,
          show : false,
          loading: true,
          locationStatus : false
      } 
      this.locationPrompt = this.locationPrompt.bind(this)
      this.handlebuttonClick = this.handlebuttonClick.bind(this)
      
    }

    handlebuttonClick=()=>{
      this.props.navigation.navigate('Details',{location:this.state.region,title:'Details'})
       if(this.state.locationStatus){
       
       }else{
       
       }
    }
    locationPrompt = ()=>{
      Alert.alert('Please turn on location services')
    }

    async componentWillMount() {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      });
      this.setState({ loading: false });
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
        console.log(location)
        await this.setState({ region });
        // await this.setState({
        //     show : true
        // })
      }
    render(){
        
            if(!this.state.loading){
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
      <Button success full onPress={() => this.handlebuttonClick()}>
      <Text>CONFIRM</Text>
      </Button>
    
     {(!this.state.locationStatus)?this.locationPrompt():null}
      </View>
                  </View>
                          
                         
                     
                )
            }else{
                return(
                   <Container>
                       <AppLoading/>
                   </Container>
                )
            }
       
    }
}

export default HomeScreen;