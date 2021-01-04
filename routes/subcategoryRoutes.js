const mongoose = require("mongoose");

const Subcategory = mongoose.model("Subcategory");
const Category = mongoose.model("Category");

module.exports = (app) => {
   
 // add a new subcategory record
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

  //find all the subcategories records
  app.get("/api/subcategory", async (req,res) => {
     const query = Subcategory.find({});
     query.sort({category: 1} );
     query.exec ( (err,result) =>
     {
         if (err) {
             res.send(err);
         }
             res.send(result);
     }) 
    });

    //find one subcategory record by id 
    app.get("/api/subcategory/:id", async (req,res) => {
        Subcategory.findOne({_id: req.params.id}, (err,result) => {
            if (err) {
                res.send(err);                
            }
                res.send(result);
        })
    });

    //delete the selected subcategory record
    app.delete("/api/subcategory/:id", async(req,res) => {
        Subcategory.findByIdAndDelete({ _id: req.params.id}, (err,result) =>
        {
            if (err) {
                res.send(err);
            }
            res.send( {success:true, message: "Subcategory deleted successfully",result});
        })
    });



}
