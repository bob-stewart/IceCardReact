'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  TextInput,
  Text,
} from 'react-native';

import ContactList from './ContactList.js';
import Password from './Password.js';
import EButton from './EButton.js';

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
      let password = this.props.password;
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
        }),
      }).then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({private: json})
      });
    }
  }

  secureCard() {
    let url = this.props.baseUrl + '/make-secure'
    let password = this.props.password;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
      }),
    });
    // Set secure to something so that we will properly load private
    this.setState({
      card: {
        ...this.state.card,
        secure: true,
      },
    });
  }

  showPrivate() {
    this.setState({
      isPrivate: !this.state.isPrivate,
    });
  }

  save(group, field, value) {
    // This is absolutely ridiculous. Figure out a better way
    this.setState((state) => {
      let cardOrPrivate = state.isPrivate ? 'private': 'card';
      let groupExpands = state[cardOrPrivate].contacts ? state[cardOrPrivate].contacts[group] : {};
      return {
        [cardOrPrivate]: {
          ...state[cardOrPrivate],
          contacts: {
            ...state[cardOrPrivate].contacts,
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
    }
    let timeout = setTimeout(this.update.bind(this), noType);
    this.setState({timeout});
  }
  update() {
    let data = this.asForm();
    console.log(data);
    let url = this.props.baseUrl;
    if (this.state.isPrivate) {
      url += '/update-private';
    }
    else {
      url += '/update.json';
    }
    console.log(url);
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
    let current = this.state.isPrivate ? this.state.private : this.state.card;
    let form = this.collapse(current.contacts);
    let password = this.props.password;
    if (this.state.isPrivate) {
      form.password = password;
    }
    return form;
  }
  render() {
    let privateButtonText = 'Show my private info';
    if (this.state.isPrivate) {
      privateButtonText = 'Show public info';
    }
    let privateButton;
    if (this.props.input) {
      privateButton = <EButton onPress={this.showPrivate.bind(this)}>
        {privateButtonText}
      </EButton>;
    }
    if (this.state.isPrivate) {
      if (this.state.card.secure) {
        let password = this.props.password;
        if (!password) {
          return <>
            <Password navigation={this.props.navigation} />
            {privateButton}
          </>;
        }
        else {
          // Pass through
          // Render normally
        }
      }
      else {
        return (
          <>
            <Text>Secure this card!</Text>
            <Password navigation={this.props.navigation} />
            <TextInput onSubmitEditing={this.secureCard.bind(this)} placeholder='Confirm Password' />
            {privateButton}
          </>
        );
      }
    }
    let data = this.state.isPrivate ? this.state.private : this.state.card;
    if (data) {
      let contacts = data.contacts;
      return (
        <>
          <ContactList contacts={contacts} save={this.save.bind(this)} isPrivate={this.state.isPrivate} input={this.props.input} />
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

module.exports = Card

