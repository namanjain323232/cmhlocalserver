const mongoose = require("mongoose");
const schema= mongoose.Schema;

//create new question schema
const questionSchema = new schema( {
    question: String,
    options: []
});

const Question= mongoose.model("Question",questionSchema );

