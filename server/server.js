const mongoose = require("mongoose");
const cors = require("cors");
const Medicamente = require("./model/Medicamente.js");
const express = require("express");
const User = require("./model/User");
const parser = require("body-parser");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
// app.use(express.json());
app.use(cors());
app.use(parser.json());

app.get("/api/medicament/", async (req, res) => {
  const medicaments = await Medicamente.find();
  return res.json(medicaments);
});

app.post("/api/cart_items", async (req, res) => {
  const { uid, cart } = req.body;
  const filter = { _id: uid, cart: { $ne: cart } };
  update = { $push: { cart: cart } };
  try {
    const new_data = new User({
      _id: uid,
      cart: cart,
    });
    const data = await User.findOneAndUpdate(filter, update, {
      upsert: true,
      new: true,
    });
    res.json(new_data).status(200);
  } catch (error) {
    if (error.codeName == "DuplicateKey") {
      console.log("Item already in the list");
    }
  }
});

app.patch("/api/cart_items/update_item", async (req, res) => {
  const { uid, cart } = req.body;
  filter = { _id: uid, "cart._id": cart._id };
  try {
    cant_filter = { _id: uid, cart: { $elemMatch: { _id: cart._id } } };
    quantity = await User.findOne(cant_filter);
    old_cant = quantity.cart[0].cantitate;
    update = { $set: { "cart.$.cantitate": old_cant + cart.cantitate } };
    const data = await User.findOneAndUpdate(filter, update);
    res.json(data).status(200);
  } catch (error) {
    console.log(error);
  }
});

app.patch("/api/cart_items/", async (req, res) => {
  const { uid, cart } = req.body;
  filter = { _id: uid, "cart._id": cart._id };
  update = { $set: { "cart.$.cantitate": cart.cantitate } };
  try {
    const data = await User.findOneAndUpdate(filter, update);
    res.json(data).status(200);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/cart_items/:uid", async (req, res) => {
  try {
    filter = { _id: req.params.uid };
    console.log(filter);
    const data = await User.findOne(filter);
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/cart_items/", async (req, res) => {
  try {
    filter = { _id: req.body.uid };
    deleted_item = { $pull: { cart: req.body.cart } };
    const data = await User.updateOne(filter, deleted_item, {
      multi: true,
    });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/empty_cart/:uid", async (req, res) => {
  try {
    filter = { _id: req.params.uid };
    deleted_item = { $set: { cart: [] } };
    const data = await User.updateOne(filter, deleted_item, {
      multi: true,
    });
    console.log("Cart emptied");
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/payment", async (req, res) => {
  const { customerInfo, id, amount, userId } = req.body;
  const new_amount = amount * 100;

  try {
    const payment = await stripe.paymentIntents.create({
      amount: new_amount,
      currency: "RON",
      description: "EC-Pharmacy payment",
      payment_method: id,
      confirm: true,
    });

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const order = { paymentId: payment.id, amount: amount };
    user.orders.push(order);
    user.customer_info.push(customerInfo);

    await user.save();

    res.json({
      message: "Payment successful and order saved",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB!");
    app.listen(3001, () => console.log("Server started on port 3001"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
