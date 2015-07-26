/*
 * StringerBell
 * Copyright (c) Alessandro Molari (@alem0lars).
 *
 * This source code is licensed under the Apache Version 2.0 license found in
 * the LICENSE.txt file in the root directory of this source tree.
 */


// {{{ Imports.

import 'babel/polyfill';
import WebFont from 'webfontloader';
import React from 'react';
import FastClick from 'fastclick';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App';
import Dispatcher from './core/Dispatcher';
import AppActions from './actions/AppActions';
import ActionTypes from './constants/ActionTypes';

// }}}


// Some components use react-tap-event-plugin to listen for touch events.
// This dependency is temporary and will go away once react v1.0 is released.
// Until then, be sure to inject this plugin at the start of your app.
injectTapEventPlugin();

let path = decodeURI(window.location.pathname);
let onSetMeta = (name, content) => {
  // Remove and create a new <meta /> tag in order to make it work
  // with bookmarks in Safari
  let elements = document.getElementsByTagName('meta');
  [].slice.call(elements).forEach((element) => {
    if (element.getAttribute('name') === name) {
      element.parentNode.removeChild(element);
    }
  });
  let meta = document.createElement('meta');
  meta.setAttribute('name', name);
  meta.setAttribute('content', content);
  document.getElementsByTagName('head')[0].appendChild(meta);
};

function run() {
  // Load fonts.
  WebFont.load({
    google: {
      families: ['Roboto:n1,i1,n3,i3,n4,i4,n5,i5,n7,i7,n9,i9']
    }
  });

  // Render the top-level React component.
  let props = {
    path: path,
    context: {
      onSetTitle: value => document.title = value,
      onSetMeta
    }
  };
  let element = React.createElement(App, props);
  React.render(element, document.getElementById('app'), () => {
    let css = document.getElementById('css');
    css.parentNode.removeChild(css);
  });

  // Update `Application.path` prop when `window.location` is changed.
  Dispatcher.register((action) => {
    if (action.type === ActionTypes.CHANGE_LOCATION) {
      element = React.cloneElement(element, {path: action.path});
      React.render(element, document.getElementById('app'));
    }
  });
}

// Run the application when both DOM is ready and page content is loaded.
Promise.all([
  new Promise((resolve) => {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', resolve);
    } else {
      window.attachEvent('onload', resolve);
    }
  }).then(() => FastClick.attach(document.body)),
  new Promise((resolve) => AppActions.loadPage(path, resolve))
]).then(run);
