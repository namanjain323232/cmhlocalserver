const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Category = mongoose.model("Category");
const Subcategory = mongoose.model("Subcategory");
const Question = mongoose.model("Question");


// // get all the category names from the database
// router.get("/catname", async (req,res) =>
// {
//  try {
//   const categories = await Category.find ({}, {name:1, _id: false});
//   console.log(categories);
//   if (!categories) {
//     return res.status(400).send({message: "No category names were found !!!"})
//   }
//     res.json(categories);   
//  } 
//  catch (err) {
//      res.status(500).send({message: "Server error for fetch categories by name"});
//  }
// });

//get all the subcategory names for the selected category
// router.get("/subcatname", async (req, res) => {

//   try {
//     const subcategories = await Subcategory.find({}, {name:1, _id: false});
//     if (!subcategories) {
//       return res.status(400).json({message: "No subcategories were found !!!!"});
//     }
//     res.send(subcategories);
//   }
//    catch (err) {
//          res.status(500).json({message: "Server error for fetch sub categories by name",err});
//    }  
// });

//get list of all the questions 
// router.get("/questionname", async(req,res) => {

//   try {
//     const questions = await Question.find({}, {question:1, _id: false});
//     if (!questions) {
//       return res.status(400).json({message: "No questions/options were found !!!!"});
//     }
//     res.json(questions); 
//   } 
//    catch (err) {
//      res.status(500).json({message: "Server error for fetch questions/options name"});
//  }  
// });

module.exports = router;
