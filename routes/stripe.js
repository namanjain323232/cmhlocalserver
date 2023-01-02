const express = require("express");
const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const { createconnectaccount,
        getaccountstatus,
        getaccountbalance,
        payoutsettings,
        createpaymentintent,
        stripesessionid,
        stripesuccessroute
      } = require("../controllers/stripe");

// routes
router.post("/create-connect-account", authCheck, createconnectaccount);
router.post("/get-account-status", authCheck, getaccountstatus);
router.post("/get-account-balance",authCheck, getaccountbalance);
router.post("/payout-settings",authCheck, payoutsettings);
router.post("/create-payment-intent", authCheck, createpaymentintent);
router.post("/stripe-session-id", authCheck, stripesessionid);
router.post("/stripesuccess", authCheck, stripesuccessroute);

module.exports = router;