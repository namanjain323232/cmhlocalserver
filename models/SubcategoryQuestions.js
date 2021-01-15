const mongoose = require('mongoose');
const schema = mongoose.Schema;
const categorySchema = require('./Categories');
const subcategorySchema = require('./Subcategories');
const questionSchema= require('./Questions');

//create the new category schema
const subQuestionSchema = new mongoose.Schema({
    category: categorySchema,
    subcategory: subcategorySchema,
    questions: [questionSchema]
  });
  const SubcategoryQuestions = mongoose.model("SubcategoryQuestions", subQuestionSchema);