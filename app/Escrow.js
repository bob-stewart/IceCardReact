'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  ScrollView,
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
    let url = 'TODO';
    let password = 'TODO';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
      }),
    });
  }
  render() {
    return <ScrollView contentContainerStyle={styles.padded}>
      <EText>Escrow allows you to:</EText>
      <EText>Recover your password if lost</EText>
      <EText>Make shared contingency plans</EText>
      <EText>Please someone other than me write this copy</EText>
      <EText>More</EText>
      <Password navigation={this.props.navigation}>
        <EButton onPress={this.completeEscrow.bind(this)}>
          Escrow my card
        </EButton>
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

