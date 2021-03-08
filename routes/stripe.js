const express = require("express");
const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const { createconnectaccount} = require("../controllers/stripe");

// routes
router.post("/create-connect-account", authCheck, createconnectaccount);


module.exports = router;