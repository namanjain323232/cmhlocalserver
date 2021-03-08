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
       console.log("Vendors from backend",vendors);
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

    // get one vendor info record based on email
    exports.readvendorinfo= async (req,res) =>
     { 
     try {
      vendor = await VendorInfo.findOne({email: req.params.email});
      if (!vendor) {
        return res.status(400).send("Vendor Info could not be found !!!!");
      }
      res.json(vendor);
     }  catch (err) {
            console.log(err);
            res.status(500).json({message: "Server error at find a vendor info"});
     }        
     };  

     // get one vendor info record based on id
    exports.getvendorinfobyid= async (req,res) =>
    { 
      console.log("vendor info id",req.body);     
    try {
     vendor = await VendorInfo.findOne({_id:req.body.id});
     console.log("Vendor Info IDDDD",vendor);
     if (!vendor) {
       return res.status(400).send("Vendor Info could not be found !!!!");
     }
     res.json(vendor);
    }  catch (err) {
           console.log(err);
           res.status(500).json({message: "Server error at find a vendor info"});
    }        
    };  
     
     //update one vendor info record based on email
     exports.updatevendorinfo= async (req,res) =>      
     {         
       try {
          const {name, postcode, houseNo, addressLine1, 
                 addressLine2,city, county, country, website }  = req.body;

          const vendor=  await VendorInfo.findOneAndUpdate({email:  req.params.email},
                                                          { name :name,
                                                            postcode: postcode,
                                                            houseNo: houseNo,
                                                            addressLine1: addressLine1,
                                                            addressLine2:addressLine2,
                                                            city: city,
                                                            county: county,
                                                            country: country,
                                                            website: website,
                                                            slug: slugify(name)},
                                                          {new :true});
          res.status(200).json(vendor);
      } catch (err)   {
          console.log(err);
          return res.status(500).send("Failed to update vendor information !!!!");           
         }        
     };

     //delete one vendor info record based on email
     exports.removevendorinfo= async (req,res) =>     
     {
       try {
        const vendor = await VendorInfo.findOneAndRemove({ email: req.params.email}).exec();
        res.status(200).send("Vendor information deleted successfully!!!!");          
       }
       catch (err) {
         console.log(err);
         return res.status(400).send("Vendor information delete failed !!!!");
       }
     };
  