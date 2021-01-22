const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const vendorSchema = new mongoose.Schema ({
   firstName: String,
   lastname: String,
   email: String,
   postcode: String,
   houseNo: String,
   addressLine1: String,
   addressLine2: String,
   city: String,
   county: String,
   country: String
},
{timestamps: true}
);

mongoose.exports= Vendor = mongoose.model("Vendor", vendorSchema);