const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contactSchema = new Schema({
  name: { required: true, type: String },
  link: { required: true, type: String },
});
const Contact = mongoose.model("Contact", contactSchema, "contacts");
module.exports = Contact;
