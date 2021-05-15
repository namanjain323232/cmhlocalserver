const express = require("express");
const slugify = require("slugify");
const router = express.Router();
const mongoose = require("mongoose");
const {body, validationResult} = require('express-validator');

const VendorCal = mongoose.model("VendorCal");
const VendorInfo= mongoose.model("VendorInfo");
const Timeslots= mongoose.model("Timeslot");

exports.createvendorcal= async (req,res) => {
  // console.log("Values from vendor calendar", req.body, req.params);
  try {
     const info = await VendorInfo.findOne({userId:req.params.userid}).exec(); 
     const vendor = await Vendor.findOne({userId: req.params.userid}).exec();    
    
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
  const cal = await VendorCal.find({userId: req.params.userid
                             ,availability: {$elemMatch: {start: {$gte: startDate}}}
                            })
                      .populate("vendorInfoId")
                      .populate({path:"availability.timeslots"})
                      .sort("availability.start")
                      .sort("availability.timeslots")
                      .exec();
 
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
  const cal = await VendorCal.find({vendorId: req.params.vendorid
                            ,availability: {$elemMatch: {start: {$gte: startDate}}}
                            })
                      .populate("vendorInfoId")
                      .populate({path:"availability.timeslots"})
                      .sort("availability.start")
                      .sort("availability.timeslots")
                      .exec();
    
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
                      .sort("availability.timeslots")
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

 exports.currentvendorcal= async (req,res) => {
  console.log("PARAMS from current calendar",req.params.start,new Date(new Date(req.params.start).setHours(23,59,59)));
  try {   
    const cal= await VendorCal.findOne({userId: req.params.userid,
                                     availability: {$elemMatch: {start: {$gte: new Date(new Date(req.params.start).setHours(00,00,00)),
                                                                         $lt: new Date(new Date(req.params.start).setHours(23,59,59))}}}
                                      });
                                     
    res.json(cal);
   console.log("OUTPUT current calendar",cal);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error for vendor calendar update");
 }
}
 
 exports.updatevendorcal= async (req,res) => {
  try {
     console.log("Value from vendor calendar edit before ",req.body.availability[0].timeslots, req.params);
     const cal=  await VendorCal.findOneAndUpdate({userId:  req.params.userid, 
                                                 availability: {$elemMatch: {start: {$eq: req.params.start}}}},
                                                  {$push: {'availability.$.timeslots':  req.body.availability[0].timeslots }} ,
                                                  {new :true});

    console.log("Values from edit output after",cal);
    res.status(200).json(cal);
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Server error for vendor calendar update");
  }

 }

 exports.createbulkbooking= async (req,res) => {
  console.log("Bulk backend", req.body);
  try {
    const info = await VendorInfo.findOne({userId:req.params.userid}).exec(); 
    const vendor = await Vendor.findOne({userId: req.params.userid}).exec();    
    const timeslots= await Timeslots.find({});

    const vendorcal =  new VendorCal ({userId: req.params.userid,
                                       vendorId: vendor._id,
                                       vendorInfoId: info._id, 
                                       blockedDate: "Yes" ,                                     
                                       availability:  {
                                            start: req.body.start,
                                            timeslots: timeslots
                                       }
                                      });
   
    console.log("In bulk vendor booking",vendorcal);
    await vendorcal.save();
    res.json(vendorcal);

  }
  catch (err) {
    console.log(err);
    res.status(500).send("Server error for bulk vendor booking",err.message);
  }
 }

 exports.createbulkavail= async (req,res) => {
    console.log("Bulk avail backend", req.body);
  try {

    const info = await VendorInfo.findOne({userId:req.params.userid}).exec(); 
    const vendor = await Vendor.findOne({userId: req.params.userid}).exec();    
    const timeslots= await Timeslots.find({});

    const vendorcal= new VendorCal ({ userId: req.params.userid,
                                      vendorId: vendor._id,
                                      vendorInfoId: info._id,
                                      blockedDate: "No",
                                      availability: {
                                        start: req.body.start,
                                        timeslots: req.body.timeslots
                                      }
        });
      console.log("IN Bulk vendor availability",vendorcal);
      await vendorcal.save();
      res.json(vendorcal);
  }
  catch (err) {
     console.log(err);
     res.status(500).send("Server error for bulk vendor availability", err.message);
  }
 }