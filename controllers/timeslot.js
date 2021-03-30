const express = require("express");
const slugify = require("slugify");
const mongoose = require("mongoose");
const Timeslot = mongoose.model("Timeslot");


const { check, validationResult} = require('express-validator');

// add new category if it does not already exist
exports.createslot= async (req,res) => 
   {
     console.log("Timeslot from frontend",req.body);
     try {         
      let slot = await Timeslot.findOne({startSlot:req.body.startSlot});
      if (slot) {
        return res.status(400).json({ errors:[ {msg: 'Timeslot already exists !!!'}] })
       }  
        timeslot =  new Timeslot ({startSlot:req.body.startslot,
                                  endSlot:req.body.endslot
                                  });            
        await timeslot.save();
        res.status(200).json(timeslot);
                    
      } catch (err) {
        console.error(err);
        res.status(500).send("Failed to save timeslot !!!!");
      }
   };

  exports.listslots= async (req,res) => {
   try {
    timeslots= await Timeslot.find({}).exec();
    if (!timeslots) {
      return res.status(400).send("No timeslots were found !!!!");
    }
    res.json(timeslots);
  }
   catch (err) {
   console.error(err);
   res.status(500).send("Failed to find timeslots !!!!");
 }
  }

  exports.readslot= async (req,res) => {
    try {
      timeslot= await Timeslot.findOne({_id:req.params._id}).exec();
      if (!timeslot) {
        return res.status(400).send("Timeslot not found !!!!");
      }
      res.json(timeslot);
    }
    catch (err) {
      console.error(err);
      res.status(500).send("Failed to find timeslot !!!!",err);
  }
}

exports.editslot= async (req,res) => {
  try {
    console.log("REQ from Edit",req.body)
    const timeslot= await Timeslot.findOneAndUpdate({_id:req.params._id},
                              {startSlot:req.body.startSlot,
                              endSlot:req.body.endSlot }).exec();
    if (!timeslot) {
      return res.status(400).send("Failed to update timeslot");
    }
    res.status(200).json(timeslot);

  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to edit timeslot",err);
  }
}

  exports.removeslot= async (req,res) => {
    try {
      const slot = await Timeslot.findOneAndDelete( {_id: req.params._id});
      res.status(200).send("Timeslot deleted successfully!!!!");          
     }
     catch (err) {
       return res.status(400).send("Timeslot delete failed !!!!");
     }
  }