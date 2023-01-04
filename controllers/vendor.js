const express = require("express");
const slugify = require("slugify");
const router = express.Router();
const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const { body, validationResult } = require("express-validator");

const Vendor = mongoose.model("Vendor");
const User = mongoose.model("User");

exports.createvendor = async (req, res) => {
  try {
    const {
      userId,
      vendorInfoId,
      description,
      category,
      subcategories,
      pricetype,
      price,
      images,
    } = req.body;
    console.log("In the request body server:", req.body);
    //   req.body.slug = slugify(req.body.category);
    const newvendor = await new Vendor({
      userId,
      vendorInfoId,
      description,
      category,
      subcategories,
      pricetype,
      price,
      images,
    }).save();
    res.json(newvendor);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
};

exports.listvendors = async (req, res) => {
  try {
    console.log("IN list all vendors", req);
    const vendors = await Vendor.find({})
      .populate("userId")
      .populate("vendorInfoId")
      .populate("category")
      .populate("subcategories")
      .sort([["createdAt", "desc"]])
      .exec();
    if (!vendors) {
      return res.status(400).send("No vendors data was found !!!!");
    }
    res.json(vendors);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Server error while fetching vendors: ${err.message}`);
  }
};

//list vendors by count
exports.listvendorscount = async (req, res) => {
  console.log("Req from vendor list count", req.body);
  try {
    const vendors = await Vendor.find({})
      .limit(parseInt(req.params.count))
      .populate("vendorInfoId")
      .populate("category")
      .populate("subcategories")
      .exec();
    res.json(vendors);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error fetching vendors by count:${err.message}`);
  }
};

