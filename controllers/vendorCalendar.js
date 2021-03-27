const express = require("express");
const slugify = require("slugify");
const router = express.Router();
const mongoose = require("mongoose");
const {body, validationResult} = require('express-validator');

const VendorCal = mongoose.model("VendorCal");

exports.createvendorcal= async (req,res) => {
  try {
    const vendorcal= await new VendorCal(req.body).save();
    res.json(vendorcal);
  }
  catch (err) {
      console.log(err);
      res.status(400).json({err:err.message});
  }
}
