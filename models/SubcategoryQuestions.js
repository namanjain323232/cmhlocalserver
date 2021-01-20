const mongoose = require('mongoose');
const schema = mongoose.Schema;


const categorySchema = require('./Categories');
const subcategorySchema = require('./Subcategories');
const questionSchema= require('./Questions');

//create the new category schema
const subQuestionSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category' },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subcategory' },
    questions: 
          [ {type: mongoose.Schema.Types.ObjectId,
          ref: 'questions' }] 
  });
  mongoose.exports= SubcategoryQuestions = mongoose.model("SubcategoryQuestions", subQuestionSchema);