'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
} from 'react-native';

import EText from './EText.js';
import EInput from './EInput.js';

class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  EContactInput(props) {
    return <EInput onChangeText={this.save.bind(this, props.field)} {...props}>
      {props.children}
    </EInput>;
  }
  render() {
    let props = this.props;
    let contact = props.contact;
    // Catch undefined fields as undefined rather than error
    if (!contact) {
      contact = {};
    }
    let first;
    const Field = props.input ? this.EContactInput.bind(this) : EText;
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
        <Field placeholder="Email" field="email">
          {contact.email}
        </Field>
        <Field placeholder="Phone" field="phone">
          {contact.phone}
        </Field>
        <Field placeholder="Address" field="Address">
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

