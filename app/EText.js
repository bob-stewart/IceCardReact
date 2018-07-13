import React, { Component } from 'react';

import {
  Text,
  StyleSheet,
} from 'react-native';

class EText extends Component {
  render() {
    return (
      <Text style={styles.text} {...this.props}>
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 1,
    color: '#555',
  },
});

module.exports = EText

