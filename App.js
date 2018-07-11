'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

const endpoint = 'http://exochain-luna:3000';

class ScanScreen extends Component {
  onSuccess(e) {
    let url = e.data + '.json';
    fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        setState({
          ok: false,
        });
      }
    })
    .then((json) => {
      this.setState({card: json})
    });
  }

  renderContact(contact) {
    return (
      <>
        <Text h1>
          {contact.you.name}'s contact info
        </Text>
        <Text>
          {contact.you.email}
        </Text>
        <Text>
          {contact.you.phone}
        </Text>
        <Text>
          {contact.you.address}
        </Text>
      </>
    );
  }
  render() {
    if (this.state && this.state.card) {
      }
      return (
        <ScrollView>
          // This is broken because I don't know how to do this correctly
          {renderContact(this.state.you)}
        </ScrollView>
      );
    }
    else {
      return (
        <QRCodeScanner
          onRead={this.onSuccess.bind(this)}
          topContent={
            <Text style={styles.centerText}>
              Scan an ICE Card QR
            </Text>
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
          }
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

AppRegistry.registerComponent('default', () => ScanScreen);

module.exports = ScanScreen
