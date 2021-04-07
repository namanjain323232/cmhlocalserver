const express = require("express");
const router = express.Router();

// middlewares
const { adminCheck, authCheck } = require("../middlewares/auth");

// controller
const {
  createvendorcal,
  listvendorcal,
//   updatevendorinfo,
//   listvendorsinfo,
//   removevendorinfo,
//   getvendorinfobyid
} = require("../controllers/vendorCalendar");

// routes
router.post("/vendorcalendar/:id", authCheck, createvendorcal);
router.get("/vendorcalendar/:id", listvendorcal);
// router.get("/vendorInfo/:email", readvendorinfo);
// router.get("/vendorInfo/:id", getvendorinfobyid);
// router.put("/vendorInfo/:email", authCheck, updatevendorinfo);
// router.delete("/vendorinfo/:email", authCheck, adminCheck, removevendorinfo);

module.exports = router;