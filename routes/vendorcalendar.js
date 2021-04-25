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
  listvendorcaldate,
  updatevendorcal,
//   removevendorinfo

} = require("../controllers/vendorCalendar");

// routes
router.post("/vendorcalendar/:userid", authCheck, createvendorcal);
router.get("/vendorcalendar/:userid", listvendorcal);
router.get("/vendorcalendar/vendor/:vendorid", listvendorcalven);
router.get("/vendorcalendar/single/:id", readvendorcal);
router.get("/vendorcalendar/vendor/date/:vendorid/:start/:end", listvendorcaldate)
router.put("/vendorcalendar/:userid", authCheck, updatevendorcal);

// router.delete("/vendorinfo/:email", authCheck, adminCheck, removevendorinfo);

module.exports = router;