const mongoose = require('mongoose');
const schema = mongoose.Schema;

const timeslotSchema= new mongoose.Schema({
 startSlot: { type: String, required:true},
 endSlot: {type: String, required:true}  
},
{timestamps: true}
);

mongoose.exports= Timeslot = mongoose.model("Timeslot", timeslotSchema);