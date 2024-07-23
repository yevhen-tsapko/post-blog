const express = require("express");
const path = require("path");
const router = express.Router();
const {
  getPost,
  deletePost,
  getPosts,
  getAddPost,
  addPost,
  getEditPost,
  editPost,
} = require("../controllers/post-controllers.js");
router.get("/posts/:id", getPost);
router.delete("/posts/:id", deletePost);

router.get("/posts", getPosts);

router.get("/add-post", getAddPost);
router.post("/add-post", addPost);

router.get("/edit/:id", getEditPost);
router.put("/edit/:id", editPost);
module.exports = router;
