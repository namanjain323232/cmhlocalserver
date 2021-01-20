const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = require("./Categories");

//create the new subcategory categorySchema
const subcategorySchema = new mongoose.Schema ({
    name: {
      type: String,
      required: true  },
    category: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Category' }
  });

  mongoose.exports= Subcategory = mongoose.model("Subcategory", subcategorySchema);
