/*
 * StringerBell
 * Copyright (c) Alessandro Molari (@alem0lars).
 *
 * This source code is licensed under the Apache Version 2.0 license found in
 * the LICENSE.txt file in the root directory of this source tree.
 */


// {{{ Imports.

import React, { PropTypes } from 'react';
import { AppCanvas } from 'material-ui';

import withContext from '../../decorators/withContext';

import AppActions from '../../actions/AppActions';

import Header from '../Header';
import Footer from '../Footer';

import AboutPage from '../AboutPage';
import DraftPage from '../DraftPage';
import LoginPage from '../LoginPage';
import NotFoundPage from '../NotFoundPage';
import WelcomePage from '../WelcomePage';

// }}}


@withContext
class App {

  static propTypes = {
    path: PropTypes.string.isRequired
  };

  componentDidMount() {
    window.addEventListener('popstate', this.handlePopState);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.path !== nextProps.path;
  }

  render() {
    let component;

    switch (this.props.path) {

      case '/':
      case '/welcome':
        component = <WelcomePage />;
        break;

      case '/about':
        component = <AboutPage />;
        break;

      case '/draft':
        component = <DraftPage />;
        break;

      case '/login':
        component = <LoginPage />;
        break;

      default:
        component = <NotFoundPage />;
        break;
    }

    return (
      <AppCanvas>
        <Header />
        {component}
        <Footer />
      </AppCanvas>
    );
  }

  handlePopState(event) {
    AppActions.navigateTo(window.location.pathname, {replace: !!event.state});
  }

}


export default App;
