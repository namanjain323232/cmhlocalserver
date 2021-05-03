const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorCalendarSchema= new mongoose.Schema ({

userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
 },
 vendorId: {
   type: mongoose.Schema.Types.ObjectId,
   ref:'Vendor',
   required: true
 },
 vendorInfoId: {
  type: mongoose.Schema.Types.ObjectId,
  ref:'VendorInfo',
  required: true
 },
availability:
[ {start: Date,   
  timeslots: 
   [ {type: mongoose.Schema.Types.ObjectId,
     ref:'Timeslot',
    required: true} 
   ]
  }
]
} ,{timestamps: true}
)

 mongoose.exports= VendorCal = mongoose.model("VendorCal", vendorCalendarSchema);