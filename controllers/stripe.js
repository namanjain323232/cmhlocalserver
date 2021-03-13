const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Vendor= mongoose.model("Vendor");
const Cart= mongoose.model("Cart");
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

//function to update the payment schedule
const updateDelayDays= async (accountid) => {
  
    const account= await stripe.accounts.update(accountid, {
                     settings: {
                         payouts: {
                             schedule: {
                                 delay_days: 10
                             }
                         }
                      }
                    });
        return account;
}

exports.getaccountstatus= async (req,res) => {
   console.log("REQ from call backend",req);
   const user= await User.findOne({email: req.user.email}).exec();
   const account= await stripe.accounts.retrieve(user.stripe_account_id);
   console.log("User account retrieve",account);

   const updatedAccount= await updateDelayDays(account.id);
   const updatedUser= await User.findByIdAndUpdate({_id:user._id}, {
                  stripe_seller:updatedAccount
   },
   {new: true}).exec();
   res.json(updatedUser);
}

exports.getaccountbalance= async (req,res) => {

    const user= await User.findOne({email: req.user.email}).exec();

    try {

        const balance= await stripe.balance.retrieve({
          stripeAccount: user.stripe_account_id
        });
        console.log("BALANCE===", balance);
        res.json(balance);

    } catch (err) {
        console.log(err);
    }

}

exports.payoutsettings= async (req,res) => {

    try {
        const user= await User.findOne({email: req.user.email}).exec();
        const loginLink= await stripe.accounts.createLoginLink( user.stripe_account_id,
            { redirect_url: process.env.STRIPE_SETTINGS_REDIRECT_URL}
            );
        console.log("LOGIN LINK FOR PAYOUT SETTINGS",loginLink);
        res.json(loginLink);
    } catch (err) {
        console.log("STRIPE PAYOUT SETTINGS ERROR",err);
    }
}

exports.createpaymentintent= async (req,res) => {
   
    const user= await User.findOne({email: req.user.email}).exec();

    const cart= await Cart.findOne({orderedBy: user._id}).exec();

    const paymentIntent= await stripe.paymentIntents.create({
        amount:cart.cartTotal * 100,
        currency: "gbp"
    });
    const cartTotal= cart.cartTotal;
    res.send({ clientSecret: paymentIntent.client_secret,
               cartTotal});
}