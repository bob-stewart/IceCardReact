'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
} from 'react-native';

import EText from './EText.js';
import EInput from './EInput.js';

class Contact extends Component {
  render() {
    let props = this.props;
    let contact = props.contact;
    // Catch undefined fields as undefined rather than error
    if (!contact) {
      contact = {};
    }
    let first;
    const Field = props.input ? EInput : EText;
    if (props.name == 'you' && !props.input) {
      first = <>
        <Field style={styles.heading}>
          {contact.name}'s contact info
        </Field>
      </>;
    }
    else {
      first = <>
        <EText style={styles.heading}>
          {props.name}
        </EText>
        <Field placeholder="Name">
          {contact.name}
        </Field>
      </>
    }
    return (
      <>
        {first}
        <Field placeholder="Email">
          {contact.email}
        </Field>
        <Field placeholder="Phone">
          {contact.phone}
        </Field>
        <Field placeholder="Address">
          {contact.address}
        </Field>
      </>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    color: '#111',
    fontSize: 30,
    paddingTop: 20,
  },
});

module.exports = Contact;

