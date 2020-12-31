const mongoose = require("mongoose");

const Category = mongoose.model("Category");

module.exports = (app) => {

// get all the category names from the database
app.get("/api/categoryname", async (req,res) =>
{
 const categories =  Category.find ({}, {name:1, _id: false}, (err,categories) =>
 
  {
    console.log("Categories list", categories);
    if (err) {
      res.send(err);
    } 
      res.send(categories);
   }     
  )     
});
}