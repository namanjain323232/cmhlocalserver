const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require('body-parser');
const authRoutes = require("./routes/authRoutes");
require("./models/Users");
require("./models/Categories");
require("./models/Subcategories");
require("./models/Vendors");
require("./models/VendorCategories");
require("./models/Questions");
const passportConfig=  require("./services/passport");
const keys = require("./config/keys");

const app = express();
const cors = require('cors');
app.use(cors())
app.use(
 cookieSession({
   maxAge: 30 * 24 * 60 * 60 * 1000,
   keys: [keys.cookieKey]
 })
);
app.use(bodyParser.json()); // To receive and send requests and responses in JSON format
app.use(bodyParser.urlencoded({ extended: true })); // Allow all primitive types of JSON. If extended:false, only string and arrays will be allowed.
 app.use(passport.initialize());
 app.use(passport.session());

 require("./routes/authRoutes")(app);
 require("./routes/vendorRoutes")(app);
 require("./routes/categoryRoutes")(app);
 require("./routes/subcategoryRoutes")(app);
 require("./routes/utilRoutes")(app);
 require("./routes/questionRoutes")(app);

mongoose.connect(keys.MONGOURI,
  {  useNewUrlParser: true,
  useUnifiedTopology: true });

// authRoutes(app);

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log('app listening at port ',PORT));
