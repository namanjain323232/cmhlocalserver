const express = require("express");
const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const { createconnectaccount,
        getaccountstatus} = require("../controllers/stripe");

// routes
router.post("/create-connect-account", authCheck, createconnectaccount);
router.post("/get-account-status", authCheck, getaccountstatus);

module.exports = router;