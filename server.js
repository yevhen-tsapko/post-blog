const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const Post = require("./models/post.js");
const Contact = require("./models/contact.js");
const db =
  "mongodb+srv://Yevhen-user:ZPLUyHUegDaLFvUj@cluster0.lbojy4u.mongodb.net/db_contacts";
mongoose
  .connect(db)
  .then((res) => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`listening port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use(express.static("styles"));

app.set("view engine", "ejs");

const PORT = 3000;

const createPath = (page) =>
  path.resolve(__dirname, "ejs-views", `${page}.ejs`);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  const title = "Home";
  res.render(createPath("index"), { title });
});

app.get("/contacts", (req, res) => {
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

app.get("/posts/:id", (req, res) => {
  const title = "Post";
  Post.findById(req.params.id)
    .then((post) => {
      res.render(createPath("post"), { title, post });
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

app.get("/posts", (req, res) => {
  const title = "Posts";

  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.render(createPath("posts"), { title, posts });
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

app.get("/add-post", (req, res) => {
  const title = "Add Post";
  res.render(createPath("add-post"), { title });
});
app.post("/add-post", (req, res) => {
  const { author, text, title } = req.body;
  const post = new Post({ author, text, title });
  post
    .save()
    .then(res.redirect("/posts"))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

app.use((req, res) => {
  const title = "Error Page";
  res.status(404).render(createPath("error"), { title });
});
