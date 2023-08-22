const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const CustomerInfoSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
    required: false,
  },
  orders: {
    type: [OrderSchema],
    default: [],
  },
  customer_info: {
    type: [CustomerInfoSchema],
    default: [],
  },
});

const User = mongoose.model("User", UserSchema, "users_new");

module.exports = User;
