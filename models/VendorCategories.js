const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorCategoriesSchema = new mongoose.Schema ({
   _vendor: {
          type: Schema.Types.ObjectId,
          ref: "Vendor"
   },
    _subcategory:  {
             type: Schema.Types.ObjectId,
             ref: "SubCategory"
             },
   areasCovered: [String],
   priceType: String,
   price: Number,
   website: String
},
{timestamps: true}
);

mongoose.exports= VendorCategories = mongoose.model("VendorCategories", vendorCategoriesSchema);
    

