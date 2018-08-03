'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  AsyncStorage,
} from 'react-native';

import EInput from './EInput.js';
import EButton from './EButton.js';
import Card from './Card.js';

const endpoint = 'http://10.100.4.11:3000';

class MyCardScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  makeCard() {
    let url = endpoint + '/create.json';
    fetch(url, {
      method: 'POST'
    })
    .then((response) => response.json())
    .then((json) => {
      this.setState({
        id: json.id,
      });
      AsyncStorage.setItem('@Exochain:myCard', json.id);
    });
  }
  render() {
    if (this.state.id) {
      return (
        <ScrollView contentContainerStyle={styles.padded}>
          <Card key={'mycard'} baseUrl={endpoint + '/' + this.state.id} input />
        </ScrollView>
      );
    }
    else {
      if (this.state.makeCard) {
        this.makeCard();
        return <Text>Creating a card for you...</Text>;
      }
      else {
        AsyncStorage.getItem('@Exochain:myCard').then((id) => {
          if (id) {
            console.log(id);
            this.setState({
              id: id,
            });
          }
          else {
            this.setState({
              makeCard: true,
            });
          }
        }).catch((err) => {
          console.error(err);
        });
        return <Text>Loading...</Text>;
      }
    }
  }
}

const styles = StyleSheet.create({
  padded: {
    padding: 12,
  },
});

module.exports = MyCardScreen;

