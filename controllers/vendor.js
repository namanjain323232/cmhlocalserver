const express = require("express");
const slugify = require("slugify");
const router = express.Router();
const mongoose = require("mongoose");
const {body, validationResult} = require('express-validator');

const Vendor = mongoose.model("Vendor");

    exports.createvendor=  async  (req,res) => {        
     try {
        console.log("In the request body server:", req.body);
        req.body.slug = slugify(req.body.postcode);
        const newVendor = await new Vendor(req.body).save();
        res.json(newvendor);
     }
     catch (err) {
        console.log(err);
        res.status(400).send("Vendor creation failed");
     }
    }      
  

 