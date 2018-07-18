'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import EText from './EText.js';

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

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

module.exports = EButton;

