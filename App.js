'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

import {
  createMaterialTopTabNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import ScanScreen from './app/ScanScreen.js';
import MyCardScreen from './app/MyCardScreen.js';
import Escrow from './app/Escrow.js';

const Home = createMaterialTopTabNavigator({
  Scan: { screen: ScanScreen },
  'My Card': { screen: MyCardScreen },
});

const App = createDrawerNavigator({
  Home: { screen: Home },
  Escrow: { screen: Escrow },
});

AppRegistry.registerComponent('default', () => App);

module.exports = App;

