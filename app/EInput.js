import React, { Component } from 'react';

import {
  TextInput,
  StyleSheet,
} from 'react-native';

class EInput extends Component {
  render() {
    return (
      <TextInput style={styles.input} {...this.props}>
        {this.props.children}
      </TextInput>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ddd',
    padding: 1,
    paddingLeft: 10,
    margin: 10,
  },
});

module.exports = EInput;

