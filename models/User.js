const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = new schema({
    email: {
        type:String,
        required: true,
        unique: true,
        index:true
    },
    role: {
        type: String,
        default: "vendor"
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
    }     
 },
 {timestamps: true}
 );

 // two arguments mean we are trying to load something into the model
 mongoose.exports = User = mongoose.model("User",userSchema);
