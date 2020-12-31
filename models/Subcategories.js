const mongoose = require('mongoose');
const schema = mongoose.Schema;
const categorySchema = require("./Categories");

//create the new subcategory categorySchema
const subCategorySchema = new mongoose.Schema ({
    name: String,
    category: categorySchema
  });

  const SubCategory = mongoose.model("SubCategory", subCategorySchema);
