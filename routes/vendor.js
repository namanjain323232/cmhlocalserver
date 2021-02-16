const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  createvendor,
  getvendor,
  updatevendor,
  removevendor,
  listvendors,
  listvendorsuser
} = require("../controllers/vendor");

// routes
router.post("/vendor", authCheck, createvendor);
router.get("/vendors", listvendors);
router.get("/vendor/:id", getvendor);
router.get("/vendors/:userid", listvendorsuser);
router.put("/vendor/:id", authCheck,  updatevendor);
router.delete("/vendor/:id", authCheck, removevendor);

module.exports = router;
