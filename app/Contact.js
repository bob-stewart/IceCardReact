'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
} from 'react-native';

import EText from './EText.js';

class Contact extends Component {
  render() {
    let props = this.props;
    let contact = props.contact;
    let first;
    if (props.name == 'you') {
      first = <>
        <EText style={styles.heading}>
          {contact.name}'s contact info
        </EText>
      </>;
    }
    else {
      first = <>
        <EText style={styles.heading}>
          {props.name}
        </EText>
        <EText>
          {contact.name}
        </EText>
      </>
    }
    return (
      <>
        {first}
        <EText>
          {contact.email}
        </EText>
        <EText>
          {contact.phone}
        </EText>
        <EText>
          {contact.address}
        </EText>
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

