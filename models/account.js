const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  email: {type: String, required: true},
	name: {type: String},
	age: {type: Number},
  notifications: [{
    type: Schema.Types.ObjectId,
    ref: 'notification'
  }]
}, {timestamps: true});

const Account = mongoose.model('account', accountSchema);

module.exports = Account;
