const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("../common/config/env.config");

//single argument means we are trying to get data from the model.
const User = mongoose.model("User");

passport.serializeUser( (user,done) => {
    done(null,user.id);
});

passport.deserializeUser( (id, done) => {
  User.findById(id).then( user => {
      done(null, user)
  });
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
},
 async (accessToken,refreshToken,profile,done) => {
  const existingUser= await User.findOne({googleId: profile.id})
        if (existingUser) {
            done(null, existingUser);
        } else {
         const user=   await new User({googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value}).save()
                 done(null,user);
               }
    }
));

passport.use(new FacebookStrategy({
    clientID: keys.facebookAppID,
    clientSecret: keys.facebookAppSecret,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id','emails', 'first_name', 'last_name', 'displayName', 'link', 'photos' ]
 },
  async (accessToken, user_location, user_link,done) => {
    const existingUser= await User.findOne({facebookId: user_link.id})
        if(existingUser) {
            done(null, existingUser);
        } else {
       const user=   await  new User({facebookId: user_link.id,
                name: user_link.displayName,
                email: user_link.emails[0].value,
                url: user_link.profileUrl,
                photo: user_link.photos[0].value}).save()
                 done(null, user)
              }
 }
 ));
