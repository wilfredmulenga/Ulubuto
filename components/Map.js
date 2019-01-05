import React from 'react';
import { MapView} from 'expo';

const latitude= -15.3875;
const longitude= 28.3228;

class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      region: {
        latitude: -15.3875,
        longitude: 28.3228,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
     
  }
  // this.onRegionChange = this.onRegionChange.bind(this)
}
    
  // onRegionChange(region) {
  //  this.setState({
  //    region: region
  //  })
  // }
  render() {
    const coordinate = {latitude,longitude}
    return (
      <MapView
      style={{flex:1}}
      region={this.state.region}
      // onRegionChange={this.onRegionChange}
      >
        <MapView.Marker
      coordinate={coordinate}
       title={'title'}
       description={'description'}
       draggable
    onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
    />
      </MapView>
    );
  }
}

export default Map;