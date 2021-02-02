const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  createsubcategory,
  readsubcategory,
  updatesubcategory,
  removesubcategory,
  listsubcategories
} = require("../controllers/subcategory");

// routes
router.post("/subcategory", authCheck, adminCheck, createsubcategory);
router.get("/subcategories", listsubcategories);
router.get("/subcategory/:slug", readsubcategory);
router.put("/subcategory/:slug", authCheck, adminCheck, updatesubcategory);
router.delete("/subcategory/:slug", authCheck, adminCheck, removesubcategory);

module.exports = router;
