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
  removevendorinfo
} = require("../controllers/vendorInfo");

// routes
router.post("/vendorinfo", authCheck, createvendorinfo);
router.get("/vendorinfo", listvendorsinfo);
router.get("/vendorInfo/:email", readvendorinfo);
router.put("/vendorInfo/:email", authCheck, updatevendorinfo);
router.delete("/vendorinfo/:email", authCheck, adminCheck, removevendorinfo);

module.exports = router;
