const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const createPath = require("./helpers/createPath.js");
const methodOverride = require("method-override");
require("dotenv").config();
const db =
  "mongodb+srv://Yevhen-user:ZPLUyHUegDaLFvUj@cluster0.lbojy4u.mongodb.net/db_contacts";
const postRouters = require("./routes/post-routes");
const postApiRouters = require("./routes/api-post-routes");
const contactRouters = require("./routes/contact-routes");
const PORT = 3000;

mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`listening port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use(express.static("styles"));
app.set("view engine", "ejs");

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(methodOverride("_method"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  const title = "Home";
  res.render(createPath("index"), { title });
});
app.use(contactRouters);
app.use(postRouters);
app.use(postApiRouters);

app.use((req, res) => {
  const title = "Error Page";
  res.status(404).render(createPath("error"), { title });
});
