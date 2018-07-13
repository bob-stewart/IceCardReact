'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  TextInput,
  Text,
} from 'react-native';

import Contact from './Contact.js';

// const endpoint = 'http://10.100.4.11:3000';

class Card extends Component {
  load() {
    let url = this.props.baseUrl + '.json';
    fetch(url).then((response) => {
      return response.json();
    })
    .then((json) => {
      this.setState({card: json})
    });
  }
  loadPrivate() {
    let url = this.props.baseUrl + '/private.json';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: this.state.password,
      }),
    }).then((response) => {
      return response.json();
    })
    .then((json) => {
      this.setState({private: json})
    });
  }
  setPassword(e) {
    this.setState({
      password: e.nativeEvent.text,
    });
  }
  render() {
    if (this.props.private) {
      if (this.state && this.state.password) {
        if (this.state.private) {
          let contacts = this.state.private.contacts;
          return (
            <>
              <Contact contact={contacts.physician} name='Physician' />
            </>
          );
        }
        else {
          this.loadPrivate();
          return <Text>{this.state.password}</Text>;
        }
      }
      else {
        return (
          <>
            <TextInput onSubmitEditing={this.setPassword.bind(this)}>
              Password
            </TextInput>
          </>
        );
      }
    }
    else {
      if (this.state && this.state.card) {
        let contacts = this.state.card.contacts;
        return (
          <>
            <Contact contact={contacts.you} name='you' />
            <Contact contact={contacts.primary} name='Primary' />
            <Contact contact={contacts.alternative} name='Alternative' />
            <Contact contact={contacts.contingency} name='Contingency' />
            <Contact contact={contacts.emergency} name='Emergency' />
          </>
        );
      }
      else {
        this.load();
        return <Text>Loading</Text>;
      }
    }
  }
}

module.exports = Card

