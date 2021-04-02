const mongoose = require('mongoose');
const schema = mongoose.Schema;

const areaSchema= new mongoose.Schema({
 Town : String,
 County: String,
 Country: String
},{timestamps: true}
);

mongoose.exports = Area= mongoose.model("Area", areaSchema);
