const express = require("express");
const router = express.Router();

// middlewares
const { adminCheck, authCheck } = require("../middlewares/auth");

// controller
const {
  createvendorcal,
  listvendorcal,
  listvendorcalven,
  readvendorcal,
  currentvendorcal,
  listvendorcaldate,
  updatevendorcal,
  createbulkbooking,
  createbulkavail,
  getvendororders,
  //   removevendorinfo
} = require("../controllers/vendorCalendar");

// routes
router.get("/vendorcalendar/booking/:vendorid", getvendororders);
router.post("/vendorcalendar/:userid", authCheck, createvendorcal);
router.get("/vendorcalendar/:userid", listvendorcal);
router.get("/vendorcalendar/vendor/:vendorid", listvendorcalven);
router.get("/vendorcalendar/single/:id", readvendorcal);
router.get("/vendorcalendar/existing/:userid/:start", currentvendorcal);
router.get(
  "/vendorcalendar/vendor/date/:vendorid/:start/:end",
  listvendorcaldate
);
router.put("/vendorcalendar/:userid/:start", authCheck, updatevendorcal);

router.post("/vendorcalendar/bulkbook/:userid", authCheck, createbulkbooking);
router.post("/vendorcalendar/bulkavail/:userid", authCheck, createbulkavail);
// router.delete("/vendorinfo/:email", authCheck, adminCheck, removevendorinfo);

module.exports = router;
