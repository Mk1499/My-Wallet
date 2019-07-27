import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';

import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Card,
} from 'react-native';
import { MyContext } from '../App';
import bgImage from '../assets/images/background.jpeg';

import {Notifications , Permissions} from 'expo';


const { width: WIDTH, height: Hieght } = Dimensions.get('window');

export default class Recieve extends Component {
  state = {
    text: 'http://facebook.github.io/react-native/',
    data: `{"id" : ${this.props.navigation.getParam('id')} , "username" : "${this.props.navigation.getParam('username')}" , "points" : 5 , "token" : "${this.props.navigation.getParam('token') || '"ExponentPushToken[cufXgMGLq_lpwoIyqurRh7]"'} " } `,
  };
  
 
  componentDidMount(){
 
    // alert(this.state.data)
 
  }
 
 



  render() {
    return (
      <MyContext.Consumer>
        {context => (
          
            <ScrollView contentContainerStyle={styles.scroll}>
              <KeyboardAvoidingView behavior="position">
                <View style={styles.container}>
                  <QRCode
                    value={this.state.data}
                    size={200}
                    bgColor="black"
                    fgColor="white"
                  />
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
       
        )}
      </MyContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
  },
  scroll:{
    backgroundColor: '#eee', 
    height : Hieght 
  }
});
