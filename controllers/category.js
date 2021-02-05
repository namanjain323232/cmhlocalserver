const express = require("express");
const slugify = require("slugify");
const mongoose = require("mongoose");
const Category = mongoose.model("Category");

const { check, validationResult} = require('express-validator');

// add new category if it does not already exist
exports.createcategory= async (req,res) => 
   {
     try {
      const {name, imgURL } = req.body;
      let category = await Category.findOne({name});
      if (category) {
        return res.status(400).json({ errors:[ {msg: 'Category already exists !!!'}] })
       }  
        category =  new Category ({name,imgURL, slug: slugify(name)});            
        await category.save();
        res.status(200).json(category);
                    
      } catch (err) {
        console.error(err);
        res.status(500).send("Failed to save category !!!!");
      }
     };

    // get all the category records from the database
    exports.listcategories= async (req,res) =>
    {
    try {
      categories =await Category.find({});
      if (!categories) {
        return res.status(400).send("No categories were found !!!!");
      }
       res.json(categories);
        } 
        catch (err) {
           console.log(err);
           res.status(500).send("Server errror for categories");
        }           
     };         
    
   
    // get one category record based on id
    exports.readcategory= async (req,res) =>
     { 
     try {
      category = await Category.findOne({slug: req.params.slug});
      if (!category) {
        return res.status(400).send("Category could not be found !!!!");
      }
      res.json(category);
     }  catch (err) {
            console.log(err);
            res.status(500).json({message: "Server error at find a category"});
     }        
     };       
        

     //update one category record based on id
     exports.updatecategory= async (req,res) =>      
     {
       try {
        const {name, imgURL } = req.body;
        const category=  await Category.findOneAndUpdate({slug:  req.params.slug},
                                                          {name,imgURL, slug: slugify(name)},
                                                          {new :true});
        res.status(200).json(category);
      } catch (err)   {
          console.log(err);
          return res.status(500).send("Failed to update category !!!!");           
         }        
     };

     //delete one record based on id
     exports.removecategory= async (req,res) =>     
     {
       try {
        const category = await Category.findOneAndDelete( {slug: req.params.slug});
        res.status(200).send("Category deleted successfully!!!!");          
       }
       catch (err) {
         return res.status(400).send("Category delete failed !!!!");
       }
     };


   








