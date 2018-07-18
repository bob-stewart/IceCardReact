'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';

import EInput from './EInput.js';
import EButton from './EButton.js';
import Card from './Card.js';

class MyCardScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {private: false};
  }
  showPrivate() {
    this.setState({
      private: !this.state.private,
    });
  }
  render() {
    let myCard = 'http://10.100.4.11:3000/testing-monkey-12';
    let privateButtonText = 'Show my private info';
    if (this.state.private) {
      privateButtonText = 'Show public info';
    }
    return (
      <ScrollView style={styles.padded}>
        <Card key={myCard} baseUrl={myCard} private={this.state.private} input />
        <EButton onPress={this.showPrivate.bind(this)}>
          {privateButtonText}
        </EButton>
      </ScrollView>
    );
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
});

module.exports = MyCardScreen;

