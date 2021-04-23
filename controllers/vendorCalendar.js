const express = require("express");
const slugify = require("slugify");
const router = express.Router();
const mongoose = require("mongoose");
const {body, validationResult} = require('express-validator');

const VendorCal = mongoose.model("VendorCal");
const VendorInfo= mongoose.model("VendorInfo");

exports.createvendorcal= async (req,res) => {
  console.log("Values from vendor calendar", req.body, req.params);
  try {
     const info = await VendorInfo.findOne({userId:req.params.userid}).exec(); 
     const vendor = await Vendor.findOne({userId: req.params.userid}).exec();    
    
      console.log("Vendor VALUE",vendor);
     const vendorcal =  new VendorCal ({userId: req.params.userid,
                                        vendorId: vendor._id,
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
 try {

  const startDate= new Date(Date.now());
  console.log("DATE parameters", req.params);
   const cal = await VendorCal.find({userId: req.params.userid
                            ,availability: {$elemMatch: {start: {$gte: startDate}}}
                            })
                      .populate("vendorInfoId")
                      .populate({path:"availability.timeslots"})
                      .sort("availability.start")
                      .exec();

    console.log ("CAL VALUE", cal);
  if (!cal) {
    return res.status(400).send("No Vendor Calendar details were found !!!!");
  }
   res.json(cal);
    } 
    catch (err) {
       console.log(err);
       res.status(500).send("Server error for vendor calendar");
    }           
 };   
 
 exports.listvendorcalven= async (req,res) =>
{
 try {

  const startDate= new Date(Date.now());
  console.log("DATE parameters", req.params);
   const cal = await VendorCal.find({vendorId: req.params.vendorid
                            ,availability: {$elemMatch: {start: {$gte: startDate}}}
                            })
                      .populate("vendorInfoId")
                      .populate({path:"availability.timeslots"})
                      .sort("availability.start")
                      .exec();

    console.log ("CAL VALUE", cal);
  if (!cal) {
    return res.status(400).send("No Vendor Calendar details were found !!!!");
  }
   res.json(cal);
    } 
    catch (err) {
       console.log(err);
       res.status(500).send("Server error for vendor calendar");
    }           
 };    

 exports.listvendorcaldate= async (req,res) =>
{
 try {
   console.log("DATE parameters", req.params);
   const cal = await VendorCal.find({vendorId: req.params.vendorid
                            ,availability: {$elemMatch: {start: {$gte: req.params.start,
                                                                 $lte:req.params.end}}                                                      
                                            }                                                        
                            })
                      .populate("vendorInfoId")
                      .populate({path:"availability.timeslots"})
                      .sort("availability.start")
                      .exec();

    console.log ("CAL VALUE BY DATE RANGE", cal);
  if (!cal) {
    return res.status(400).send("No Vendor Calendar details were found !!!!");
  }
   res.json(cal);
    } 
    catch (err) {
       console.log(err);
       res.status(500).send("Server error for vendor calendar");
    }           
 };    

 exports.readvendorcal= async (req,res) =>
{
 try {
  cal =await VendorCal.findOne({_id: req.params.id})
                      .populate("vendorInfoId")
                      .populate({path:"availability.timeslots"})
                      .sort("availability.start")
                      .exec();
  console.log("CAL",cal);
  if (!cal) {
    return res.status(400).send("No Vendor Calendar details were found !!!!");
  }
   res.json(cal);
  } 
    catch (err) {
       console.log(err);
       res.status(500).send("Server error for vendor calendar find one record");
    }           
 };   
 
 exports.updatevendorcal= async (req,res) => {

  try {
     console.log( req.data);
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Server error for vendor calendar update");
  }

 }