const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = new mongoose.Schema ({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true
     },  
     email: {
        type: String,
        unique:true,
        index:true
     },  
   slug: {
        type: String,
        unique: true,
        lowercase:true,
        index:true  
   },  
  description: {
        type: String,
        maxlength:2000
   }, 
   price: {
      type: Number,
      maxlength:32,
      required:true
   },
   pricetype: {
      type: String,
      enum: ["Hourly", "Job", "Daily"]
   },
   category:{
      type:  mongoose.Schema.Types.ObjectId,
      ref: "Category"
   },
   subcategories: [
      { type:  mongoose.Schema.Types.ObjectId,
         ref: "Subcategory"
      }
   ],
   quantity: Number,
   sold: {
      type: Number,
      default: 0
   },
   images: {
      type: Array
   }
   // ratings: {
   //    type: Number,
   //    postedby: String
   // }
},
{timestamps: true}
);

mongoose.exports= Vendor = mongoose.model("Vendor", vendorSchema);