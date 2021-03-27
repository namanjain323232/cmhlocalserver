const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorCalendarSchema= new mongoose.Schema ({

vendorInfoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'VendorInfo',
    required: true
 },
availability:
[ {start: Date,
  end:  Date
},
  {startSlot: Date,
   endSlot: Date}
]
} ,{timestamps: true}
)

 mongoose.exports= VendorCal = mongoose.model("VendorCal", vendorCalendarSchema);