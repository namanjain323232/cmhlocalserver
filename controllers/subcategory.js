const express = require("express");
const mongoose = require("mongoose");
const slugify = require("slugify");
const {check, validationResult} = require('express-validator');
const Subcategory = mongoose.model("Subcategory");
const Category = mongoose.model("Category");

   
 // add a new subcategory record
 exports.createsubcategory=  async (req,res) => 
 {
   try {
   
    let subcategory= await Subcategory.findOne({name:req.body.name});
    if (subcategory) {
      return res.status(400).json({ errors:[ {msg: 'Sub Category already exists !!!'}] })
     } 

   await Category.findOne({name: req.body.category}, async (err,categoryval) =>
     {        
       if (err) {
          return  res.send(err);
     }        
     const  subcategory = new Subcategory (
            {name: req.body.name,
            slug: slugify(req.body.name),
            category:categoryval._id}
     );        
         await subcategory.save();
         res.status(200).send({ message: "Subcategory saved successfully !!!!!"}); 
     } 
    )}
    catch (err) {
      console.error(err);
      res.status(500).send("Failed to save Sub category !!!!");
    }    
};

  //find all the subcategories records
  exports.listsubcategories= async (req,res) => {
    try {
      const subcategories= await Subcategory.find({})
                                            .populate('category', ['name'])
                                            .sort({category : 1});  
      console.log("From subcat list", subcategories);
      if (!subcategories)  {
        return res.status(400).json({msg: 'There are no subcategories !!!!'})
      }
         res.json(subcategories);
     }
     catch (err) {
       console.error(err);
       res.status(500).send("Failed to fetch subcategories");
     }
    };

    //find one subcategory record by id 
    exports.readsubcategory= async (req,res) => {
      try {
       const subcategory= await Subcategory.findOne({slug: req.params.slug})
                                            .populate('category',['name'])
                                            .sort({category: 1});
       if (!subcategory) {
         return res.status(400).json({msg: 'Subcategory not found !!!!'})
       }
       res.json(subcategory);
        } 
       catch (err) {
        console.error(err);
        res.status(500).send("Failed to fetch subcategory");
       }   
    };

    exports.updatesubcategory=
    [check('category','Category Name is required' ).not().isEmpty(),
    check('name', 'SubCategory Name is required').not().isEmpty()  
    ],
    async (req,res) => {
      const errors= validationResult(req);
      if (!errors.isEmpty()) {
       return  res.status(400).json({ errors: errors.array()})
       }
      try {
               
        await Category.findOne({name: req.body.category}, async (err,categoryval) =>
        {          
        if (err) {
           return res.status(400).json(err);
         }     
         await Subcategory.findByIdAndUpdate({ slug: req.params.slug},
                                      { name: req.body.name,
                                        slug: slugify(req.body.name),
                                        category: categoryval._id
                                        }, (error,result) => {
           if (error) {
              return res.send(err);
           }
          res.status(200).send({ success: true, message: "Sub Category updated successfully!!!!"}); 
        })      
      })    
   } catch (err) {
    console.error(err);
    return res.status(500).send("Failed to edit Sub category !!!!");
  }
};

  //delete the selected subcategory record
    exports.removesubcategory= async(req,res) => {
      await  Subcategory.findOneAndDelete({ slug: req.params.slug}, (err,result) =>
        {
            if (err) {
              return  res.send(err);
            }
            res.status(200).send( {success:true, message: "Subcategory deleted successfully"});
        })        
    };


   

