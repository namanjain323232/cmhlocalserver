const mongoose = require("mongoose");
const schema = mongoose.Schema;

//create new contact schema
const contactSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
