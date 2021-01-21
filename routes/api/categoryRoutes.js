const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult} = require('express-validator');

const Category = mongoose.model("Category");

 // add new category if it does not already exist
 router.post("/", 
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

        category =  new Category ({name,imgURL});
        
        await category.save();
        res.send("Category saved successfully !!!!");
                    
      } catch (err) {
        console.error(err);
        return res.status(500).send("Failed to save category !!!!");
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
    router.get("/:id/", async (req,res) =>
     { 
     try {

      category = await Category.findOne({_id: req.params.id});
      if (!category) {
        return res.status(400).send("Categories could not be found !!!!");
      }
      res.json(category);
     }  catch (err) {
            console.log(err);
            res.status(500).json({message: "Server error at find a category"});
     }        
     });       
        

     //update one category record based on id
     router.put("/:id", 
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
        const category=  await Category.findByIdAndUpdate({_id:  req.params.id},{name,imgURL });
        res.status(200).send('Catgeory updated successfully !!!!');
      } catch (err)   {
          console.log(err);
          return res.status(500).send("Failed to update category !!!!");           
         }        
     });

     //delete one record based on id
     router.delete("/:id", async (req,res) =>     
     {
      try {
      const category = await Category.findByIdAndDelete( {_id: req.params.id});
      res.json({ success: true, message: "Category deleted successfully",category});          
       }
       catch (err) {
         return res.status(500).send("Category delete failed !!!!");
       }
     });

//      // get all the category names from the database
//      router.get("/", async (req,res) =>
//    {
//     try {
//     const categoriesName = await Category.find ({}, {name:1, _id: false});
//     console.log("categories",categories);
    
//     if (!categoriesName) {
//     return res.status(400).send({message: "No category names were found !!!"})
//   }
//     res.json(categoriesName);   
//  } 
//  catch (err) {
//      res.status(500).send({message: "Server error for fetch categories by name"});
//  }
// });

    module.exports = router;








