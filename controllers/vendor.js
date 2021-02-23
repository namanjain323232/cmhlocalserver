const express = require("express");
const slugify = require("slugify");
const router = express.Router();
const mongoose = require("mongoose");
const {body, validationResult} = require('express-validator');

const Vendor = mongoose.model("Vendor");
const User = mongoose.model("User");

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
                                   .populate("userId")
                                   .populate("vendorInfoId")
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
        res.status(500).send(`Server error while fetching vendors: ${err.message}`);
     }
    }

    exports.list= async (req,res) => {
      try {
        console.log("Req from vendor list", req.body); 
        const {order,page} = req.body;
        const currentPage= page || 1;
        const vendorsPerPage= 3;
        const vendors = await Vendor.find({})
                                    .skip((currentPage -1) * vendorsPerPage)
                                    .populate("userId")
                                    .populate("vendorInfoId")
                                    .populate("category")
                                    .populate("subcategories")
                                    .sort([[order]])
                                    .limit(vendorsPerPage)
                                    .exec();
        if (!vendors) {
           return res.status(400).send("No vendors data was found !!!!");
        }
        res.json(vendors);
      }
      catch (err) {
         console.log(err);
         res.status(500).send(`Server error while fetching vendors: ${err.message}`);
      }
     }

    exports.listvendorsuser = async (req,res) => {
      try { 
         console.log("Request values from vendor list user",req.params) ;     
         const vendorsusers = await Vendor.find({userId: req.params.userid})                                   
                                    .populate("userId")
                                    .populate("vendorInfoId")
                                    .populate("category")
                                    .populate("subcategories")
                                    .sort([["createdAt", "desc"]])
                                    .exec();
        if (!vendorsusers) {
           return res.status(400).send("No vendors data was found !!!!");
        }
        return res.json(vendorsusers);
        console.log(vendorsusers);
      }
      catch (err) {
         console.log(err);
         res.status(500).send("Server error while fetching vendors for user");
      }
     }

     exports.getvendor= async (req,res) => {
        console.log("Req parameters from getvendor", req.params.id);
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
         try {
         const vendor= await Vendor.findOneAndUpdate( {_id: req.params.id},
                                                      req.body,
                                                      {new: true}
                                                      ).exec();
         res.json(vendor);
         }         
         catch (err) {
            console.log(err);
            return res.status(400).json({err: err.message});
         }
     }

     exports.vendorcount= async (req,res) => { 
        console.log("Req from vendor count", req.data);    
      try {
        const total= await Vendor.find({}).estimatedDocumentCount().exec();
        console.log("Total",total);
        return res.json(total);
      }
      catch ( err) {
         console.log(err);        
      }
     }
     
     //allow user to add star rating for the ventor
     exports.vendorRating= async (req,res) => {

      const vendor= Vendor.findById({_id: req.params.vendorid}).exec();
      const user= User.findOne({email: req.user.email}).exec();
      const {star} = req.body;

      //check if the user has already left a rating for this vendor
      let existingRatingObject= vendor.ratings.find( 
                                         (e) => (e.postedBy.toString() === user._id.toString()));

     // if user has not left any rating on this vendor, add the rating otherwise update the rating
     if (existingRatingObject === undefined) {
        let newRating = Vendor.findByIdAndUpdate({_id: vendor._id},
                         { $push: { ratings: { star: star, postedBy: user._id}}
                         }, {new: true}
                         ).exec();
        console.log(newRating);
        res.json(newRating);
       } else {
          let updatedRating= Vendor.updateOne( 
             {ratings:
                { $elemMatch: existingRatingObject}
             },
            { $set: {"ratings.$.star": star}},
            {new: true}            
          ).exec();
          console.log(updatedRating);
          res.json(updatedRating);
       }      
     }
  

 