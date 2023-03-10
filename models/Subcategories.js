const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = require("./Categories");

//create the new subcategory categorySchema
const subcategorySchema = new mongoose.Schema ({
    name: {
      type: String,
      trim: true,
      required: true  }, 
      hide: {
        type: String,
        enum: ["Yes", "No"],
        // required:true 
      },
      type: {
            type: String,
            enum: ["Face to Face", "Online", "Both"],
            // required:true
           },          
    slug: {
      type: String,
      unique: true,
      lowercase:true,
      index:true
    },
    category: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Category', 
       required: true}
  },
 
  {timestamps: true}
  );

  mongoose.exports= Subcategory = mongoose.model("Subcategory", subcategorySchema);
