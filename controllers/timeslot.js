const express = require("express");
const slugify = require("slugify");
const mongoose = require("mongoose");
const Timeslot = mongoose.model("Timeslot");


const { check, validationResult} = require('express-validator');

// add new category if it does not already exist
exports.createslot= async (req,res) => 
   {
     console.log("Timeslot from frontend",req.body.values.timeslots);
     try {         
      let slot = await Timeslot.findOne({startSlot:req.body.startSlot});
      if (slot) {
        return res.status(400).json({ errors:[ {msg: 'Timeslot already exists !!!'}] })
       }  
        timeslot =  new Timeslot ({startSlot:req.body.values.timeslots.startslot,
                                  endSlot:req.body.values.timeslots.endslot
                                  });            
        await timeslot.save();
        res.status(200).json(timeslot);
                    
      } catch (err) {
        console.error(err);
        res.status(500).send("Failed to save timeslot !!!!");
      }
   };