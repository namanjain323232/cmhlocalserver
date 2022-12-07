const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  createsubcatquestions,
  readsubcatquestions,
  updatesubcatquestions,
  removesubcatquestions,
  listsubcatquestions
} = require("../controllers/subcatQuestions");

// routes
// router.post("/subcategory", authCheck, adminCheck, createsubcatquestions);
router.get("/subcatquestions", listsubcatquestions);
// router.get("/subcategory/:slug", readsubcatquestions);
// router.put("/subcategory/:slug", authCheck, adminCheck, updatesubcatquestions);
// router.delete("/subcategory/:slug", authCheck, adminCheck, removesubcatquestions);

module.exports = router;
