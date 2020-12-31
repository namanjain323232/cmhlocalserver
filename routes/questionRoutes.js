 const mongoose= require("mongoose");
 const Question= mongoose.model("Question");

 module.exports = (app) =>
 {
     app.post("/api/question", async (req,res) => {
     console.log("In the questions Router",req.body);
} ) 
 }
