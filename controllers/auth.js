const express = require("express");
const mongoose = require("mongoose");

const User = mongoose.model("User");
const { check, validationResult} = require('express-validator');


exports.createUpdateUser= async (req,res) =>           
 { 
    {
        const errors= validationResult(req);
        if (!errors.isEmpty()) {
           return  res.status(400).json({ errors: errors.array()})
        }   
   const user= await User.findOneAndUpdate({email: req.user.email},
                                                  {name : req.user.email.split("@")[0], 
                                                   picture: req.user.picture},
                                                  {new: true});
    if (user) {
           console.log("User Updated IN CREATEUPDATE", user);
            res.json(user);
    } else {
        const newUser= await new User({ email: req.user.email,
                                        name: req.user.email.split("@")[0],
                                        picture: req.user.picture
                                        }).save();
               console.log("User added", newUser);                        
               res.json(newUser);           
             } 
   }          
  };

  exports.currentUser= async (req,res) => 
  {
    await User.findOne({email: req.user.email} ).exec( (err,user) => {
        if (err) throw new Error(err);
        res.json(user);
        console.log("user from current user",user);
    });
   };

   exports.adminUser= async (req,res) => 
  {
    await User.findOne({email: req.user.email} ).exec( (err,user) => {
        if (err) throw new Error(err);
        res.json(user);
        // console.log("user from admin user",user);
    });
   };




