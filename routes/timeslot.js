const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  createslot,
  listslots,
  readslot,
  editslot,
  removeslot,
  listBlockedSlots,
} = require("../controllers/timeslot");

// routes
router.post("/timeslot", authCheck, adminCheck, createslot);
router.get("/timeslots", listslots);
router.get("/blockedtimeslots/:vendorid", listBlockedSlots);
router.get("/timeslot/:_id", readslot);
router.put("/timeslot/:_id", authCheck, adminCheck, editslot);
router.delete("/timeslot/:_id", authCheck, adminCheck, removeslot);

module.exports = router;
