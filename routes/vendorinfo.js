const express = require("express");
const router = express.Router();

// middlewares
const { adminCheck, authCheck } = require("../middlewares/auth");

// controller
const {
  createvendorinfo,
  readvendorinfo,
  updatevendorinfo,
  listvendorsinfo,
  deletevendorinfo
} = require("../controllers/vendorInfo");

// routes
router.post("/vendorinfo", authCheck, createvendorinfo);
router.get("/vendorinfo", listvendorsinfo);
router.get("/vendorInfo/:email", readvendorinfo);
router.put("/vendorInfo/:email", authCheck, updatevendorinfo);

module.exports = router;
