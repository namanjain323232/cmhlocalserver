const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {check, validationResult} = require('express-validator');

const Category = mongoose.model("Category");
const Subcategory = mongoose.model("Subcategory");
const Question = mongoose.model("Question");
const SubcatQuestions = mongoose.model("SubcategoryQuestions");

    
  // router.post("/", 
  //    [check('category','Category must be selected').not().isEmpty(),
  //     check('subcategory','Sub Category must be selected').not().isEmpty()
  //     // check('question', 'Question must be selected').not().isEmpty()    
  //   ],    
  //   async  (req,res) => {
  //     const errors = validationResult(req);
  //     if (!errors.isEmpty())  {
  //       return res.status(400).json({errors: errors.array() });
  //     }
  //    try {
  //     const categoryval =  await Category.findOne({name: req.body.category});
  //      if (!categoryval) {
  //        return res.status(400).send({msg: 'Unable to find category !!!!!'});
  //      }         
  //      const subcategoryval = await Subcategory.findOne({name: req.body.subcategory});
  //        if (!subcategoryval) {
  //           return res.status(400).send({ msg: 'Unable to find sub category !!!!!'});
  //        }         
  //      const questionval = await Question.find({question :req.body.questions});
  //        if (!questionval) {
  //          return res.status(400).send( { msg: 'Unable to find question !!!!'});
  //        }   
         
  //        console.log("category", categoryval, subcategoryval);
  //      const subcatQuestion = new SubcatQuestions (
  //       { category: categoryval,
  //         subcategory: subcategoryval,
  //         questions: questionval
  //       }
  //     );     
  //     await subcatQuestion.save();
  //     res.send("Subcategory Question saved successfully");        
  //   } catch (error) {
  //       res.status(400).send({message: error.message});        
  //   }
  //   });

  //fetch all the subcategory questions     
  exports.listsubcatquestions= async (req,res) => {
   try {

     const subquestion= await SubcatQuestions.find({})
                                    .populate("category")
                                     .populate("subcategory")
                                     .populate("questions");
      if (!subquestion) {
        return res.status(400).send({msg: 'Unable to find subcategory questions'});
      }
      console.log(subquestion);
      res.json(subquestion);
    } catch (err) {
       console.log(err);
       res.status(500).send({msg: err.message});
     }    
    };

    //fetch one subcategory question record
    // router.get("/:id", async (req,res) => {

    //   try {
    //      const subquestionval = await SubcatQuestions.find({_id: req.params.id })
    //                                                 .populate('category', ['name'])
    //                                                 .populate('subcategory', ['name'])
    //                                                 .populate('questions', ['question','options']);
    //      if (!subquestionval) {
    //        return res.status(400).send({msg: 'Could not find subcategory question !!!!'});
    //      }
    //      res.json(subcatquestionval);
    //   }
    //   catch (err) {
    //     console.log(err);
    //     res.status(500).json({msg: err.message});
    //   }
    // });

    // router.put("/:id", async (req,res) => {
    //   try {
    //     const subquestion = await SubcatQuestions.findByIdAndUpdate({_id: req.params.id});
    //     if (!subquestion) {
    //       return res.status.json(400).send({msg: 'Subcategory question to edit not found !!!'});
    //     }
    //   }
    //   catch (err) {
    //     console.log(err);
    //     res.status(500).json('Server error on subcategory question edit');
    //   }
    // })

    // //delete one subcategory question record
    // router.delete("/:id", async (req,res) => {
    //   try {
    //    const subquestion = await SubcatQuestions.findByIdAndDelete({_id: req.params.id});
    //    if (!subquestion) {
    //      return res.status(400).send({msg: 'Subcategory question to delete not found !!!'})
    //    }
    //    res.status(200).send( {success:true, message: "Subcategory questions deleted successfully"});
    //   }
    //   catch (err) {
    //     console.log(err);
    //     res.status(500).json({msg: 'Unbale to delete subcategory questions'});
    //   }
    // })

    // module.exports = router;
