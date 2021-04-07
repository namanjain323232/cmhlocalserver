const express = require("express");
const slugify = require("slugify");
const router = express.Router();
const mongoose = require("mongoose");
const {body, validationResult} = require('express-validator');

const VendorCal = mongoose.model("VendorCal");

exports.createvendorcal= async (req,res) => {
  console.log("Values from vendor calendar", req.body);
  try {

     const vendorcal =  new VendorCal ({vendorInfoId: req.body.vendorInfoId,
                                        availability:  req.body.availability
                                      });   
     console.log("VENDORCAL", vendorcal);
     await vendorcal.save();
     res.json(vendorcal);
  }
  catch (err) {
      console.log(err);
      res.status(400).json({err:err.message});
  }
}

exports.listvendorcal= async (req,res) =>
{
try {
  cal =await VendorCal.find({_id: req.body._id});
  if (!cal) {
    return res.status(400).send("No Vendor Calendar details were found !!!!");
  }
   res.json(cal);
    } 
    catch (err) {
       console.log(err);
       res.status(500).send("Server errror for vendor calendar");
    }           
 };       
