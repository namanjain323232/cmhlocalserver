const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cartSchema= new mongoose.Schema({
  vendors: [
      {
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor'           
        },       
       count: Number,
       price: Number
    }
  ],
   cartTotal: Number,
   orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
   },
     timeslots:        
         [
         {_id: String,
          startSlot:String,
          endSlot:String      
         }        
         ],  
   bookingDate:Date
},{timestamps: true}
);

mongoose.exports = Cart= mongoose.model("Cart", cartSchema);
