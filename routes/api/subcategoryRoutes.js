const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {check, validationResult} = require('express-validator');
const Subcategory = mongoose.model("Subcategory");
const Category = mongoose.model("Category");

   
 // add a new subcategory record
 router.post("/", 
 [check('category','Category Name is required' ).not().isEmpty(),
  check('name', 'SubCategory Name is required').not().isEmpty()  
 ], 
 async (req,res) => 
 {
    const errors= validationResult(req);
    if (!errors.isEmpty()) {
       return  res.status(400).json({ errors: errors.array()})
    }
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
});

  //find all the subcategories records
  router.get("/", async (req,res) => {
    try {
      const subcategories= await Subcategory.find({}).populate('category', ['name']).sort({category : 1});  
      console.log("Subcategories",subcategories) ; 
      if (!subcategories)  {
        return res.status(400).json({msg: 'There are no subcategories !!!!'})
      }
        res.json(subcategories);
     }
     catch (err) {
       console.error(err);
       res.status(500).send("Failed to fetch subcategories");
     }
    });

    //find one subcategory record by id 
    router.get("/:id", async (req,res) => {
      try {
       const subcategory= await Subcategory.findOne({_id: req.params.id}).populate('category',['name']).sort({category: 1});
       if (!subcategory) {
         return res.status(400).json({msg: 'Subcategory not found !!!!'})
       }
       res.json(subcategory);
        } 
       catch (err) {
        console.error(err);
        res.status(500).send("Failed to fetch subcategory");
       }   
    });

    router.put("/:id",
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
         await Subcategory.findByIdAndUpdate({ _id: req.params.id},
                                      { name: req.body.name,
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
});

    //delete the selected subcategory record
    router.delete("/:id", async(req,res) => {
      await  Subcategory.findByIdAndDelete({ _id: req.params.id}, (err,result) =>
        {
            if (err) {
              return  res.send(err);
            }
            res.status(200).send( {success:true, message: "Subcategory deleted successfully"});
        })        
    });

    module.exports = router;

