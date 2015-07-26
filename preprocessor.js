/*
 * StringerBell
 * Copyright (c) Alessandro Molari (@alem0lars).
 *
 * This source code is licensed under the Apache Version 2.0 license found in
 * the LICENSE.txt file in the root directory of this source tree.
 */


'use strict';


// {{{ Requires.

var babel = require('babel-core');

// }}}


module.exports = {
  process: function(src, filename) {
    // Ignore files other than .js, .es, .jsx or .es6
    if (!babel.canCompile(filename)) {
      return '';
    }
    // Ignore all files within node_modules
    if (filename.indexOf('node_modules') === -1) {
      return babel.transform(src, {filename: filename}).code;
    }
    return src;
  }
};
