const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const config = require("config");
const passport = require("passport");
const morgan= require("morgan");
const bodyParser = require('body-parser');
const fs= require("fs");
const keys = require("./config/keys");

require('dotenv').config();

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
 app.use(morgan("dev"));
 app.use(bodyParser.json({ extended: true})); // To receive and send requests and responses in JSON format
 app.use(bodyParser.urlencoded({ extended: true })); // Allow all primitive types of JSON. If extended:false, only string and arrays will be allowed.
 app.use(passport.initialize());
 app.use(passport.session());

//  fs.readdirSync("./routes/api")
//           .map((r) => app.use("/api/"+r,require("./routes/api/"+r)));

 app.use("/api/auth",require("./routes/api/auth")); 
 app.use("/api/category",require("./routes/api/category"));
 app.use("/api/subcategory",require("./routes/api/subcategory"));
 app.use("/api/util",require("./routes/api/util"));
 app.use("/api/questions",require("./routes/api/questions"));
 app.use("/api/subcatQuestions",require("./routes/api/subcatQuestions"));
 app.use("/api/vendor",require("./routes/api/vendor"));


mongoose.connect(keys.MONGOURI,
  {  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex : true,
  useFindAndModify: false}
  ).then( () => console.log("Database Connection Successful !!!!"))
  .catch( (err) => console.log("Database Connection Error !!!!",err));



const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log('app listening at port ',PORT));
