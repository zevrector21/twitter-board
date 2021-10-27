const express = require('express');
const userCtrl = require('./user.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/user - Get list of user applications */
// .get(userCtrl.list)

  /** POST /api/user - Create new user application */
  .post(userCtrl.create);

router.route('/login')
  .post(userCtrl.login);

router.route('/list')
  .get(userCtrl.list);

router.route('/:userId')
  /** GET /api/user/:userId - Get application by id */
  .get(userCtrl.get)

  /** PUT /api/user/:userId - Update application */
  .put(userCtrl.update)

  /** DELETE /api/user/:userId - Delete application */
  .delete(userCtrl.remove);

/** Load application when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

module.exports = router;
