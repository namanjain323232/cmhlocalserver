const express = require("express");
const slugify = require("slugify");
const router = express.Router();
const mongoose = require("mongoose");
const {body, validationResult} = require('express-validator');

const Vendor = mongoose.model("Vendor");

    exports.createvendor=  async  (req,res) => {        
     try {
        console.log("In the request body server:", req.body);
        req.body.slug = slugify(req.body.email);
        const newvendor = await new Vendor(req.body).save();
        res.json(newvendor);
     }
     catch (err) {
        console.log(err);
        res.status(400).json({err: err.message});
     }
    }
    
    exports.listvendors= async (req,res) => {
     try {
       const vendors = await Vendor.find({});
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
  

 