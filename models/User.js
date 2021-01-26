const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    email: {
        type:String,
        unique: true,
        index:true
    },
    role: {
        type: String,
        default: "subscriber"
    },
    password: {
        type:String        
    },
    name: {
        type: String
    } ,
    googleId: String,
    facebookId: String,
    url: String,
    picture: {
        type: String
    }     
 },
 {timestamps: true}
 );

 // two arguments mean we are trying to load something into the model
 mongoose.exports = User = mongoose.model("User",userSchema);
