const express = require("express");
const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const { usercart, 
        getusercart, 
        emptycart, 
        saveaddress,
        createorder,
        orders
 } = require("../controllers/user");

// routes
router.post("/cart", authCheck, usercart);
router.get("/cart", authCheck, getusercart );
router.delete("/cart", authCheck, emptycart);
router.post("/address", authCheck, saveaddress);
router.post("/order", authCheck, createorder);
router.get("/order", authCheck, orders);

module.exports = router;