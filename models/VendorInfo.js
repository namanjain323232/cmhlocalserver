const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorInfoSchema = new mongoose.Schema ({
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
 name: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
      text: true },
slug: {
         type: String,
         unique: true,
         lowercase:true,
         index:true      
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
areascovered: {
 type: String,
 maxlength:100,
 trim:true,
 required:true
},
website: String
},
{timestamps: true}
);

mongoose.exports= VendorInfo = mongoose.model("VendorInfo", vendorInfoSchema);
    

