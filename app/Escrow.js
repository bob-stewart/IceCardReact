'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  ScrollView,
  AsyncStorage,
} from 'react-native';

import Password from './Password.js';
import EText from './EText.js';
import EButton from './EButton.js';

class Escrow extends Component {
  static navigationOptions = {
    drawerLabel: 'Escrow',
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  completeEscrow() {
    AsyncStorage.getItem('@Exochain:password').then(password => {
      AsyncStorage.getItem('@Exochain:myCard').then(baseUrl => {
        let url = baseUrl + '/escrow'
        console.log(url);
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password,
          }),
        }).then(res => {
          this.setState(res);
        });
      });
    });
  }
  render() {
    return <ScrollView contentContainerStyle={styles.padded}>
      <EText>Escrow allows you to:</EText>
      <EText>Recover your password if lost</EText>
      <EText>Make shared contingency plans</EText>
      <EText>Please someone other than me write this copy</EText>
      <EText>More</EText>
      <Password>
        <EButton onPress={this.completeEscrow.bind(this)}>
          Escrow my card
        </EButton>
        <EText>{this.state.res}</EText>
      </Password>
    </ScrollView>;
  }
}

const styles = StyleSheet.create({
  padded: {
    padding: 12,
  },
});

module.exports = Escrow;

