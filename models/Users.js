const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    email: String,
    password: String,
    name: String,
    googleId: String,
    facebookId: String,
    url: String,
    photo: String
 });

 // two arguments mean we are trying to load something into the model
 const User = mongoose.model("User",userSchema);
