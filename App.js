import
{ StyleSheet, Text, View ,
  TextInput ,
  DeviceEventEmitter

} from 'react-native';
import io from 'socket.io-client' ;
import AppNavigation from './routes/navigator';
import React, { Component } from 'react';
import {Constants , Permissions , Notifications , Font} from 'expo' ;
import Expo from "expo";



export const MyContext = React.createContext() ;

class MyProvider extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      email : 'Default Email' ,
      phone : 'phone from provider' ,
      username : 'MK14' ,
      userID:0,
      AppName : 'My Wallet',
      userPoints:0,
      userData : {},
      token :""
    }


 Notifications.addListener(async (data)=>{
  this.setState({userPoints : this.state.userPoints + 5})
  await alert("Seccuess Recieving Points") ;
  console.log(data);

});

   DeviceEventEmitter.addListener('updateUserName', (user)=>{
    this.setState({username: user.name}) ;
   })

   DeviceEventEmitter.addListener('updateUserPoints', (user)=>{
    this.setState({userPoints: user.points});
       })
  }
  componentDidMount(){

  }




  changeEmail = (email) =>  this.setState({email});
  changePoints = (points) => this.setState({points});
  changeUserData = (userData)=> this.setState({userData});






  render(){
    return (
    <MyContext.Provider value ={{state : this.state , changeEmail: this.changeEmail}}>
      {this.props.children}
    </MyContext.Provider>
    ) ;
  }
}


export default class App extends React.Component {


  constructor(props) {
     super(props);
     this.state = { loading: true };
   }

   async componentDidMount() {
     await Expo.Font.loadAsync({
       Roboto: require("native-base/Fonts/Roboto.ttf"),
       Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
       Ionicons: require('native-base/Fonts/Ionicons.ttf'),
     });
     this.setState({ loading: false });
   }



  render() {

    
    return (

      <MyProvider>
        <AppNavigation />
      </MyProvider>
    );
  }
}
