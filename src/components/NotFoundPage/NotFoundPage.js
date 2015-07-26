/*
 * StringerBell
 * Copyright (c) Alessandro Molari (@alem0lars).
 *
 * This source code is licensed under the Apache Version 2.0 license found in
 * the LICENSE.txt file in the root directory of this source tree.
 */


// {{{ Imports.

import React, { PropTypes } from 'react';

// }}}


class NotFoundPage {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired
  };

  render() {
    let title = 'Page Not Found';
    this.context.onSetTitle(title);
    this.context.onPageNotFound();
    return (
      <div>
        <h1>{title}</h1>
        <p>Sorry, but the page you were trying to view does not exist.</p>
      </div>
    );
  }

}


export default NotFoundPage;
