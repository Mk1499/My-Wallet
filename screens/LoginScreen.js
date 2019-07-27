import React from 'react';
import {
  StyleSheet,
   Text,
   TextInput ,
   View ,
   Image ,
   ImageBackground ,
   Dimensions ,
   TouchableOpacity ,
   KeyboardAvoidingView ,
   ScrollView ,
   Button ,
   DeviceEventEmitter

   } from 'react-native';

import {
  Spinner ,
  Toast,
  Icon
} from 'native-base' ;

import Context from '../config/Context' ;
import ContextProvider from '../Provider/ContextProvider' ;
import {MyContext} from '../App' ;
import bgImage from '../assets/images/background.jpeg' ;
import logo from '../assets/images/Bond.png' ;

import {Permissions , Notifications} from 'expo';

const {width : WIDTH , height : Hieght} = Dimensions.get('window') ;

export default class Login extends React.Component {

  constructor(props){
    super(props) ;
    this.state = {
      showPass : true ,
      press : false ,
      email : 'Khaled@gmail.com' ,
      password : '123456789' ,
      error : false ,
      displaySpinner : 'none' ,
      token : ''
    }

    // DeviceEventEmitter.emit("updateData",{name:"Mihaned"})
  }


  componentDidMount(){
    this.regForPushNotefication();
  }

  showPass = ()=>{
    if (this.state.press == false){
      this.setState({
        showPass:false , press : true
      }) ;

    }
    else {
      this.setState({
        showPass:true , press : false
      }) ;
    }
  }



// Get Token for notification
  regForPushNotefication = async ()=>{

  const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let filnalStatus = status;

  if (status !== 'granted'){
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
     filnalStatus = status;
      }
  if (filnalStatus !== 'granted'){
    console.log("No");
    return ;
  }

  let token = await Notifications.getExpoPushTokenAsync();
  console.log("Token : " ,token);
  this.setState({token})


  }


  // Login Function

  LoginFun = () => {
    this.setState({displaySpinner : 'flex' , error : false});

    console.log("email : "+this.state.email+"PAss : "+this.state.password);

    // seen = []
    let url = "https://bondserver.herokuapp.com/login"
    return fetch(url , {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: this.state.email,
      password: this.state.password
    }),
  })
  .then(resp => resp.json())
  .then(response => {
    this.setState({displaySpinner : 'none'})
    if(response.userData){

        DeviceEventEmitter.emit('updateUserName',{"name": response.userData.username});
        DeviceEventEmitter.emit('updateUserPoints',{"points": response.userData.points});

      this.props.navigation.navigate("Profile",{userData : response.userData , token : this.state.token})
    } else {
      this.setState({error: true}) ;
      () => Toast.show({
        text: 'Wrong Email or password!',
        buttonText: 'Okay'
      })
    }

  }) ;
}

  render() {
    return (
  <MyContext.Consumer>
     {
       (context)=>(

      <ImageBackground  style={styles.backgroundContainer}>

        <ScrollView contentContainerStyle={styles.scroll}>

           <KeyboardAvoidingView behavior="position">
              <View style = {styles.logoContainer}>
                <Image source={logo} style = {styles.logo}  />
                <Text style = {styles.logoText}>{context.state.AppName}</Text>
              </View>


              {/* Email View  */}
              <View style = {styles.inputContainer}>

                <TextInput
                    style = {styles.input}
                    placeholder = {'Email'}
                    placeholderTextColor = {'rgba(255,255,255,0.7)'}
                    underlineColorAndroid = 'transparent'
                    onChangeText = {email=> {
                      console.log(email);
                      return this.setState({email})}}
                    />
              </View >

              {/* Password View */}
              <View style = {styles.inputContainer}>


                <TextInput
                    style = {styles.input}
                    placeholder = {'Password'}
                    secureTextEntry = {this.state.showPass}
                    placeholderTextColor = {'rgba(255,255,255,0.7)'}
                    underlineColorAndroid = 'transparent'
                    onChangeText={password => this.setState({password})}/>


                <TouchableOpacity style={styles.btnEye}
                  onPress = {this.showPass}
                >

                </TouchableOpacity>

              </View>

          </KeyboardAvoidingView>



          <TouchableOpacity style={styles.btnLogin}
            onPress = {()=> {
              context.changeEmail(this.state.email) ;
              return this.LoginFun()}}
            >
                  <Text style={styles.text} >Login</Text>
          </TouchableOpacity>

          <Text
          title="Go to Registration"
          onPress={() => this.props.navigation.navigate("Registration",{})}
          style={styles.RegLink}
          > Don't Have Account <Text style={styles.SignUpText}> Sign Up Now </Text> </Text>

          <Spinner color='gold' style = {{display : this.state.displaySpinner}} />
          <Text style={ this.state.error ? styles.errorDiv : styles.hideError}> Sorry but there is not valid email or password</Text>
        </ScrollView>

      </ImageBackground>
          )
        }
      </MyContext.Consumer>

    );
  }
}



{/*  ========================================  Styles ==================================== */}
  const styles = StyleSheet.create({
  backgroundContainer: {
    width: null ,
    height : null ,
    backgroundColor: "#374861"

  },

  scroll : {
    // flex: 1,
    height : Hieght,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo : {
    width:120 ,
    height:120 ,
    borderRadius : 20 ,
    opacity : 1
  } ,
  logoContainer : {
    alignItems : 'center'
  } ,
  logoText : {
    color : 'white' ,
    fontSize : 20 ,
    fontWeight: '500',
    marginTop: 10,
    opacity : 0.8
  } ,
  input :  {
    width: WIDTH - 50 ,
    height: 45 ,
    borderRadius : 25 ,
    fontSize : 16 ,
    paddingLeft: 45 ,
    backgroundColor : 'rgba(0,0,0,0.35)' ,
    color: 'rgba(255,255,255,0.7)' ,
    marginHorizontal: 25,
  } ,
  inputIcon : {
    position : 'absolute' ,
    top : 8 ,
    left : 37 ,
    color: "#333"
  } ,
  inputContainer :  {
    marginTop : 10
  } ,
  btnEye:{
    position : 'absolute' ,
    top : 8 ,
    right : 37
  } ,
  btnLogin:{
    width: WIDTH - 50 ,
    height: 45 ,
    borderRadius : 25 ,
    backgroundColor:'gold' ,
    marginTop : 20

  },
  text:{
    marginTop:7 ,
    color:'rgba(0,0,0,0.7)' ,
    fontSize: 15 ,
    textAlign : 'center'
  } ,
  RegLink:{
    marginTop:15 ,
    color:'#fff' ,
    fontSize: 20 ,
    textAlign : 'center'
  } ,
  SignUpText : {
    color:'gold'
  } ,
  hideError : {
    display : 'none'
  } ,
  errorDiv : {
    backgroundColor : 'red' ,
    color : 'white' ,

  }

});
