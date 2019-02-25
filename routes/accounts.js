const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();

const AccountsController = require('../api/accounts');

router.route('/')
  .get(AccountsController.index)
  .post(AccountsController.newAccount)

router.route('/:accountId')
  .get(AccountsController.getAccount)
  .put(AccountsController.replaceAccount)
  .patch(AccountsController.updateAccount)

router.route('/:accountId/notifications')
  .get(AccountsController.getAccountNotifications)
  .post(AccountsController.newAccountNotification)

router.route('/:accountId/notifications/:notificationId')
  .delete(AccountsController.deleteAccountNotification)


module.exports = router;
