import React from 'react'
import { Header, Icon } from 'react-native-elements'

class  TabHeader extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Header backgroundColor='#008000'
leftComponent= {<Icon
  
  name='menu'
  type='material'
  color='#fff'
  size={32}
 
  onPress={() => this.props.navigation.openDrawer()} />}
centerComponent={{ text: this.props.title, style: { color: '#fff' } }}
// rightComponent={{ icon: 'home', color: '#fff' }}
/>
        )
    }
}

export default TabHeader
