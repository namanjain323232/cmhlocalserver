const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  createvendor,
  readvendor,
  updatevendor,
  removevendor,
  listvendor
} = require("../controllers/vendor");

// routes
router.post("/vendor", authCheck, createvendor);
// router.get("/vendors", listvendor);
// router.get("/vendor/:slug", readvendor);
// router.put("/vendor/:slug", authCheck, adminCheck, updatevendor);
// router.delete("/vendor/:slug", authCheck, adminCheck, removevendor);

module.exports = router;
