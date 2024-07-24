const express = require("express");
const router = express.Router();
const {
  getPost,
  deletePost,
  getPosts,
  addPost,
  editPost,
} = require("../controllers/api-post-controllers.js");

router.get("/api/posts/:id", getPost);
router.delete("/api/posts/:id", deletePost);
router.get("/api/posts", getPosts);
router.post("/api/add-post", addPost);
router.put("/api/edit/:id", editPost);
module.exports = router;
