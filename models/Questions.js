const mongoose = require("mongoose");
const schema= mongoose.Schema;

//create new question schema
const questionSchema = new schema( {
    question: {
        type: String,
        required: true },
    options: {
        type: [String],
        required: true
    } 
});

mongoose.exports= Question= mongoose.model("Question",questionSchema );

