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
   [ {type: mongoose.Schema.Types.ObjectId,
     ref:'Timeslot',
    required: true} 
   ],       
   bookingDate:String
   
},{timestamps: true}
);

mongoose.exports = Cart= mongoose.model("Cart", cartSchema);
