const mongoose = require("mongoose");

const Category = mongoose.model("Category");

module.exports = (app) => {

    app.post("/api/category", async (req,res) =>
    {
      const {
          name,
          imgURL } = req.body;

      const category = new Category ({
          name,
          imgURL
      });

      try {
        await category.save(); 
         return res.send({ success: true, message: "Category saved successfully!!!!"});               
      } catch (error) {
         return res.send(error);
      }

    });
    // get all the category records from the database
    app.get("/api/category", async (req,res) =>
    {
     await Category.find( (err, categories) =>
      {
       if (err) {
         return res.send(err);
       }
         return res.send(categories);
        })  
        
    });
    

    // get one category record based on id
    app.get("/api/category/:id/", async (req,res) =>
     {           
      await Category.findOne({_id: req.params.id}, (err,category) =>
       {
        if (err) {
            return res.send(err);
        }
           return  res.send(category);
       } );
     })
     

     //update one record based on id
     app.patch("/api/category/:id/", async (req,res) =>      
     {
      await Category.findByIdAndUpdate({_id:  req.params.id}, 
                                  {name: req.body.name,
                                  imgURL: req.body.imgURL }, (err,category) =>
       {
         if (err) {
           return res.send(err);           
         }
         return res.send({ success: true, message: "Category updated successfully!!!!"}); 
        })
     })


     //delete one record based on id
     app.delete("/api/category/:id", async (req,res) =>     
     {
      await Category.findByIdAndRemove( {_id: req.params.id}, (err, category) =>
       {
         if (err) {
              return  res.json(err);
         }
          return res.json({ success: true, message: "Category deleted successfully",category});          
       })
     })

    }








