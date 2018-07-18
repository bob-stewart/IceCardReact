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
  save(group, field, value) {
    // This is absolutely ridiculous. Figure out a better way
    this.setState((state) => {
      let groupExpands = state.private.contacts ? state.private.contacts[group] : {};
      return {
        private: {
          ...state.private,
          contacts: {
            ...state.private.contacts,
            [group]: {
              ...groupExpands,
              [field]: value,
            },
          },
        },
      }
    });
    // Don't just immediately update, that'd overload the server unnecessarily
    // Start a timer, and if it runs out without a change, then update
    let noType = 500;
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
      console.log('clear', this.state.timeout);
    }
    let timeout = setTimeout(this.update.bind(this), noType);
    console.log('make', timeout);
    this.setState({timeout});
  }
  update() {
    let data = this.asForm();
    console.log(data);
    let url = this.props.baseUrl + '/update-private';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
  // Make:
  // {
  //   'a' : {
  //     'b' : 'c'
  //   }
  // }
  // into {'a-b': 'c'}
  // NOT recursive, only works on two layers
  collapse(what) {
    let obj = {};
    for (let key1 in what) {
      let next = what[key1];
      for (let key2 in next) {
        let val = next[key2];
        obj[key1 + '-' + key2] = val;
      }
    }
    return obj;
  }
  asForm() {
    let form = this.collapse(this.state.private.contacts);
    form.password = this.state.password;
    return form;
  }
  render() {
    if (this.props.private) {
      if (this.state && this.state.password) {
        if (this.state.private) {
          let contacts = this.state.private.contacts;
          // This lets further down the tree be undefined without erroring
          if (!contacts) {
            contacts = {};
          }
          return (
            <>
              <Contact key='p' contact={contacts.physician} name='Physician'
                  save={this.save.bind(this, 'physician')} input />
              <Contact key='a' contact={contacts.attorney} name='Attorney'
                  save={this.save.bind(this, 'attorney')} input />
              <Contact key='c' contact={contacts.cpa} name='CPA'
                  save={this.save.bind(this, 'cpa')} input />
              <Contact key='e' contact={contacts.estate} name='Estate'
                  save={this.save.bind(this, 'estate')} input />
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
            <TextInput onSubmitEditing={this.setPassword.bind(this)} placeholder="Password" />
          </>
        );
      }
    }
    else {
      if (this.state && this.state.card) {
        let contacts = this.state.card.contacts;
        let props = this.props;
        return (
          <>
            <Contact contact={contacts.you} name='You' save={this.save.bind(this, 'you')} input={props.input} />
            <Contact contact={contacts.primary} name='Primary' save={this.save.bind(this, 'primary')} input={props.input} />
            <Contact contact={contacts.alternative} name='Alternative' save={this.save.bind(this, 'alternative')} input={props.input} />
            <Contact contact={contacts.contingency} name='Contingency' save={this.save.bind(this, 'contingency')} input={props.input} />
            <Contact contact={contacts.emergency} name='Emergency' save={this.save.bind(this, 'emergency')} input={props.input} />
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

