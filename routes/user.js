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
} = require("../controllers/user");

// routes
router.post("/cart", authCheck, usercart);
router.get("/cart", authCheck, getusercart);
router.delete("/cart", authCheck, emptycart);
router.post("/address", authCheck, saveaddress);
router.get("/order", authCheck, orders);

router.get("/querieslist", getquerieslist);
router.put("/markasread/:id", markasread);
router.put("/markascomplete/:id", markascomplete);
router.post("/contact", contact);

module.exports = router;
