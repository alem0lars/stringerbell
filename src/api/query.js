/*
 * StringerBell
 * Copyright (c) Alessandro Molari (@alem0lars).
 *
 * This source code is licensed under the Apache Version 2.0 license found in
 * the LICENSE.txt file in the root directory of this source tree.
 */


// {{{ Imports.

import { Router } from 'express';

// }}}


const router = new Router();


router.get('/', async (req, res, next) => {
  try {
    res.status(404).send({error: `No API implemented yet.`});
  } catch (err) {
    next(err);
  }
});


export default router;
