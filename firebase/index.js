
var admin = require("firebase-admin");

var serviceAccount = require("../common/config/firebaseServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports= admin;


