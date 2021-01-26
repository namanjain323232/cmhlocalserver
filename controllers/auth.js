const mongoose = require("mongoose");

const User = mongoose.model("User");
const { check, validationResult} = require('express-validator');

exports.createOrUpdateUser= async (req,res) => 
{
    console.log("user body from Auth NNNN", req);

    const user= await User.findOneAndUpdate({email: req.body.email},
                                       {name :req.body.name, 
                                        picture: req.body.picture},
                                       {new: true});
   if (user) {
       res.json(user);
   } else {
    const newUser= await new User({ email: req.body.email,
                                     name: req.body.name,
                                    picture: req.body.picture
                                    }).save();
    res.json(newUser);
   }
};



