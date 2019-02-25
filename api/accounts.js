const Account = require('../models/account');
const Notification = require('../models/notification');

module.exports = {
  index: async (req, res, next) => {
      const accounts = await Account.find({});
      res.status(200).json(accounts);
  },

  newAccount: async (req, res, next) => {
    const newAccount = new Account(req.body);
    const find_account = await Account.findOne({"email": req.body.email});
    if(find_account) {
      res.status(500).json({"err": "email already exists"});
    } else {
      const account = await newAccount.save();
      res.status(201).json(account);
    }
  },

  getAccount: async (req, res, next) => {
    const { accountId } = req.params;
    console.log(JSON.stringify(accountId));
    const account = await Account.findById(accountId);
    res.status(200).json(account);
  },

  replaceAccount: async (req, res, next) => {
    // enforce req.body to contain all fields
    const { accountId } = req.params;
    const newAccount = req.body;

    // returns before account to update
    const result = await Account.findByIdAndUpdate(accountId, newAccount);
    res.status(200).json({success: true});
  },

  updateAccount: async (req, res, next) => {
    // req.body may contain any number of fields
    const { accountId } = req.params;
    const newAccount = req.body;

    // returns before account to update
    const result = await Account.findByIdAndUpdate(accountId, newAccount);
    res.status(200).json({success: true});
  },

  getAccountNotifications: async (req, res, next) => {
    const { accountId } = req.params;
    // replace the id with the object with populate
    const account = await Account.findById(accountId).populate('notifications');
    res.status(200).json(account.notifications);
  },

  newAccountNotification: async (req, res, next) => {
    const { accountId } = req.params;
    // create a new account notification
    const newNotification = new Notification(req.body);
    // Get a account
    const account = await Account.findById(accountId);
    // asign account as notification's seller
    newNotification.account = account;
    // save the notification
    await newNotification.save();
    // add notification to the account selle's selling array 'notifications'
    account.notifications.push(newNotification);
    // save the account
    await account.save()
    res.status(201).json(newNotification);
  },

  deleteAccountNotification: async (req, res, next) => {
    console.log(JSON.stringify(req.params))
    const { notificationId } = req.params;

    const notification = await Notification.findById(notificationId);

    notification.remove();

    res.status(204).json();
  }

};
