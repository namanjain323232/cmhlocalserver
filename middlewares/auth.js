const mongoose = require("mongoose");

const User = mongoose.model("User");
const admin =  require("../firebase");

exports.authCheck = async (req,res,next) => {
    // console.log("authtoken from AUTHCHECK", req.headers.authtoken)
     try {
       console.log("From middleware",req.headers.authtoken);
       const firebaseUser= await admin.auth()
                                      .verifyIdToken(req.headers.authtoken);
        req.user= firebaseUser;     
        next();
    }
    catch (err) {
       console.log(err);
       res.status(401).json(
           { err: 'Invalid or expired token'}
       );
    }
}

exports.vendorCheck = async (req,res,next) => {

    const {email} = req.user;
    const vendorUser = await User.findOne( {email}).exec();

    if (vendorUser.role !== 'vendor') {
        res.status(403).json( {
            err: "Vendor access only.Access Denied. !!!"
     }) 
    } else {
            next();
        }
    }


exports.adminCheck = async (req,res,next) => {

    const {email} = req.user;
    const adminUser = await User.findOne( {email}).exec();

    if (adminUser.role !== 'admin') {
        res.status(403).json( {
            err: "Admin access only.Access Denied. !!!"
     }) ;
    } else {
            next();
        }
    }





