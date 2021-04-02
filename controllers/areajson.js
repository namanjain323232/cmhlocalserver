const express = require("express");
const slugify = require("slugify");
const mongoose = require("mongoose");
const Area = mongoose.model("Area");

const { check, validationResult} = require('express-validator');

// add new category if it does not already exist
exports.createAreas= async (req,res) => 
   {
     try {
        area =  new Area ({city,county,country});            
        await area.InsertMany([
            { city: "Ampthill",county:"Bedfordshire",country:"England"},
           
            
         ]);
        res.status(200).json(area);
                    
      } catch (err) {
        console.error(err);
        res.status(500).send("Failed to save Areas !!!!");
      }
   };