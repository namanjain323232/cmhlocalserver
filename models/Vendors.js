const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const vendorSchema = new mongoose.Schema ({
   email: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true
     },
   slug: {
        type: String,
        unique: true,
        lowercase:true,
        index:true  
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
   subcategory: [
      { type:  mongoose.Schema.Types.ObjectId,
         ref: "Subcategory"
      }
   ],
   quantity: Number,
   sold: {
      type: Number,
      default: 0
   }
   // images: {
   //    type: Array
   // },
   // ratings: {
   //    type: Number,
   //    postedby: String
   // }
},
{timestamps: true}
);

mongoose.exports= Vendor = mongoose.model("Vendor", vendorSchema);