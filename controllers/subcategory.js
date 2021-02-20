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

   await Category.findOne({_id: req.body.category}, async (err,categoryval) =>
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
       const subcategory= await Subcategory.findOne({slug: req.params.slug}); 
       console.log("subcat value NOW", subcategory);
       if (!subcategory) {
        return res.status(400).send("Sub Category could not be found !!!!");
      }   
        res.json(subcategory);                
      } 
       catch (err) {
        console.error(err);
        res.status(500).json("Server error in fetch subcategory");
       }   
    };
   
    //update the subcategory
    exports.updatesubcategory=  async (req,res) => { 
      console.log("req params from subcat", req.params);     
      try {               
        const subcat=  await Subcategory.findOneAndUpdate({slug: req.params.slug},
                                      { category: req.body.category,
                                        name: req.body.name,
                                        slug: slugify(req.body.name)                                        
                                      }, {new: true});
        console.log("value from subcat", subcat);
        res.status(200).json(subcat);      
      } 
    catch (err) {
      console.error(err);
      return res.status(500).send("Failed to edit Sub category !!!!");
  }
};

  //delete the selected subcategory record
    exports.removesubcategory= async(req,res) => {
      try {
        const res=  await Subcategory.findOneAndDelete({ slug: req.params.slug});
        res.send(`Sub category deleted successfully:${slug}`);
      }
      catch (err)
       {
        res.send(`Failed to delete sub category: ${err}`);
       }            
     };  
   
 
   //find all subcategories for the selected category   
   exports.listcatsubcats = async(req,res) => {
    try {
      const subcats= await Subcategory.find({category: req.params.catid}).exec();
      res.json(subcats);
    }
    catch (err) {
      res.send(`Could not find any subcategories for:${req.params.catid}`);
    }
  };
    


  
