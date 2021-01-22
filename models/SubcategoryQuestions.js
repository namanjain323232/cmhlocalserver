const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = require('./Categories');
const subcategorySchema = require('./Subcategories');
const questionSchema= require('./Questions');

//create the new category schema
const subQuestionSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategory',
      required: true },
    questions: 
      [ {type: mongoose.Schema.Types.ObjectId,
          ref: 'Question',
          required:true }] ,
    },
    {timestamps : true }
  );
  mongoose.exports= SubcategoryQuestions = mongoose.model("SubcategoryQuestions", subQuestionSchema);