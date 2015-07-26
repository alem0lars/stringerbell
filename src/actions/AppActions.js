/*
 * StringerBell
 * Copyright (c) Alessandro Molari (@alem0lars).
 *
 * This source code is licensed under the Apache Version 2.0 license found in
 * the LICENSE.txt file in the root directory of this source tree.
 */


// {{{ Imports.

import http from 'superagent';
import { canUseDOM } from 'react/lib/ExecutionEnvironment';

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

// }}}


export default {

  navigateTo(path, options) {
    this.loadPage(path, () => {
      if (canUseDOM) {
        if (options && options.replace) {
          window.history.replaceState({}, document.title, path);
        } else {
          window.history.pushState({}, document.title, path);
        }
      }

      Dispatcher.dispatch({
        type: ActionTypes.CHANGE_LOCATION,
        path
      });
    });
  },

  loadPage(path, cb) {
    Dispatcher.dispatch({
      type: ActionTypes.GET_PAGE,
      path
    });

    http.get(encodeURI(path))
      .accept('application/json')
      .end((err, res) => {
        Dispatcher.dispatch({
          type: ActionTypes.RECEIVE_PAGE,
          path,
          err,
          page: res ? res.body : null
        });
        if (cb) {
          cb();
        }
      });
  }

};
