const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderSchema= new mongoose.Schema({
    vendors: [
        {
          vendor: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Vendor'           
          },       
         count: Number,
         price: Number
      },     
    ],
    session: {},
    paymentIntent: {},
    orderStatus: {
        type: String,
        default: "Not Processed",
        enum: [
            "Not Processed",
            "Processing",
            "Cancelled",
            "Completed"
         ]
    },
    orderedBy:{ type: mongoose.Schema.Types.ObjectId,
                ref: 'User' 
    } ,
    timeslots: 
     [ {type: mongoose.Schema.Types.ObjectId,
     ref:'Timeslot',
    required: true} 
    ],       
   bookingDate:String
   
}, {timestamp: true});


mongoose.exports = Order= mongoose.model("Order", orderSchema);