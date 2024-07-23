const express = require("express");
const router = express.Router();
const Contact = require("../models/contact.js");
const createPath = require("../helpers/createPath.js");

router.get("/contacts", (req, res) => {
  const title = "Contacts";
  Contact.find()
    .then((contacts) => {
      console.log("contacts", contacts[0]);
      res.render(createPath("contacts"), { contacts, title });
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});
module.exports = router;
