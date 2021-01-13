const mongoose = require("mongoose");

const Subcategory = mongoose.model("Subcategory");
const Category = mongoose.model("Category");

module.exports = (app) => {
   
 // add a new subcategory record
 app.post("/api/subcategory", async (req,res) => 
{
   
    Category.findOne({name: req.body.category}, async (err,categoryval) =>
    {
        
       if (err) {
            res.send(err);
        }
        
     const  subcategory = new Subcategory (
            {name: req.body.name,
             category:categoryval}
     );   
        
       try {
           await subcategory.save();
           res.send({ success: true, message: "Subcategory saved successfully !!!!!"});
           return;
       } catch (error) {
           res.send(error);
           return;
       }
    })  
});

  //find all the subcategories records
  app.get("/api/subcategory", async (req,res) => {
     Subcategory.find(  (err, result) => {
    //  console.log("Values from query result", result);
    //  query.sort({category: 1} );
    //  query.exec ( (err,result) =>
     
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
      return;
    });

    app.patch("/api/subcategory/:id", async (req,res) => {

        Category.findOne({name: req.body.category}, async (err,categoryval) =>
        {          
        
        if (err) {
            res.send(err);
         }        
        if ( categoryval.name === req.body.category) {
        Subcategory.findByIdAndUpdate({ _id: req.params.id},
                                      { name: req.body.name,
                                        category: categoryval
                                        }, (error,result) => {
           if (error) {
               res.send(err);
           }
           res.send({ success: true, message: "Sub Category updated successfully!!!!"}); 
        })
      } else {
          res.send({success: false, message: "Category values not found"})
      }
    })
    return;
});

    //delete the selected subcategory record
    app.delete("/api/subcategory/:id", async(req,res) => {
        Subcategory.findByIdAndDelete({ _id: req.params.id}, (err,result) =>
        {
            if (err) {
                res.send(err);
            }
            res.send( {success:true, message: "Subcategory deleted successfully"});
        })
        return;
    });



}
