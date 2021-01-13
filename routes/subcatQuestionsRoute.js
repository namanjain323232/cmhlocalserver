const mongoose = require("mongoose");

const SubcatQuestions = mongoose.model("SubcatQuestions");

module.exports = (app) => {

    app.post("/api/subcatquestions", async  (req,res) => {
      
      const subcatQuestion = new SubcatQuestions (
        { category: res.body.category,
          subcategory: res.body.subcategory,
          questions: res.body.questions
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

}