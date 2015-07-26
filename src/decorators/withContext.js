/*
 * StringerBell
 * Copyright (c) Alessandro Molari (@alem0lars).
 *
 * This source code is licensed under the Apache Version 2.0 license found in
 * the LICENSE.txt file in the root directory of this source tree.
 */


// {{{ Imports.

import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import mui from 'material-ui';

import emptyFunction from '../../node_modules/react/lib/emptyFunction';

// }}}


let ThemeManager = new mui.Styles.ThemeManager();


function withContext(ComposedComponent) {
  return class WithContext {

    static propTypes = {
      context: PropTypes.shape({
        onInsertCss: PropTypes.func,
        onSetTitle: PropTypes.func,
        onSetMeta: PropTypes.func,
        onPageNotFound: PropTypes.func
      })
    };

    static childContextTypes = {
      muiTheme: PropTypes.object,
      onInsertCss: PropTypes.func.isRequired,
      onSetTitle: PropTypes.func.isRequired,
      onSetMeta: PropTypes.func.isRequired,
      onPageNotFound: PropTypes.func.isRequired
    };

    getChildContext() {
      let context = this.props.context;
      return {
        muiTheme: ThemeManager.getCurrentTheme(),
        onInsertCss: context.onInsertCss || emptyFunction,
        onSetTitle: context.onSetTitle || emptyFunction,
        onSetMeta: context.onSetMeta || emptyFunction,
        onPageNotFound: context.onPageNotFound || emptyFunction
      };
    }

    render() {
      let { context, ...other } = this.props; // eslint-disable-line no-unused-vars
      return <ComposedComponent {...other} />;
    }

  };
}


export default withContext;
