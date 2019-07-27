import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  DeviceEventEmitter,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {
  Content, 
  Card,
  CardItem,
  Thumbnail,
  Header,
  Left,
  Button,
} from 'native-base';
import { MyContext } from '../App';
const { width: WIDTH, height: Hieght } = Dimensions.get('window');

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    // headerTitle: navigation.getParam("email"),
    // headerLeft: <Text>back</Text>,
    // headerRight: <Text onPress={() => navigation.goBack(null)}>back</Text>,
  });

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.getParam('userData'),
      token: this.props.navigation.getParam('token'),
      imgUrl:
        'https://www.shareicon.net/data/2016/05/26/771203_man_512x512.png',
    };
    fetch(`http://192.168.1.7:3000/user/${this.state.user.id}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => this.setState({ user: response.user }));

    //  DeviceEventEmitter.emit("updateData",{name:"Mihaned"})
  }

  componentDidMount() {
    alert(`Welcome Ya ${this.state.user.username}`);  
    console.log("Token From Profile : ", this.state.token);     //  DeviceEventEmitter.emit("updateUserName",{usrname:"KAKA"})
  }
  toSendScreen = () =>
    this.props.navigation.navigate('Send', { userData: this.state.user });

  toRecieveScreen = () =>
    this.props.navigation.navigate('Recieve', {id :            this.state.user.id ,  username: this.state.user.username ,token : this.state.token });
  
  render() {
    return ( 
      <MyContext.Consumer>
        {context => (
          <Content style={{backgroundColor:"#333"}}>
            <Header style = {styles.header} />
            <View style={{backgroundColor:"#333"}}>
              <Content contentContainerStyle={styles.content}>
                <Image
                  source={{ uri: this.state.imgUrl }}
                  style={styles.profileImage}
                />
                <Text style={styles.username}> {context.state.username} </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20 , color :"#eee" }}>
                    Points : {context.state.userPoints}{' '}
                  </Text>
              
               
                <View style={styles.navBtnCont}>
                  <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={this.toSendScreen}>
                    <Text style={styles.text}>Send</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={this.toRecieveScreen}>
                    <Text style={styles.text}>Receive</Text>
                  </TouchableOpacity>
                </View>
              </Content>
            </View>  
          </Content>
        )} 
      </MyContext.Consumer>
    );
  }
}

{
  /*=========================================== Styles ======================================== */
}

const styles = StyleSheet.create({
  content: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#242b38",
    margin:20,
    paddingVertical:22,
    borderRadius:50

  },
  profileImage: {
    borderRadius: 50,
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: 'gold',
  },
  
  username: {
    marginVertical: 20,
    fontSize: 20,
    color:"#eee" 
  },

  navBtnCont: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnLogin: {
    width: WIDTH - 100,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'gold',
    marginTop: 20,
    paddingBottom:10,
  },
  text: {
    marginTop: 7,
    color: 'rgba(0,0,0,0.7)',
    fontSize: 15,
    textAlign: 'center',
  },
  header: {
    backgroundColor:"gold"
  }
});
