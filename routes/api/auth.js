const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = mongoose.model("User");
const { authCheck } = require("../../middlewares/auth");
const { check, validationResult} = require('express-validator');

// console.log("IN the auth ROUTE", authCheck);

router.post( '/createupdateuser', authCheck , async (req,res) =>           
 { 
    {
        const errors= validationResult(req);
        if (!errors.isEmpty()) {
           return  res.status(400).json({ errors: errors.array()})
        }   
    console.log("user body from auth route XXX", req.user);
    const user= await User.findOneAndUpdate({email: req.user.email},
                                                  {name :req.user.name, 
                                                   picture: req.user.picture},
                                                  {new: true});
    if (user) {
           console.log("User Updated", user);
            res.json(user);
    } else {
        const newUser= await new User({ email: req.user.email,
                                        name: req.user.name,
                                        picture: req.user.picture
                                        }).save();
               console.log("User added", newUser);                        
               res.json(newUser);           
             } 
   }          
  });


module.exports = router;

