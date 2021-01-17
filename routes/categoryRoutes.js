const mongoose = require("mongoose");

const Category = mongoose.model("Category");

module.exports = (app) => {

   app.post("/api/category", async (req,res) =>
   {
      try {
      const {name, imgURL } = req.body;
      const category = await new Category ({name,imgURL}).save();      
      res.json(category);
        //  return res.send({ success: true, message: "Category saved successfully!!!!"});               
      } catch (err) {
         res.status(400).send("Failed to save category");
      }
    });

    // get all the category records from the database
    app.get("/api/category", async (req,res) =>
    {
     res.json(await (Category.find({}).sort({name: 1})).exec())      
    });
    

    // get one category record based on id
    app.get("/api/category/:id/", async (req,res) =>
     {           
      let category = await Category.findOne({_id: req.params.id}).exec();       
     })
     

     //update one record based on id
     app.put("/api/category/:id/", async (req,res) =>      
     {
      try {
        const {name, imgURL } = req.body;
        const category=  await Category.findByIdAndUpdate({_id:  req.params.id},{name,imgURL });
        res.json(category);
      } catch (err)   {
           res.status(400).send("Failed to update category");           
         }        
     });

     //delete one record based on id
     app.delete("/api/category/:id", async (req,res) =>     
     {
      try {
      const category = await Category.findByIdAndDelete( {_id: req.params.id});
      res.json({ success: true, message: "Category deleted successfully",category});          
       }
       catch (err) {
          res.status(400).send("Category delete failed !!!!");
       }
     });

    }








