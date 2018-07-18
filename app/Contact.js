'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
} from 'react-native';

import EText from './EText.js';
import EInput from './EInput.js';


class EContactInput extends Component {
  wrapField(f, field) {
    return (value) => {
      return f(field, value);
    }
  }
  render() {
    let props = this.props;
    return <EInput key={props.field} onChangeText={this.wrapField(props.save, props.field)} {...props}>
      {props.children}
    </EInput>;
  }
}

class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  render() {
    let props = this.props;
    let contact = props.contact;
    // Catch undefined fields as undefined rather than error
    if (!contact) {
      contact = {};
    }
    let first;
    const Field = props.input ? EContactInput : EText;
    if (props.name == 'you' && !props.input) {
      first = <>
        <Field key={props.name + '-name'} style={styles.heading}>
          {contact.name}'s contact info
        </Field>
      </>;
    }
    else {
      first = <>
        <EText key={props.name + '-heading'} style={styles.heading}>
          {props.name}
        </EText>
        <Field key={props.name + '-name'} placeholder="Name" field="name" save={props.save}>
          {contact.name}
        </Field>
      </>
    }
    return (
      <>
        {first}
        <Field key={props.name + '-email'} placeholder="Email" field="email" save={props.save}>
          {contact.email}
        </Field>
        <Field key={props.name + '-phone'} placeholder="Phone" field="phone" save={props.save}>
          {contact.phone}
        </Field>
        <Field key={props.name + '-address'} placeholder="Address" field="address" save={props.save}>
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

