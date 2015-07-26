/*
 * StringerBell
 * Copyright (c) Alessandro Molari (@alem0lars).
 *
 * This source code is licensed under the Apache Version 2.0 license found in
 * the LICENSE.txt file in the root directory of this source tree.
 */


// {{{ Imports.

import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import EventEmitter from 'eventemitter3';
import { canUseDOM } from '../../node_modules/react/lib/ExecutionEnvironment';

// }}}


let EE;
let viewport = {width: 1366, height: 768}; // Default size for server-side rendering
const RESIZE_EVENT = 'resize';


function handleWindowResize() {
  if (viewport.width !== window.innerWidth || viewport.height !== window.innerHeight) {
    viewport = {width: window.innerWidth, height: window.innerHeight};
    EE.emit(RESIZE_EVENT, viewport);
  }
}

function withViewport(ComposedComponent) {
  return class WithViewport extends Component {

    constructor() {
      super();

      this.state = {
        viewport: canUseDOM ? {width: window.innerWidth, height: window.innerHeight} : viewport
      };
    }

    componentDidMount() {
      if (!EE) {
        EE = new EventEmitter();
        window.addEventListener('resize', handleWindowResize);
        window.addEventListener('orientationchange', handleWindowResize);
      }
      EE.on('resize', this.handleResize, this);
    }

    componentWillUnmount() {
      EE.removeListener(RESIZE_EVENT, this.handleResize, this);
      if (!EE.listeners(RESIZE_EVENT, true)) {
        window.removeEventListener('resize', handleWindowResize);
        window.removeEventListener('orientationchange', handleWindowResize);
        EE = null;
      }
    }

    render() {
      return <ComposedComponent {...this.props} viewport={this.state.viewport}/>;
    }

    handleResize(value) {
      this.setState({viewport: value});
    }

  };
}


export default withViewport;
