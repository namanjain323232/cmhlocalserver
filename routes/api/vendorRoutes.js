const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {body, validationResult} = require('express-validator');

const Vendor = mongoose.model("Vendor");
const VendorCategories = mongoose.model("VendorCategories");


    router.post("/", async (req,res) => {
        console.log("In the request body server:", req.body);
        const { firstname,
            lastname,
            email,
            postcode,
            houseno,
            addressline1,
            addressline2,
            city,
            county,
            country} = req.body;

            const vendor = new Vendor ({
               firstname,
               lastname,
               email,
               postcode,
               houseno,
               addressline1,
               addressline2,
               city,
               county,
               country
            });

            try {
                await vendor.save();
                
                //The front end expects a response from the backend so
                //we must have to send the response like below

                res.send({ success:true , message:"Vendor Successfully Saved!" });

            } catch (err) {
                res.send(err);
            }

            
    } );

    router.post("/", async (req,res) => {

        const {_vendor,
               _subcategory,
              areasCovered,
              pricetype,
              price,
              website} = req.body;

        const vendorCategories = new VendorCategories ({
           _vendor ,
           _subcategory,
           areasCovered,
           pricetype,
           price,
           website 
        });

        try {
            await vendorCategories.save();
            res.send({ success:true , message:"Vendor category Successfully Saved!" });
        } catch (err) {
            res.send(err);
        }       

    });
   
    module.exports = router;

 