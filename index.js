const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const config = require("config");
const passport = require("passport");
const bodyParser = require('body-parser');
const authRoutes = require("./routes/api/authRoutes");
const keys = require("./config/keys");

require("./models/User");
require("./models/Categories");
require("./models/Subcategories");
require("./models/Vendors");
require("./models/VendorCategories");
require("./models/Questions");
require("./models/SubcategoryQuestions");
const passportConfig=  require("./services/passport");

const app = express();
const cors = require('cors');
app.use(cors());
app.use(
 cookieSession({
   maxAge: 30 * 24 * 60 * 60 * 1000,
   keys: [keys.cookieKey]
 })
);
app.use(bodyParser.json({ extended: true})); // To receive and send requests and responses in JSON format
app.use(bodyParser.urlencoded({ extended: true })); // Allow all primitive types of JSON. If extended:false, only string and arrays will be allowed.
 app.use(passport.initialize());
 app.use(passport.session());

 app.use("/api/user", require("./routes/api/userRoutes"));
 app.use("/api/auth",require("./routes/api/authRoutes")); 
 app.use("/api/category",require("./routes/api/categoryRoutes"));
 app.use("/api/subcategory",require("./routes/api/subcategoryRoutes"));
 app.use("/api/util",require("./routes/api/utilRoutes"));
 app.use("/api/questions",require("./routes/api/questionRoutes"));
 app.use("/api/subcatquestions",require("./routes/api/subcatQuestionsRoute"));
 app.use("/api/vendor",require("./routes/api/vendorRoutes"));


mongoose.connect(keys.MONGOURI,
  {  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex : true});



const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log('app listening at port ',PORT));
