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
         }
     );
     try {
        await questionOut.save(); 
        res.send({ success: true, message: "Question and options saved successfully!!!!"});          
      } catch (error) {
          res.send(error);
      }
    });

    app.get("/api/questions", async (req,res) => {

       await Question.find({}, (questionRes,error) => {
            if (error) {
                res.send(error);
            }
             res.send(questionRes);
        })
     });

     }
