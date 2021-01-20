const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {body, validationResult} = require('express-validator');

const Category = mongoose.model("Category");
const Subcategory = mongoose.model("Subcategory");
const Question = mongoose.model("Question");


// get all the category names from the database
router.get("/", async (req,res) =>
{
 const categories =  Category.find ({}, {name:1, _id: false}, (err,categories) =>
 
  {
    if (err) {
      return res.send(err);      
    } 
      res.send(categories);      
   }     
  )     
});

//get all the subcategory names for the selected category
router.get("/", async (req, res) => {
  const subcategories = Subcategory.find({}, {name:1, _id: false}, (err,subcategories) =>
  {
   console.log("Subcategories list", subcategories);
   if (err) {
     res.send(err);
     return;
   } 
    res.json(subcategories);   
  })
});

//get list of all the questions 
router.get("/", async(req,res) => {
  const questions = Question.find({}, {question:1, _id: false}, (err,questions) =>
  {
    if (err) {
      res.send(err);
      return;
    }
      res.json(questions);      
  })
});

module.exports = router;
