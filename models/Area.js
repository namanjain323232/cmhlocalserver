const mongoose = require('mongoose');
const schema = mongoose.Schema;

const areaSchema= new mongoose.Schema({
 city : String,
 county: String,
 country: String
},{timestamps: true}
);

mongoose.exports = Area= mongoose.model("Area", areaSchema);
