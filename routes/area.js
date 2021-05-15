const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  addarea,
  listareas,
  listcities,
  listcounties
} = require("../controllers/area");

console.log("In the area routes");
// routes
router.get("/areas", authCheck, adminCheck, addarea);
router.get("/areas/list", listareas);
router.get("/areas/listcities",listcities);
router.get("/areas/listcounties/:city",listcounties);


module.exports = router;
