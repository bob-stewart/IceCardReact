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

import EText from './app/EText.js';
import Card from './app/Card.js';

class EButton extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.buttonTouchable} onPress={this.props.onPress}>
        <EText style={styles.buttonText}>
          {this.props.children}
        </EText>
      </TouchableOpacity>
    );
  }
}

class ScanScreen extends Component {
  onSuccess(e) {
    this.setState({
      baseUrl: e.data,
      doneScan: true,
    });
  }
  scanNew() {
    this.setState({
      baseUrl: null,
      doneScan: false,
    });
  }

  showPrivate() {
    this.setState({
      private: !this.state.private,
    });
  }

  render() {
    if (this.state && this.state.doneScan) {
      const scanButton = (
        <EButton onPress={this.scanNew.bind(this)}>
          Scan another card
        </EButton>
      );
      let privateButtonText = 'Show my private info';
      if (this.state.private) {
        privateButtonText = 'Show public info';
      }
      return (
        <ScrollView style={styles.padded}>
          {scanButton}
          <Card baseUrl={this.state.baseUrl} private={this.state.private} />
          <EButton onPress={this.showPrivate.bind(this)}>
            {privateButtonText}
          </EButton>
          {scanButton}
        </ScrollView>
      );
    }
    else {
      return (
        <QRCodeScanner
          onRead={this.onSuccess.bind(this)}
          topContent={
            <EText style={styles.centerText}>
              Scan an ICE Card QR
            </EText>
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <EText style={styles.buttonText}>OK. Got it!</EText>
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
  padded: {
    padding: 24,
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
  heading: {
    color: '#111',
    fontSize: 30,
    paddingTop: 20,
  },
});

AppRegistry.registerComponent('default', () => ScanScreen);

module.exports = ScanScreen
