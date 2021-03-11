const express = require("express");
const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const { createconnectaccount,
        getaccountstatus,
        getaccountbalance,
        payoutsettings
      } = require("../controllers/stripe");

// routes
router.post("/create-connect-account", authCheck, createconnectaccount);
router.post("/get-account-status", authCheck, getaccountstatus);
router.post("/get-account-balance",authCheck, getaccountbalance);
router.post("/payout-settings",authCheck, payoutsettings);

module.exports = router;