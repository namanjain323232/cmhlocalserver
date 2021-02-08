const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const vendorSchema = new mongoose.Schema ({
   name: {
             type: String,
             required: true,
             maxlength: 100,
             trim: true,
             text: true },
   description: {
             type: String,
             required: true,
             maxlength: 2000,
             trim:true,
             text:true
             },                
   postcode: {
           type: String,
           required:true,
           maxlength: 20,
           text:true
   } ,
   slug: {
        type: String,
        unique: true,
        lowercase:true,
        index:true  
   },
   houseNo: {
            type: String,
            maxlength:10
   },
   addressLine1: {
         type: String,
         required:true,
         maxlength:100
   } ,
   addressLine2:{
       type: String,
       maxlength:100,
   },
   city: {
      type: String,
      required:true,
      maxlength:100,
      text:true,
      trim:true
   },
   county: { 
      type: String,
      maxlength:100,
      text:true,
      trim:true
   },
   country: {
     type: String,
     maxlength:50,
     trim:true
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
   // category:{
   //    type:  mongoose.Schema.Types.ObjectId,
   //    ref: "Category"
   // },
   // subcategory: [
   //    { type:  mongoose.Schema.Types.ObjectId,
   //       ref: "Subcategory"
   //    }
   // ],
   quantity: Number,
   sold: {
      type: Number,
      default: 0
   },
   images: {
      type: Array
   },
   // ratings: {
   //    type: Number,
   //    postedby: String
   // }
},
{timestamps: true}
);

mongoose.exports= Vendor = mongoose.model("Vendor", vendorSchema);