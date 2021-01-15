const mongoose = require("mongoose");

const Subcategory = mongoose.model("Subcategory");
const Category = mongoose.model("Category");

module.exports = (app) => {
   
 // add a new subcategory record
 app.post("/api/subcategory", async (req,res) => 
{
   
   await Category.findOne({name: req.body.category}, async (err,categoryval) =>
    {
        
       if (err) {
          return  res.send(err);
        }
        
     const  subcategory = new Subcategory (
            {name: req.body.name,
             category:categoryval}
     );   
        
       try {
           await subcategory.save();
           return res.send({ success: true, message: "Subcategory saved successfully !!!!!"});           
       } catch (error) {
          return res.send(error);           
       }
    })  
});

  //find all the subcategories records
  app.get("/api/subcategory", async (req,res) => {
    await Subcategory.find( {}, (err,result) => {
    //  console.log("Values from query result", result);
    //  query.sort({category: 1} );
    //  query.exec ( (err,result) =>
     
         if (err) {
            return res.send(err);
         }
            return res.send(result);
     }).sort({category : 1}) 
    });

    //find one subcategory record by id 
    app.get("/api/subcategory/:id", async (req,res) => {
       await Subcategory.findOne({_id: req.params.id}, (err,result) => {
            if (err) {
               return res.send(err);                
            }
               return res.send(result);
        })     
    });

    app.patch("/api/subcategory/:id", async (req,res) => {

      await Category.findOne({name: req.body.category}, async (err,categoryval) =>
        {          
        
        if (err) {
           return res.send(err);
         }     
         console.log("categoryval from subcat edit", categoryval) ;
         console.log("req body from subcat edit", req.body) ;
        if ( categoryval.name === req.body.category) {
        await Subcategory.findByIdAndUpdate({ _id: req.params.id},
                                      { name: req.body.name,
                                        category: categoryval
                                        }, (error,result) => {
           if (error) {
              return res.send(err);
           }
         return res.send({ success: true, message: "Sub Category updated successfully!!!!"}); 
        })
      } else {
        return  res.send({success: false, message: "Category values not found"});          
      }
    })
    
});

    //delete the selected subcategory record
    app.delete("/api/subcategory/:id", async(req,res) => {
      await  Subcategory.findByIdAndDelete({ _id: req.params.id}, (err,result) =>
        {
            if (err) {
              return  res.send(err);
            }
            return res.send( {success:true, message: "Subcategory deleted successfully"});
        })        
    });

}
