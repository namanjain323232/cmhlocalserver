const mongoose = require('mongoose');
const schema = mongoose.Schema;

//create the new category schema
const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true },
    imgURL: {
      type: String,
      required:true }
  },
  {timestamps: true}
  );
  mongoose.exports = Category = mongoose.model("Category", categorySchema);
