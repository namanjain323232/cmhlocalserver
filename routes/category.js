const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  createcategory,
  readcategory,
  updatecategory,
  removecategory,
  listcategories,
  getsubcat
} = require("../controllers/category");

console.log("In the categoty routes");
// routes
router.post("/category", authCheck, adminCheck, createcategory);
router.get("/categories", listcategories);
router.get("/category/:slug", readcategory);
router.put("/category/:slug", authCheck, adminCheck, updatecategory);
router.delete("/category/:slug", authCheck, adminCheck, removecategory);
router.get("/category/subcat/:slug", getsubcat);

module.exports = router;
