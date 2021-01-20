const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {check, validationResult} = require('express-validator');

const Category = mongoose.model("Category");
const Subcategory = mongoose.model("Subcategory");
const Question = mongoose.model("Question");
const SubcatQuestions = mongoose.model("SubcategoryQuestions");

    
  router.post("/", 
     [check('category','Category must be selected').not().isEmpty(),
      check('subcategory','Sub Category must be selected').not().isEmpty(),
      check('question', 'Question must be selected').not().isEmpty()    
    ],    
    async  (req,res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())  {
        return res.status(400).json({errors: errors.array() });
      }
     try {
      const categoryval =  await Category.findOne({name: req.body.category});
       if (!categoryval) {
         return res.status(400).send({msg: 'Unable to find category !!!!!'});
       }         
       const subcategoryval = await Subcategory.findOne({name: req.body.subcategory});
         if (!subcategoryval) {
            return res.status(400).send({ msg: 'Unable to find sub category !!!!!'});
         }         
       const questionval = await Question.find({question :req.body.questions});
         if (!questionval) {
           return res.status(400).send( { msg: 'Unable to find question'});
         }         
       const subcatQuestion = new SubcatQuestions (
        { category: categoryval,
          subcategory: subcatval,
          questions: questionval
        }
      );     
      await subcatQuestion.save();
        res.json({ success: true, message: "Subcategory Questions saved successfully !!!!!"});        
    } catch (error) {
        res.status(409).json({message: error.message});        
    }
    });
       
  router.get("/", async (req,res) => {
   try {
      subcatquestionval = await SubcatQuestions.find({});
      console.log(subcatquestionval);
      res.status(200).json(subcatquestionval);
    } catch (err) {
       res.status(400).json({message: error.message});
     }    
    });

    module.exports = router;
