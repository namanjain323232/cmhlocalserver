const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  createvendorInfo,
  readvendorInfo,
  updatevendorInfo,
  removevendorInfo,
  listvendorsInfo
} = require("../controllers/vendor");

// routes
router.post("/vendor", authCheck, createvendorInfo);
router.get("/vendors", listvendorsInfo);
// router.get("/vendor/:slug", readvendorInfo);
// router.put("/vendor/:slug", authCheck, adminCheck, updatevendorInfo);
// router.delete("/vendor/:slug", authCheck, adminCheck, removevendorInfo);

module.exports = router;
