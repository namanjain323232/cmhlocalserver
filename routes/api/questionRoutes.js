 const express = require("express");
 const router = express.Router();
 const mongoose= require("mongoose");
 const {check, validationResult} = require('express-validator');
 const Question= mongoose.model("Question");

   router.post("/", 
   [check('question', 'please enter a question').not().isEmpty()  
   ], 
   async (req,res) => {
      const errors= validationResult(req);
      if (!errors.isEmpty()) {
         return  res.status(400).json({ errors: errors.array()})
      }
    try {     
       const  { question, options } = req.body;
       let questionval = await Question.findOne({ question});
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
    });

    //fetch all records from Questions Master
    router.get("/", async (req,res) => {

       await Question.find({}, (questionRes,err) => {
            if (err) {
              return res.send(err);               
            }
              res.send(questionRes);
        });    
     });

     //fetch one record from Questions Master
     router.get("/:id", async (req,res) => {

        await Question.findOne({_id: req.params.id}, (questionRes, err) => {
            if (err) {
              return res.status(400).send(err);              
            }
               res.send(questionRes);                     
        }); 
           
     });
     
    //route to edit the current question record
     router.put("/:id", 
     [check('question', 'please enter a question').not().isEmpty()  
     ], 
     async (req,res) => {
      const errors= validationResult(req);
      if (!errors.isEmpty()) {
         return  res.status(400).json({ errors: errors.array()})
      }
      try {
        const  { question, options } = req.body;
        let questionRes=  await Question.findByIdAndUpdate({_id: req.params.id}, 
                                                          {question,options});
         res.status(200).send('Question record updated successfully !!!!');                      
        }
      catch (error) {
         console.log(error);
         res.status(400).send("Failed to save question record");
      }
     })

     //route to delete the current selected question record

     router.delete("/:id", async (req,res) => {

        await Question.findByIdAndDelete({_id: req.params.id}, (questionRes,err) => {
         if (err)   {
            return res.send(err);             
         } 
          return res.send({ success: true, message: "Question record deleted successfully",questionRes});               
        });
       
     })

     module.exports = router;
