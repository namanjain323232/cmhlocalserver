const mongoose = require('mongoose');
const schema = mongoose.Schema;

//create the new category schema
const categorySchema = new mongoose.Schema({
    name: String,
    imgURL: String
  });
  const Category = mongoose.model("Category", categorySchema);
