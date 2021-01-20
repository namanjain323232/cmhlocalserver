const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = new schema({
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true
    } ,
    googleId: String,
    facebookId: String,
    url: String,
    avatar: {
        type: String
    } ,
    date : {
        type: Date,
        default: Date.now
    }
 });

 // two arguments mean we are trying to load something into the model
 mongoose.exports = User = mongoose.model("User",userSchema);
