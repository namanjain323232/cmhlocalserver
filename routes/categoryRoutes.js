const mongoose = require("mongoose");

const Category = mongoose.model("Category");

module.exports = (app) => {

    app.post("/api/category", async (req,res) =>
    {
      console.log("In category request body:",req.body);

      const {
          name,
          imgURL } = req.body;

      const category = new Category ({
          name,
          imgURL
      });

      try {
        await category.save(); 
        res.send({ success: true, message: "Category saved successfully!!!!"});          
      } catch (error) {
          res.send(error);
      }

    });
    // get all the category records from the database
    app.get("/api/category", async (req,res) =>
    {
      Category.find( (err, categories) =>
      {
        console.log("Categories list", categories);
        if (err) {
          res.send(err);
        }
          res.send(categories);
      })     
    });
    

    // get one category record based on id
    app.get("/api/category/:id/", async (req,res) =>
     {           
       Category.findOne({_id: req.params.id}, (err,category) =>
       {
        if (err) {
          console.log("Error found",err);
          res.send(err);
        }
         console.log("from record success",category);
        res.send(category);
       } );
     })
     

     //update one record based on id
     app.patch("/api/category/:id/", async (req,res) =>      
     {
      console.log("from update api call", req.params);  
       Category.findByIdAndUpdate({_id:  req.params.id}, 
                                  {name: req.params.name,
                                  imgURL: req.params.imgURL }, (err,category) =>
       {
         if (err) {
           console.log("From error of record update", err);
           res.json(err);
         }
         console.log("from record success of edit",category);
         res.json({ success: true, message: "Category updated successfully!!!!"}); 
       })
     })


     //delete one record based on id
     app.delete("/api/category/:id", async (req,res) =>     
     {
       Category.findByIdAndRemove( {_id: req.params.id}, (err, category) =>
       {
         if (err) {
                res.send(err);
         }
          res.send({ success: true, message: "Category deleted successfully",category});          
       })
     })

    }








