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
// router.post("/question", authCheck, adminCheck, createquestion);
router.get("/questions", listquestions);
// router.get("/question/:slug", readquestion);
// router.put("/question/:slug", authCheck, adminCheck, updatequestion);
// router.delete("/question/:slug", authCheck, adminCheck, removequestion);

module.exports = router;
