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
       
       await Question.find({name: [req.body.questions] }, async (err,questionval) => {
         if (err) {
          return res.send(err);
         }
            
      const subcatQuestion = new SubcatQuestions (
        { category: categoryval,
          subcategory: subcatval,
          questions: questionval
        }
      );     

      try {
        await subcatQuestion.save();
        res.send({ success: true, message: "Subcategory Questions saved successfully !!!!!"});
        return;
    } catch (error) {
        res.send(error);
        return;
    }
    })
    })
  })
  })


}