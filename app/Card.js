'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  TextInput,
  Text,
} from 'react-native';

import Contact from './Contact.js';
import EButton from './EButton.js';

// const endpoint = 'http://10.100.4.11:3000';

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  load() {
    if (!this.state.isPrivate) {
      // Load the public data
      let url = this.props.baseUrl + '.json';
      console.log(url);
      fetch(url).then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({card: json})
      });
    }
    else {
      // Load the private data with given password
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
  }

  showPrivate() {
    this.setState({
      isPrivate: !this.state.isPrivate,
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
    if (this.state.isPrivate && !this.state.password) {
      return (
        <>
          <TextInput onSubmitEditing={this.setPassword.bind(this)} placeholder="Password" />
        </>
      );
    }
    else {
      let data = this.state.isPrivate ? this.state.private : this.state.card;
      if (data) {
        let contacts = data.contacts;
        // This lets further down the tree be undefined without erroring
        if (!contacts) {
          contacts = {};
        }
        let privateButtonText = 'Show my private info';
        if (this.state.isPrivate) {
          privateButtonText = 'Show public info';
        }
        let names;
        if (this.state.isPrivate) {
           names = [
            'physician',
            'attorney',
            'cpa',
            'estate',
          ];
        }
        else {
          names = [
            'you',
            'primary',
            'alternative',
            'contingency',
            'emergency',
          ];
        }
        let contactComponents = [];
        for (let name of names) {
          let humanName = name.charAt(0).toUpperCase() + name.slice(1);
          contactComponents.push(
            <Contact key={name} contact={contacts[name]} name={humanName}
              save={this.save.bind(this, name)} input={this.props.input} />
          );
        }
        let privateButton;
        if (this.props.input) {
          privateButton = <EButton onPress={this.showPrivate.bind(this)}>
            {privateButtonText}
          </EButton>;
        }
        return (
          <>
            {contactComponents}
            {privateButton}
          </>
        );
      }
      else {
        this.load();
        return <Text>Loading...</Text>;
      }
    }
  }
}

module.exports = Card

