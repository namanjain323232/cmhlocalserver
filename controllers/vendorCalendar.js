const express = require("express");
const slugify = require("slugify");
const router = express.Router();
const mongoose = require("mongoose");
const {body, validationResult} = require('express-validator');

const VendorCal = mongoose.model("VendorCal");
const VendorInfo= mongoose.model("VendorInfo");

exports.createvendorcal= async (req,res) => {
  console.log("Values from vendor calendar", req.body);
  try {
     const info = await VendorInfo.findOne({userId:req.params.id}).exec();     
     console.log("VENDOR INFO",info);

     const vendorcal =  new VendorCal ({userId: req.params.id,
                                        vendorInfoId: info._id,
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
  console.log("REQ", req.params)
try {
  cal =await VendorCal.find({userId: req.params.id})
                      .populate("vendorInfoId")
                      .populate({path:"availability.timeslots"})
                      .exec();
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
