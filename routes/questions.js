const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  createquestion,
  readquestion,
  updatequestion,
  removequestion,
  listquestions
} = require("../controllers/questions");

// routes
router.post("/question", authCheck, adminCheck, createquestion);
router.get("/questions", listquestions);
router.get("/question/:id", readquestion);
// router.put("/question/:slug", authCheck, adminCheck, updatequestion);
router.delete("/question/:id", authCheck, adminCheck, removequestion);

module.exports = router;
