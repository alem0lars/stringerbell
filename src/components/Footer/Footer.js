/*
 * StringerBell
 * Copyright (c) Alessandro Molari (@alem0lars).
 *
 * This source code is licensed under the Apache Version 2.0 license found in
 * the LICENSE.txt file in the root directory of this source tree.
 */


// {{{ Imports.

import React from 'react';
import Link from '../../utils/Link';

// }}}


class Footer {

  render() {
    return (
      <div className="Footer">
        <div className="Footer-container">
          <span className="Footer-text">
            © <a href="https://github.com/alem0lars">Alessandro Molari</a>
          </span>
          <span className="Footer-spacer">·</span>
          <a className="Footer-link" href="/" onClick={Link.handleClick}>
            Home
          </a>
        </div>
      </div>
    );
  }

}


export default Footer;
