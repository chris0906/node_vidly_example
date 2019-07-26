const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, require: true, maxlength: 20, minlength: 3 },
  phone: String,
  isGold: Boolean
});

const Customer = mongoose.model("Customer", customerSchema);

exports.Customer = Customer;
