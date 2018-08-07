'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

import EText from './EText.js';
import EButton from './EButton.js';
import EInput from './EInput.js';
import Card from './Card.js';

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

  setMine() {
    this.props.navigation.navigate('My Card', {
      newBaseUrl: this.state.baseUrl
    });
  }

  render() {
    if (this.state && this.state.doneScan) {
      const scanButton = (
        <EButton onPress={this.scanNew.bind(this)}>
          Scan another card
        </EButton>
      );
      return (
        <ScrollView contentContainerStyle={styles.padded}>
          {scanButton}
          <Card key={this.state.baseUrl} baseUrl={this.state.baseUrl} />
          <EButton onPress={this.setMine.bind(this)}>This is my card</EButton>
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
    padding: 12,
  },
});

module.exports = ScanScreen;

