'use strict';

import React, { Component } from 'react';

import Contact from './Contact.js';

class ContactList extends Component {
  render() {
    let contacts = this.props.contacts;
    // This lets further down the tree be undefined without erroring
    if (!contacts) {
      contacts = {};
    }
    let names;
    if (this.props.isPrivate) {
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
          save={(...args) => {this.props.save(name, ...args)}}
          input={this.props.input} />
      );
    }
    return (
      <>
        {contactComponents}
      </>
    );
  }
}

module.exports = ContactList;

