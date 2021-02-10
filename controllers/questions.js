 const express = require("express");
 const router = express.Router();
 const mongoose= require("mongoose");
 const {check, validationResult} = require('express-validator');
 const Question= mongoose.model("Question");

   exports.createquestion=  async (req,res) => {
    try {     
       const  { question, options } = req.body;
       let questionval = await Question.findOne({question});
       if (questionval) {
        return res.status(400).json({ errors:[ {msg: 'Question already exists !!!'}] });
       }      
        questionval = new Question( {question, options} );
        await questionval.save(); 
        res.status(200).send({ message: "Question and options saved successfully!!!!"});                      
      } catch (err) {
         console.error(err);
         res.status(500).send("Unable to add Question !!!!");
      }
    };

    //fetch all records from Questions Master
    exports.listquestions= async (req,res) => {
      try {
        questions= await Question.find({});
         res.json(questions);
        } 
      catch (err) {
         console.log(err);
         res.status(500).send(`Error from questions list: ${err}`); 
      }
      };   
   

     //fetch one record from Questions Master
     exports.readquestion = async (req,res) => {
    try {
       question=  await Question.findOne({_id: req.params.id});
       if (!question) {
        return res.status(400).send("Question data could not be found !!!!");
        }
         res.json(question);
      }
      catch (err) {          
              return res.status(500).send(err);              
            }                     
     }
      
//     //route to edit the current question record
//      router.put("/:id", 
//      [check('question', 'please enter a question').not().isEmpty()  
//      ], 
//      async (req,res) => {
//       const errors= validationResult(req);
//       if (!errors.isEmpty()) {
//          return  res.status(400).json({ errors: errors.array()})
//       }
//       try {
//         const  { question, options } = req.body;
//         let questionRes=  await Question.findByIdAndUpdate({_id: req.params.id}, 
//                                                           {question,options});
//          res.status(200).send('Question record updated successfully !!!!');                      
//         }
//       catch (error) {
//          console.log(error);
//          res.status(400).send("Failed to save question record");
//       }
//      })

     //route to delete the current selected question record

    exports.removequestion=  async (req,res) => {
      try {
        question= await Question.findByIdAndDelete({_id: req.params.id});
        console.log("Question from delete", question);
        res.status(200).send(`Question deleted successfully!!!! ${question}`);  
      }  
       catch (err)   {
            return res.send(err);             
       }          
        };
      
     

//      //get list of all the questions 
//     router.get("/", async(req,res) => {

//     try {
//       const questionsName = await Question.find({}, {question:1, _id: false});
//       if (!questionsName) {
//       return res.status(400).json({message: "No questions/options were found !!!!"});
//     }
//     res.json(questionsName); 
//    } 
//    catch (err) {
//      res.status(500).json({message: "Server error for fetch questions/options name"});
//    }  
//   });

   
