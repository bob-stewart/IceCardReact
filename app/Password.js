'use strict';

import React, { Component } from 'react';

import {
  TextInput,
  AsyncStorage,
} from 'react-native';

class Escrow extends Component {
  setPassword(e) {
    let password = e.nativeEvent.text;
    AsyncStorage.setItem('@Exochain:password', password);
    this.props.navigation.setParams({password});
    this.setState({}); // Trigger re-render
  }
  render() {
    let password = this.props.navigation.getParam('password');
    console.log(password);
    if (password && this.props.children) {
      return this.props.children;
    }
    return <TextInput onSubmitEditing={this.setPassword.bind(this)} placeholder="Password">
      {password}
    </TextInput>;
  }
}

module.exports = Escrow;

