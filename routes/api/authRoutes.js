const express = require("express");
const router = express.Router();
const passport = require("passport");
const {body, validationResult} = require('express-validator');


router.get("/google",
      passport.authenticate("google", {
          scope: ["profile","email"]
      })
);

router.get("/google/callback", passport.authenticate("google"));

router.get("/facebook",
      passport.authenticate("facebook", {
          scope: ["email", "user_location", "user_link"]
      })
);

router.get("/facebook/callback", passport.authenticate("facebook"));

router.get("/api/logout", (req,res) =>
{
    req.logout();
    res.send(req.user);
})

router.get("/api/current_user", (req,res) =>
{
  res.send(req.user);
});

module.exports = router;

