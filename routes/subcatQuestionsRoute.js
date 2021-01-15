const mongoose = require("mongoose");

const Category = mongoose.model("Category");
const Subcategory = mongoose.model("Subcategory");
const Question = mongoose.model("Question");
const SubcatQuestions = mongoose.model("SubcategoryQuestions");

module.exports = (app) => {

    app.post("/api/subcatquestions", async  (req,res) => {

     await Category.findOne({name: req.body.category}, async (err,categoryval) => {
       if (err) {
         return res.send(err);
       }  
       
       await Subcategory.findOne({name: req.body.subcategory}, async (err,subcatval) => {
         if (err) {
           return res.send(err);
         }
       
        
       await Question.find({question :req.body.questions}, async (err,questionval) => {
         if (err) {
          return res.send(err);
         }
        console.log("Questval:",questionval) ;   
      const subcatQuestion = new SubcatQuestions (
        { category: categoryval,
          subcategory: subcatval,
          questions: questionval
        }
      );     

      try {
        await subcatQuestion.save();
        return res.send({ success: true, message: "Subcategory Questions saved successfully !!!!!"});        
    } catch (error) {
        return res.send(error);
        
    }
    })
    })
  })
  })

   
  app.get("/api/subcatquestions", async (req,res) => {

    await SubcatQuestions.find({}, async(err, subcatquestionval) => {
      console.log(subcatquestionval);
       if (err) {
         return res.send(err);
       }
       return res.send(subcatquestionval);
    })
  });

}