const passport = require("passport");

exports.create_or_update_user= (req,res) => 
{
   res.json({ data: 'You have hit the create_or_update_user endpoint'});
};

exports.google=
      passport.authenticate("google", {
          scope: ["profile","email"]
      });

exports.facebook=
      passport.authenticate("facebook", {
          scope: ["email", "user_location", "user_link"]
      });

exports.logout= (req,res) =>
{
    req.logout();
    res.send(req.user);
};

exports.current_user= (req,res) =>
{
  res.send(req.user);
};