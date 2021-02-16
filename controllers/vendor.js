const express = require("express");
const slugify = require("slugify");
const router = express.Router();
const mongoose = require("mongoose");
const {body, validationResult} = require('express-validator');

const Vendor = mongoose.model("Vendor");

    exports.createvendor=  async  (req,res) => {        
     try {
       const {userId, vendorInfoId, description, category, subcategories,pricetype,price,images } = req.body;
        console.log("In the request body server:", req.body);
      //   req.body.slug = slugify(req.body.category);
        const newvendor = await new Vendor({userId,  
                                            vendorInfoId,                                          
                                            description,
                                            category,
                                            subcategories,
                                            pricetype,
                                            price, 
                                            images}).save();
        res.json(newvendor);
     }
     catch (err) {
        console.log(err);
        res.status(400).json({err: err.message});
     }
    }
    
    exports.listvendors= async (req,res) => {
     try {
       const vendors = await Vendor.find({})
                                   .limit()
                                   .populate("category")
                                   .populate("subcategories")
                                   .sort([["createdAt", "desc"]])
                                   .exec();
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

    exports.listvendorsuser = async (req,res) => {
      try { 
         console.log("Request value",req.params) ;     
         const vendors = await Vendor.find({userId: req.params.userid})                                   
                                    .populate("userId")
                                    .populate("category")
                                    .populate("subcategories")
                                    .sort([["createdAt", "desc"]])
                                    .exec();
        if (!vendors) {
           return res.status(400).send("No vendors data was found !!!!");
        }
        return res.json(vendors);
        console.log(vendors);
      }
      catch (err) {
         console.log(err);
         res.status(500).send("Server error while fetching vendors");
      }
     }

     exports.getvendor= async (req,res) => {
      try {
         const vendor = await Vendor.findOne({_id: req.params.id})
                                  .populate("userId")
                                  .populate("vendorInfoId")
                                  .populate("category")
                                  .populate("subcategories")
                                   .exec();                                         
                      
        if (!vendor) {
           return res.status(400).send("No vendor categories data was found !!!!");
        }
        res.json(vendor);
      }
      catch (err) {
         console.log(err);
         res.status(500).send("Server error while fetching vendor categories");
      }
     }

     //delete one record based on id
     exports.removevendor= async (req,res) =>     
     {
       console.log("In vendor cat delete");
       try {
        console.log("Req params", req.params);
        const vendor = await Vendor.findOneAndDelete( {_id: req.params.id}).exec();
        console.log("vendor from backend", vendor);
        res.status(200).send("Vendor Category deleted successfully!!!!");          
       }
       catch (err) {
         console.log(err);
         return res.status(400).send("Vendor Category delete failed !!!!");
       }
     };

     exports.updatevendor = async (req,res) => 
     {
         console.log("From edit vendor cat",req.params );
     }
  

 