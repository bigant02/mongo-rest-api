const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  name: {type: String},
  color: {type: String},
  account: {
    type: Schema.Types.ObjectId,
    ref: 'account'
  }
}, {timestamps: true});

const Notification = mongoose.model('notification', notificationSchema);
module.exports = Notification;
