const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Vendor= mongoose.model("Vendor");
const Cart= mongoose.model("Cart");

exports.usercart= async (req,res) => {
   
    const {cart} = req.body;
    console.log("Request from user cart",req.body);

    let vendors= [];

    const user= await User.findOne({email: req.user.email}).exec();

    //check if the cart already exists for this user

    let existingCart= await Cart.findOne({orderedBy: user._id}).exec();

    if(existingCart) {
        existingCart.remove();
        console.log("Existing cart removed");
    }

    for ( let i=0; i< cart.length; i++) {
        let object= {};
        object.vendor= cart[i]._id;
        object.count= cart[i].count;

        let {price}= await Vendor.findById(cart[i]._id).select("price").exec();
        object.price= price;

        vendors.push(object);
    }

    console.log("Vendors", vendors);
    let cartTotal= 0;

    for ( let i=0; i <vendors.length; i++) {

        cartTotal= cartTotal + vendors[i].price * vendors[i].count;
    }

    console.log("cartTotal", cartTotal);

    let newCart= await new Cart({
        vendors,
        cartTotal,
        orderedBy:user._id
    }).save();

    console.log(newCart);
    res.json({ok: true})
}

exports.getusercart= async (req,res) => 
{
   try {
    const user = await User.findOne({email: req.user.email}).exec();
    const cartval= await Cart.findOne({orderedBy: user._id})
                             .populate("vendors.vendor")
                             .exec();
    res.json(cartval) ;                 
   }
   catch (err) {
       console.log(err);
   }
}



