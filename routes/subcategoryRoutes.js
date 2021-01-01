const mongoose = require("mongoose");

const Subcategory = mongoose.model("Subcategory");
const Category = mongoose.model("Category");

module.exports = (app) => {
    
    app.post("/api/subcategory", async (req,res) => 
    {
   
    Category.findOne({name: req.body.category}, async (err,categoryval) =>
    {
        console.log("Category values before save", categoryval);    
       if (err) {
            res.send(err);
        }
        
     const  subcategory = new Subcategory (
            {name: req.body.subcategory,
             category:categoryval}
     );   
        
       try {
           await subcategory.save();
           res.send({ success: true, message: "Subcategory saved successfully !!!!!"});
       } catch (error) {
           res.send(error);
       }
    })  
});


  app.get("/api/subcategory", async (req,res) => {
     Category.find( (err,result) =>
     {
         if (err) {
             res.send(err);
         }
         console.log("subcategory result:",result);
         res.send(result);
     })

  })

}
