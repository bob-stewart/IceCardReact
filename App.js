'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

import {
  createMaterialTopTabNavigator,
} from 'react-navigation';

import ScanScreen from './app/ScanScreen.js';
import MyCardScreen from './app/MyCardScreen.js';

const App = createMaterialTopTabNavigator({
  Scan: { screen: ScanScreen },
  "My Card": { screen: MyCardScreen },
});

AppRegistry.registerComponent('default', () => App);

module.exports = App;

