const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  addarea,
  listareas
} = require("../controllers/area");

console.log("In the area routes");
// routes
router.get("/areas", authCheck, adminCheck, addarea);
router.get("/areas/list", listareas);


module.exports = router;
