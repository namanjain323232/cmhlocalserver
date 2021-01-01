const mongoose = require('mongoose');
const schema = mongoose.Schema;
const categorySchema = require("./Categories");

//create the new subcategory categorySchema
const subcategorySchema = new mongoose.Schema ({
    name: String,
    category: categorySchema
  });

  const Subcategory = mongoose.model("Subcategory", subcategorySchema);
