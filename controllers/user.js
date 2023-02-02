const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Vendor = mongoose.model("Vendor");
const Cart = mongoose.model("Cart");
const Contact = require("./../models/Contact");
const Order = mongoose.model("Order");
const Timeslot = mongoose.model("Timeslot");

exports.usercart = async (req, res) => {
  const { cart } = req.body;

  let vendors = [];

  const user = await User.findOne({ email: req.user.email }).exec();
  //check if the cart already exists for this user

  let existingCart = await Cart.findOne({ orderedBy: user._id }).exec();

  if (existingCart) {
    existingCart.remove();
    console.log("Existing cart removed");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.vendor = cart[i]._id;
    object.count = cart[i].count;
    let { price } = await Vendor.findById(cart[i]._id).select("price").exec();
    object.price = price;
    vendors.push(object);
  }

  let cartTotal = 0;
  for (let i = 0; i < vendors.length; i++) {
    cartTotal = cartTotal + vendors[i].price * vendors[i].count;
  }

  {
    console.log("Before insert", req.body.cart[0].bookingSlots);
  }
  req.body.cart[0].bookingSlots.map((b) => {
    console.log(b);
  });
  let timeslotsArr = [];

  req.body.cart[0].bookingSlots.map((b) => {
    timeslotsArr.push({
      start: b.tstimeslot[0].startSlot,
      end: b.tstimeslot[0].endSlot,
    });
  });
  console.log(timeslotsArr, "sjdbsjdbsfjsndjabfkjs");
  let newCart = await new Cart({
    vendors,
    cartTotal,
    orderedBy: user._id,
    timeslotsSE: timeslotsArr,
    bookingDate: new Date(req.body.cart[0].bookingDate),
  }).save();
  res.json({ ok: true });
};

exports.getusercart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();
    const cartval = await Cart.findOne({ orderedBy: user._id })
      .populate({
        path: "vendors.vendor",
        populate: [{ path: "vendorInfoId" }, { path: "subcategories" }],
      })
      .exec();

    console.log("Cartval from GETCART jhdjshdsjdhksdk", cartval);
    res.json(cartval);
  } catch (err) {
    console.log(err);
  }
};

exports.emptycart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

  res.json({ ok: true });
};

exports.saveaddress = async (req, res) => {
  const useraddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();
  res.json({ ok: true });
};

exports.orders = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  console.log("USER from orders get", user);
  const userOrders = await Order.find({ orderedBy: user._id })
    .populate({
      path: "vendors.vendor",
      populate: [{ path: "vendorInfoId" }, { path: "subcategories" }],
    })
    .exec();

  console.log(userOrders);

  res.json(userOrders);
};

exports.contact = async (req, res) => {
  let newContact = await Contact.create(req.body);
  res.json(newContact);
};

exports.getquerieslist = async (req, res) => {
  let querieslist = await Contact.find({ unread: true });
  res.json(querieslist);
};

exports.markasread = async (req, res) => {
  let query = await Contact.findByIdAndUpdate(req.params.id, { unread: false });
  let querieslist = await Contact.find({ unread: true });
  res.json(querieslist);
};
