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
} = require("../controllers/user");

// routes
router.post("/cart", authCheck, usercart);
router.get("/cart", authCheck, getusercart);
router.delete("/cart", authCheck, emptycart);
router.post("/address", authCheck, saveaddress);
router.get("/order", authCheck, orders);
router.post("/contact", contact);

module.exports = router;
