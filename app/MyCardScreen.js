'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  AsyncStorage,
  Linking,
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
      this.setUrl(endpoint + '/' + json.id);
    });
  }
  setUrl(url, doState=true) {
    if (doState) {
      this.setState({baseUrl: url});
    }
    AsyncStorage.setItem('@Exochain:myCard', url);
  }
  resetUrl() {
    this.props.navigation.setParams({
      newBaseUrl: null,
    });
    this.setState({
      makeCard: true,
      baseUrl: null,
    });
  }
  render() {
    let baseUrl = this.props.navigation.getParam('newBaseUrl',
      this.state.baseUrl);
    if (baseUrl) {
      this.setUrl(baseUrl, false); // Make sure the change is committed to memory
      return (
        <ScrollView contentContainerStyle={styles.padded}>
          <Card key={'mycard'} baseUrl={baseUrl} navigation={this.props.navigation} input />
          <EButton onPress={() => Linking.openURL(baseUrl + '/print')}>
            Print your card
          </EButton>
          <EButton onPress={this.resetUrl.bind(this)}>
            No, make a new card
          </EButton>
        </ScrollView>
      );
    }
    else {
      if (this.state.makeCard) {
        this.makeCard();
        return <Text>Creating a card for you...</Text>;
      }
      else {
        AsyncStorage.getItem('@Exochain:myCard').then((baseUrl) => {
          if (baseUrl) {
            this.setState({baseUrl}); // Trigger re-render
          }
          else {
            console.log('make teh card');
            this.setState({
              makeCard: true,
            });
          }
        }, (err) => {
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

