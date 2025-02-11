const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
  name: String,
  mobilePhone: String,
  pan: String,
  creditScore: Number,
  totalAccounts: Number,
  activeAccounts: Number,
  closedAccounts: Number,
  currentBalance: Number,
  securedAmount: Number,
  unsecuredAmount: Number,
  last7DaysEnquiries: Number,
  creditCards: [{
    bank: String,
    address: String,
    accountNumber: String,
    amountOverdue: Number,
    currentBalance: Number
  }]
});

module.exports = mongoose.model('Credit', creditSchema);