exports.list = async (req, res) => {
  try {
    console.log("Req from vendor list", req.body);
    const { order, page } = req.body;
    const currentPage = page || 1;
    const vendorsPerPage = 3;
    const vendors = await Vendor.find({})
      .skip((currentPage - 1) * vendorsPerPage)
      .populate("userId")
      .populate("vendorInfoId")
      .populate("category")
      .populate("subcategories")
      .sort([[order]])
      .limit(vendorsPerPage)
      .exec();
    if (!vendors) {
      return res.status(400).send("No vendors data was found !!!!");
    }
    res.json(vendors);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Server error while fetching vendors: ${err.message}`);
  }
};

exports.listvendorsuser = async (req, res) => {
  console.log("Request values from vendor list user", req.params);
  try {
    const vendorsusers = await Vendor.find({ userId: req.params.userid })
      .populate("userId")
      .populate("vendorInfoId")
      .populate("category")
      .populate("subcategories")
      .sort([["createdAt", "desc"]])
      .exec();
    console.log("Vendor USERS", vendorsusers);
    if (!vendorsusers) {
      return res.json("No vendors");
    }
    return res.json(vendorsusers);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error while fetching vendors for user");
  }
};

exports.getvendor = async (req, res) => {
  console.log("Req parameters from getvendor", req.params.id);
  try {
    const vendor = await Vendor.findOne({ _id: req.params.id })
      .populate("userId")
      .populate("vendorInfoId")
      .populate("category")
      .populate("subcategories")
      .exec();

    if (!vendor) {
      return res.status(400).send("No vendor categories data was found !!!!");
    }
    res.json(vendor);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error while fetching vendor categories");
  }
};

//delete one record based on id
exports.removevendor = async (req, res) => {
  console.log("In vendor cat delete");
  try {
    console.log("Req params", req.params);
    const vendor = await Vendor.findOneAndDelete({ _id: req.params.id }).exec();
    console.log("vendor from backend", vendor);
    res.status(200).send("Vendor Category deleted successfully!!!!");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Vendor Category delete failed !!!!");
  }
};

exports.updatevendor = async (req, res) => {
  console.log("From edit vendor cat", req.params);
  try {
    const vendor = await Vendor.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(vendor);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err: err.message });
  }
};

exports.vendorcount = async (req, res) => {
  try {
    const total = await Vendor.find({}).estimatedDocumentCount().exec();
    console.log("Total", total);
    return res.json(total);
  } catch (err) {
    console.log(err);
  }
};

//allow user to add star rating for the ventor
exports.vendorRating = async (req, res) => {
  const vendor = await Vendor.findById({ _id: req.params.id }).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  let { star, review } = req.body;
  console.log("vendor value from req body", req.body);
  //check if the user has already left a rating for this vendor
  let existingRatingObject = vendor.ratings.find(
    (e) => e.postedBy.toString() === user._id.toString()
  );
  if (star == null) star = existingRatingObject ? existingRatingObject.star : 0;
  if (review == null)
    review = existingRatingObject ? existingRatingObject.review : "";
  console.log("Existing rating", existingRatingObject);
  // if user has not left any rating on this vendor, add the rating otherwise update the rating
  if (existingRatingObject === undefined) {
    let newRating = await Vendor.findByIdAndUpdate(
      { _id: vendor._id },
      {
        $push: { ratings: { star: star, review: review, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("New Rating", newRating);
    res.json(newRating);
  } else {
    let updatedRating = await Vendor.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star, "ratings.$.review": review } },
      { new: true }
    ).exec();
    console.log("Updated rating", updatedRating);
    res.json(updatedRating);
  }
};

// exports.vendorReview = async (req, res) => {
//   const vendor = await Vendor.findById({ _id: req.params.id }).exec();
//   const user = await User.findOne({ email: req.user.email }).exec();
//   const { review } = req.body;
//   console.log("vendor value from req body", req.body);
//   //check if the user has already left a rating for this vendor
//   let existingRatingObject = vendor.ratings.find(
//     (e) => e.postedBy.toString() === user._id.toString()
//   );
//   console.log("Existing rating", existingRatingObject);
//   // if user has not left any rating on this vendor, add the rating otherwise update the rating
//   if (existingRatingObject === undefined) {
//     let newRating = await Vendor.findByIdAndUpdate(
//       { _id: vendor._id },
//       {
//         $push: { ratings: { review: review, postedBy: user._id } },
//       },
//       { new: true }
//     ).exec();
//     console.log("New Rating", newRating);
//     res.json(newRating);
//   } else {
//     let updatedRating = await Vendor.updateOne(
//       {
//         ratings: { $elemMatch: existingRatingObject },
//       },
//       { $set: { "ratings.$.review": review } },
//       { new: true }
//     ).exec();
//     console.log("Updated rating", updatedRating);
//     res.json(updatedRating);
//   }
// };

//get all related vendors for the current vendor
exports.listrelatedvendors = async (req, res) => {
  const vendor = await Vendor.findById(req.params.id).exec();
  console.log(vendor);
  const related = await Vendor.find({
    _id: { $ne: vendor._id },
    category: vendor.category,
  })
    .limit(3)
    .populate("category")
    .populate("subcategories")
    .populate("postedBy")
    .exec();

  res.json(related);
};

//controller for search filters

//handle query to search by text
const handleQuery = async (req, res, query) => {
  const vendors = await Vendor.find({ $text: { $search: query } })
    .populate("vendorInfoId")
    .populate("category")
    .populate("subcategories")
    .populate("PostedBy")
    .exec();
  res.json(vendors);
};
//handle query for search by rating
const handleStars = (req, res, stars) => {
  Vendor.aggregate([
    {
      $project: {
        document: "$$ROOT",
        floorAverage: {
          $floor: { $avg: "$ratings.star" },
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) {
        console.log("Aggregate Error:", err);
      }
      Vendor.find({ _id: aggregates })
        .populate("vendorInfoId")
        .populate("category")
        .populate("subcategories")
        .populate("PostedBy")
        .exec((err, vendors) => {
          if (err) console.log("Vendor Aggregation error", err);
          res.json(vendors);
        });
    });
};

//handle filter for search by subcategory
const handleSub = async (req, res, sub) => {
  const vendors = await Vendor.find({ subcategories: sub })
    .populate("vendorInfoId")
    .populate("category")
    .populate("subcategories")
    .populate("PostedBy")
    .exec();
  res.json(vendors);
};

exports.searchfilters = async (req, res) => {
  const { query, price, category, stars, sub } = req.body;
  var qry = {};
  console.log(req.body);
  if (query) {
    qry.$text = { $search: query };
  }
  if (price) {
    qry.price = {
      $gte: price[0],
      $lte: price[1],
    };
  }
  if (category && category.length > 0) {
    var cats = [];
    category.forEach((e) => {
      cats.push(new ObjectID(e));
    });
    qry.category = { $in: cats };
  }
  // if (stars) {
  //    qry.ratings =
  //    {
  //       $elemMatch:
  //       {
  //          star: { $eq: stars }
  //       }
  //    }
  // }
  if (sub) {
    qry.subcategories = { $in: [sub] };
  }

  try {
    if (stars && stars.length > 0) {
      Vendor.aggregate([
        {
          $project: {
            document: "$$ROOT",
            floorAverage: {
              $floor: { $avg: "$ratings.star" },
            },
          },
        },
        { $match: { floorAverage: { $in: stars } } },
      ]).exec((err, aggregates) => {
        if (err) {
          console.log("Aggregate Error:", err);
        }
        qry._id = aggregates;
        console.log(qry);
        Vendor.find(qry)
          .populate("vendorInfoId")
          .populate("category")
          .populate("subcategories")
          .populate("PostedBy")
          .exec((err, vendors) => {
            if (err) console.log("Vendor Aggregation error", err);
            res.json(vendors);
          });
      });
    } else {
      console.log(qry);
      const vendors = await Vendor.find(qry)
        .populate("vendorInfoId")
        .populate("category")
        .populate("subcategories")
        .populate("PostedBy")
        .exec();
      res.json(vendors);
    }
  } catch (err) {
    console.log(err);
  }
};
