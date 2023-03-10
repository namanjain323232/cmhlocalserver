const express = require("express");
const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const {
  usercart,
  getusercart,
  emptycart,
  saveaddress,
  orders,
  contact,
  getquerieslist,
  markasread,
  markascomplete,
  markascancel,
  vendorMarkedCancel,
} = require("../controllers/user");

// routes
router.post("/cart", authCheck, usercart);
router.get("/cart", authCheck, getusercart);
router.delete("/cart", authCheck, emptycart);
router.post("/address", authCheck, saveaddress);
router.get("/order", authCheck, orders);

router.put("/markascomplete/:id", authCheck, markascomplete);
router.put("/order/cancel/:id", authCheck, markascancel);
router.put("/order/vendorcancel/:id/:reason", authCheck, vendorMarkedCancel);

router.get("/querieslist", getquerieslist);
router.put("/markasread/:id", markasread);
router.post("/contact", contact);

module.exports = router;
