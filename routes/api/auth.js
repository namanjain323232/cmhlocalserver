const express = require("express");
const router = express.Router();
const passport = require("passport");
const {body, validationResult} = require('express-validator');
const { create_or_update_user,
        google,
        facebook,
        logout,
        current_user} = require("../../controllers/auth");

router.get("/create_or_update_user", create_or_update_user);

router.get("/google", google);   

router.get("/google/callback", passport.authenticate("google"));

router.get("/facebook", facebook);     

router.get("/facebook/callback", passport.authenticate("facebook"));

router.get("logout", logout);

router.get("current_user", current_user);

module.exports = router;

