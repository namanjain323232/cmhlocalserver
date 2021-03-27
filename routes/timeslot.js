const express = require("express");
const router = express.Router();

// middlewares
const { authCheck,  adminCheck } = require("../middlewares/auth");

// controller
const {
  createslot  
} = require("../controllers/timeslot");

// routes
router.post("/timeslot", authCheck,adminCheck, createslot);

module.exports = router;