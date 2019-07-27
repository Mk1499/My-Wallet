import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Entypo , FontAwesome} from "@expo/vector-icons" 
import { Text } from 'react-native';

import Profile from '../screens/ProfileScreen';
import Login from '../screens/LoginScreen';
import Registration from '../screens/RegistrationScreen';
import Send from '../screens/SendScreen' ; 
import Recieve from '../screens/ReceiveScreen' ; 


const UsersTransaction = createStackNavigator({
  
  Profile: {
    screen: Profile,
    navigationOptions: {
      header : null 
    }
  },
  
  Recieve : {
    screen : Recieve , 
    navigationOptions : ()=> ({
      headerTitle : "Recieve Points" 
    })
  },
  
  Send : {
    screen:Send , 
    navigationOptions: ()=> ({
      headerTitle : "Scan QR Code" ,
    })
  }  

  
})


const Main = createBottomTabNavigator({
   Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <Entypo name="user" color={tintColor} size={20} />
      }
    }
  },
  
  Transaction:{
      screen: UsersTransaction , 
      navigationOptions: {
          tabBarIcon: ({tintColor})=>{
              return <FontAwesome name="home" color={tintColor} size={20} />
          } ,
          headerTitle: "Home",
      }
  }
 
}, {}) ; 



const HomeRoute = createStackNavigator({
  Login:{
    screen:Login , 
    navigationOptions: () => ({
      headerTitle :null , 
      header:null 
    })
  },
  Registration:{
    screen:Registration , 
    navigationOptions: ()=>({
      headerTitle : "Registration" , 
      header : null
    })
  },
  Profile : {
    screen : UsersTransaction , 
    navigationOptions: () => ({
      headerTitle : "Profile" ,
      header : null
    })
  }
})



const screens = createStackNavigator({ Main }, { defaultNavigationOptions: { header: null } })

const AppNavigation = createAppContainer(HomeRoute);
export default AppNavigation;
