const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Stripe= require("stripe");
const keys = require("../config/keys");
const queryString= require("query-string");

const stripe= Stripe(keys.STRIPE_SECRET_KEY)

exports.createconnectaccount= async (req,res) => {

    const user= await User.findOne({email: req.user.email}).exec();
   
    //add a new stripe account id for the user if it does not already exist
    if (!user.stripe_account_id) {
      const account= await stripe.accounts.create({
         type: "express"
    });

    console.log("ACCOUNT",account);
    user.stripe_account_id= account.id;
    user.save();
   }
   
   //create a login link based on account id
   let accountLink= await stripe.accountLinks.create({
       account: user.stripe_account_id,
       refresh_url:process.env.STRIPE_REDIRECT_URL,
       return_url:process.env.STRIPE_REDIRECT_URL,
       type:"account_onboarding"
   });

   //pre-populate the email id
   accountLink= Object.assign(accountLink,{
       "stripe_user[email]": user.email || undefined
   });
   console.log("Account Link", accountLink);

   res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
}

exports.getaccountstatus= async (req,res) => {
   console.log("REQ from call backend",req);
   const user= await User.findOne({email: req.user.email}).exec();
   const account= await stripe.accounts.retrieve(user.stripe_account_id);
   console.log("User account retrieve",account);
   const updatedUser= await User.findByIdAndUpdate({_id:user._id}, {
                  stripe_seller:account
   },{new: true}).exec();
   res.json(updatedUser);
   

}