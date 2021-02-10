const express = require("express");
const slugify = require("slugify");
const router = express.Router();
const mongoose = require("mongoose");
const {body, validationResult} = require('express-validator');

const VendorInfo = mongoose.model("VendorInfo");

    exports.createvendorinfo=  async  (req,res) => {        
     try {
        console.log("In the request body server:", req.body);
        req.body.slug = slugify(req.body.name);
        const newvendor = await new VendorInfo(req.body).save();
        res.json(newvendor);
     }
     catch (err) {
        console.log(err);
        res.status(400).json({err: err.message});
     }
    }
    
    exports.listvendorsinfo= async (req,res) => {
     try {
       const vendors = await VendorInfo.find({});
       if (!vendors) {
          return res.status(400).send("No vendors data was found !!!!");
       }
       res.json(vendors);
     }
     catch (err) {
        console.log(err);
        res.status(500).send("Server error while fetching vendors");
     }
    }
  