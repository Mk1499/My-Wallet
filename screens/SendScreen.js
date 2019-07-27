import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

export default class Send extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    customerId: '7',
    user: this.props.navigation.getParam('userData'),
    userPoints: this.props.navigation.getParam('userData').points,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 150,
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={styles.barCodeContainer}
        />
      </View>
    );
  }

  // Send Notification
  sendNotification = token => {
   
    token = token.replace(/\s/g, '');
    let url = 'https://exp.host/--/api/v2/push/send';
    let url2 = "https://320c36a815.to.intercept.rest";
    fetch(url, {
      method: 'POST', 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          to: token, 
          sound: 'default',
          body: `Hello , ${this.state.user.username} send 5 points to you`,
        },
      ]),
    });
    // .then(response )
  };

  // Scan QR Code
  handleBarCodeScanned = ({ type, data }) => {
    let url = 'https://bondserver.herokuapp.com/';
    this.setState({ scanned: true });
    let transactionInfo = JSON.parse(data);
    transactionInfo['customerId'] = this.state.user.id;
    transactionInfo['customerPoints'] = this.state.user.points;

    console.log('Token : : ', transactionInfo);
    // send Notification to Recieved user
    this.sendNotification(transactionInfo['token']);

    if (transactionInfo.points <= this.state.userPoints) {
      console.log(
        'user points : ' +
          this.state.user.points +
          ' price : ' +
          transactionInfo.points
      );
      alert(`Success send Points to ${transactionInfo['username']}`);

      // Decrease user points According to transactions
      DeviceEventEmitter.emit('updateUserPoints', {
        points: this.state.userPoints - transactionInfo.points,
      });
      this.setState({
        userPoints: this.state.userPoints - transactionInfo.points,
      });

      fetch(url + 'exPoints', {
        method: 'POST',

        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(transactionInfo),
      })
        .then(() => this.props.navigation.navigate('Profile', {}))

        .catch(err => {
          console.log(err);
        });
    } else {
      console.log(
        'user points : ' +
          this.state.user.points +
          ' price : ' +
          transactionInfo.points
      );
      alert('Sorry but Your Credit is less that product price ');
    }
  };
}

const styles = StyleSheet.create({
  barCodeContainer: {
    width: 600,
    height: 600,
  },
});
