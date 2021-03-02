const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { createUpdateUser, currentUser, adminUser } = require("../controllers/auth");

router.post("/createupdateuser", authCheck, createUpdateUser);
router.post("/currentuser", authCheck, currentUser);
router.post("/adminuser", authCheck, adminCheck, currentUser);

module.exports = router;