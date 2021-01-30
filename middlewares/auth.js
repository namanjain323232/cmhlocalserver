const mongoose = require("mongoose");

const User = mongoose.model("User");
const admin =  require("../firebase");

exports.authCheck = async (req,res,next) => {
    
    try {
       const firebaseUser= await admin.auth()
                                      .verifyIdToken(req.headers.authtoken);
        req.user= firebaseUser;   
        console.log(req.user);
        next();
    }
    catch (err) {
       console.log(err);
       res.status(401).json(
           { err: 'Invalid or expired token'}
       );
    }
}

exports.adminCheck = async (req,res,next) => {

    const {email} = req.user;

    const adminUser = await User.findOne( {email}).exec();

    if (adminUser.role !== 'admin') {
        res.status(403).json( {
            err: "Admin access only.Access Denied. !!!"
     }) 
    } else {
            next();
        }
    }





