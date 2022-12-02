const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Vendor= mongoose.model("Vendor");
const Cart= mongoose.model("Cart");
const Order= mongoose.model("Order");
const Timeslot = mongoose.model("Timeslot");

exports.usercart= async (req,res) => {
   
    const {cart} = req.body;
    console.log("Request from user cart",req.body.cart[0].bookingSlots[0].tstimeslot);
    // console.log("Request from user cart",new Date(req.body.cart[0].bookingDate).setHours(23,59,59));
    // const year= splice(req.body.cart[0].bookingDate,1,4);
    // console.log("Request from user cart year",console.log(req.body.cart[0].bookingDate));
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
   
    let cartTotal= 0;
    for ( let i=0; i <vendors.length; i++) {
        cartTotal= cartTotal + vendors[i].price * vendors[i].count;
    }

    {console.log("Before insert",req.body.cart[0].bookingSlots[0])}
    let newCart= await new Cart({
        vendors,
        cartTotal,
        orderedBy:user._id,
        timeslots:  req.body.cart[0].bookingSlots[0].tstimeslot,                      
        bookingDate: new Date(req.body.cart[0].bookingDate)                    
    }).save();
     res.json({ok: true})
}

exports.getusercart= async (req,res) => 
{
   try {
    const user = await User.findOne({email: req.user.email}).exec();
    const cartval= await Cart.findOne({orderedBy: user._id})
                             .populate( {
                                path:"vendors.vendor",                             
                                 populate:[{path: "vendorInfoId"},
                                           {path: "subcategories"} 
                                        ]
                             }).exec(); 
  
                             console.log("Cartval from GETCART", cartval);
     res.json(cartval) ;                 
   }
   catch (err) {
       console.log(err);
   }
}

exports.emptycart= async (req,res) => {

    const user= await User.findOne({email: req.user.email}).exec();
    const cart= await Cart.findOneAndRemove({orderedBy: user._id}).exec();

    res.json({ok: true});
}

exports.saveaddress= async (req,res) => {

    const useraddress= await User.findOneAndUpdate({email: req.user.email}, 
                                                   {address: req.body.address}).exec();
    res.json({ok: true});
}


exports.orders= async (req,res) => {

    const user= await User.findOne({email: req.user.email}).exec();
    console.log("USER from orders get",user);
    const userOrders= await Order.find({orderedBy: user._id})
              .populate({ path: "vendors.vendor",
               populate:[{ path:"vendorInfoId"},
                        {path: "subcategories"} ]
              }                                        
              ).exec();


    console.log(userOrders);

    res.json(userOrders);
}



