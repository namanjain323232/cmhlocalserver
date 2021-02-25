const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, vendorCheck } = require("../middlewares/auth");

// controller
const {
  createvendor,
  getvendor,
  updatevendor,
  removevendor,
  listvendors,
  listvendorsuser,
  list,
  vendorcount,
  vendorRating,
  listrelatedvendors
} = require("../controllers/vendor");

// routes
router.post("/vendor", authCheck, createvendor);
router.get("/vendors/total", vendorcount);
router.get("/vendors", listvendors);
router.get("/vendor/:id", getvendor);
router.get("/vendors/:userid", listvendorsuser);
router.put("/vendor/:id", authCheck, vendorCheck, updatevendor);
router.delete("/vendor/:id", authCheck, removevendor);

router.post("/vendors",list);

//route for star rating
router.post("/vendor/rating/:id",authCheck, vendorRating );

//route for listing other related vendors in the area
router.get("/vendors/related/:id", listrelatedvendors);

module.exports = router;
