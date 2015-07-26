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


class DraftPage {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    let title = 'DraftPage';
    this.context.onSetTitle(title);
    return (
      <div className="DraftPage">
        <div className="DraftPage-container">
          <h1>{title}</h1>
          <p>...</p>
        </div>
      </div>
    );
  }

}


export default DraftPage;
