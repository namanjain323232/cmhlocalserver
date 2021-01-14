 const mongoose= require("mongoose");
 const Question= mongoose.model("Question");

 module.exports = (app) =>
 {
  app.post("/api/questions", async (req,res) => {
    console.log("Request body from questions create", req.body);
     const questionOut = new Question(
         {
             question: req.body.question,
             options: req.body.options
         } );

     try {
        await questionOut.save(); 
        return res.send({ success: true, message: "Question and options saved successfully!!!!"});                      
      } catch (err) {
         return res.send(err);
      }
     
    });
    //fetch all records from Questions Master
    app.get("/api/questions", async (req,res) => {

       await Question.find({}, (questionRes,err) => {
            if (err) {
               return res.send(err);               
            }
               return res.send(questionRes);
        })    
     });

     //fetch one record from Questions Master
     app.get("/api/questions/:id", async (req,res) => {

        await Question.findOne({_id: req.params.id}, (questionRes, err) => {
            if (err) {
               return res.send(err);              
            }
            return res.send(questionRes);                     
        }); 
           
     });
     
    //route to edit the current question record
     app.patch("/api/questions/:id", async (req,res) => {

        await Question.findByIdAndUpdate({_id: req.params.id}, 
                                         {question: req.body.question,
                                          options: req.body.options},
            
            (questionRes,err) => {
            if (err) {
               return res.send(err);                
            }
               return res.send({ success: true, message: 'Question record updated successfully !!!!'});            
        })
     })

     //route to delete the current selected question record

     app.delete("/api/questions/:id", async (req,res) => {

        await Question.findByIdAndDelete({_id: req.params.id}, (questionRes,err) => {
         if (err)   {
            return res.send(err);             
         } 
          return res.send({ success: true, message: "Question record deleted successfully",questionres});               
        });
       
     })

     }
