const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorInfoSchema = new mongoose.Schema ({
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
areasCovered: [String],
   priceType: String,
   price: Number,
   website: String
},

{timestamps: true}
);

mongoose.exports= VendorInfo = mongoose.model("VendorInfo", vendorInfoSchema);
    

