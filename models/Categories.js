const mongoose = require('mongoose');
const schema = mongoose.Schema;


//create the new category schema
const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true ,
      trim: true,
      required: "Category name is required"},
    imgURL: {
      type: String,
      required:true },
    slug: {
      type: String,
      unique: true,
      lowercase:true,
      index:true      
    }
  },
  {timestamps: true}
  );
  mongoose.exports = Category = mongoose.model("Category", categorySchema);
