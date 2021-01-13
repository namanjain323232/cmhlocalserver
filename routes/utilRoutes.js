const mongoose = require("mongoose");

const Category = mongoose.model("Category");
const Subcategory = mongoose.model("Subcategory");
const Question = mongoose.model("Question");

module.exports = (app) => {

// get all the category names from the database
app.get("/api/categoryname", async (req,res) =>
{
 const categories =  Category.find ({}, {name:1, _id: false}, (err,categories) =>
 
  {
    if (err) {
      res.send(err);
      return;
    } 
      res.send(categories);
      return;
   }     
  )     
});

//get all the subcategory names for the selected category
app.get("/api/subcategoryname", async (req, res) => {
  const subcategories = Subcategory.find({}, {name:1, _id: false}, (err,subcategories) =>
  {
   console.log("Subcategories list", subcategories);
   if (err) {
     res.send(err);
     return;
   } 
    res.send(subcategories);
    return;
  })
});

//get list of all the questions 
app.get("/api/questionname", async(req,res) => {
  const questions = Question.find({}, {question:1, _id: false}, (err,questions) =>
  {
    if (err) {
      res.send(err);
      return;
    }
      res.send(questions);
      return;
  })
});
}