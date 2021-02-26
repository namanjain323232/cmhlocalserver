const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = new mongoose.Schema ({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true
     },
     vendorInfoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'VendorInfo',
        required: true
     },
     slug: {
      type: String,
      unique: true,
      lowercase:true,
      index:true      
    },     
  description: {
        type: String,
        maxlength:2000,
        text:true
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
   },
   ratings: [{
      star: Number,
      postedBy:  {type: mongoose.Schema.Types.ObjectId,
                  ref: 'User'}
   }],
},
{timestamps: true}
);

mongoose.exports= Vendor = mongoose.model("Vendor", vendorSchema);