'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  TextInput,
} from 'react-native';

import Contact from './Contact.js';

class Card extends Component {
  render() {
    let contacts = this.props.card.contacts;
    if (this.props.private) {
      if (this.state && this.state.password) {
      }
      else {
        return (
          <>
            <TextInput onSubmit>
              Password
            </TextInput>
          </>
        );
      }
    }
    else {
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
  }
}

module.exports = Card

