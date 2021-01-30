const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const mongoose = require("mongoose");

const { authCheck, adminCheck } = require("../../middlewares/auth");
const { check, validationResult} = require('express-validator');

const Category = mongoose.model("Category");

 // add new category if it does not already exist
 router.post("/", authCheck, adminCheck,
 [check('name', 'Category Name is required').not().isEmpty(),
  check('imgURL', 'Please enter a valid image URL').not().isEmpty()  
 ], 
 async (req,res) =>
   {
    const errors= validationResult(req);
    if (!errors.isEmpty()) {
       return  res.status(400).json({ errors: errors.array()})
    }
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
     });

    // get all the category records from the database
    router.get("/", async (req,res) =>
    {
    try {
      categories =await Category.find({});
      if (!categories) {
        return res.status(400).send("No categories were found !!!!");
      }
      res.json(categories) ; 
        } 
        catch (err) {
           console.log(err);
           res.status(500).send("Server errror for categories");
        }           
     })         
    
   
    // get one category record based on id
    router.get("/:slug", authCheck, adminCheck, async (req,res) =>
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
     });       
        

     //update one category record based on id
     router.put("/:slug", authCheck, adminCheck,
      [check('name', 'Category Name is required').not().isEmpty(),
      check('imgURL', 'Please enter a valid image URL').not().isEmpty()  
      ],  
     async (req,res) =>      
     {
      const errors= validationResult(req);
      if (!errors.isEmpty()) {
         return  res.status(400).json({ errors: errors.array()})
      }
      try {
        const {name, imgURL } = req.body;
        const category=  await Category.findByIdAndUpdate({slug:  req.params.slug},
                                                          {name,imgURL, slug: slugify(name)},
                                                          {new :true});
        res.status(200).json(category);
      } catch (err)   {
          console.log(err);
          return res.status(500).send("Failed to update category !!!!");           
         }        
     });

     //delete one record based on id
     router.delete("/:slug", authCheck, adminCheck, async (req,res) =>     
     {
      try {
        const category = await Category.findByIdAndDelete( {slug: req.params.slug});
        res.json({ success: true, message: "Category deleted successfully",category});          
       }
       catch (err) {
         return res.status(500).send("Category delete failed !!!!");
       }
     });


    module.exports = router;








