const admin =  require("../firebase");

exports.authCheck = async (req,res,next) => {
    //  console.log("Request Header",req.headers);
    //  next();
    try {
       const firebaseUser= await admin.auth()
                                      .verifyIdToken(req.headers.authtoken);
        req.user= firebaseUser;
        console.log("USER DETAILS:",req.user);
        next();
    }
    catch (err) {
       console.log(err);
       res.status(401).json(
           { err: 'Invalid or expired token'}
       );
    }
}


