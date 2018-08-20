'use strict';

import React, { Component } from 'react';

import {
  TextInput,
  AsyncStorage,
} from 'react-native';

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  setPassword(e) {
    let password = e.nativeEvent.text;
    AsyncStorage.setItem('@Exochain:password', password);
    this.setState({}); // Trigger re-render? TODO check
  }
  render() {
    let password = this.state.password;
    if (!password) {
      AsyncStorage.getItem('@Exochain:password').then(password => this.setState({password}));
    }
    console.log(password);
    if (password && this.props.children) {
      return this.props.children;
    }
    return <TextInput onSubmitEditing={this.setPassword.bind(this)} placeholder="Password">
      {password}
    </TextInput>;
  }
}

module.exports = Password;

