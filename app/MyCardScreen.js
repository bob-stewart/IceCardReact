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
  render() {
    let myCard = 'http://10.100.4.11:3000/testing-monkey-12';
    return (
      <ScrollView style={styles.padded}>
        <Card key={myCard} baseUrl={myCard} input />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  padded: {
    padding: 24,
  },
});

module.exports = MyCardScreen;

