const Post = require("../models/post.js");
const createPath = require("../helpers/createPath.js");
const handleError = (res, error) => {
  console.log(error);
  res.render(createPath("error"), { title: "Error" });
};
const getPost = (req, res) => {
  const title = "Post";
  Post.findById(req.params.id)
    .then((post) => {
      res.render(createPath("post"), { title, post });
    })
    .catch((error) => handleError(res, error));
};
const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => handleError(res, error));
};
const getPosts = (req, res) => {
  const title = "Posts";

  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.render(createPath("posts"), { title, posts });
    })
    .catch((error) => handleError(res, error));
};
const getAddPost = (req, res) => {
  const title = "Add Post";
  res.render(createPath("add-post"), { title });
};
const addPost = (req, res) => {
  const { author, text, title } = req.body;
  // const post = new Post({ author, text, title });
  // post
  Post({ author, text, title })
    .save()
    .then(res.redirect("/posts"))
    .catch((error) => handleError(res, error));
};
const getEditPost = (req, res) => {
  const title = "Edit Post";
  Post.findById(req.params.id)
    .then((post) => {
      res.render(createPath("edit-post"), { title, post });
    })
    .catch((error) => handleError(res, error));
};
const editPost = (req, res) => {
  const { author, text, title } = req.body;
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { author, text, title })
    .then(res.redirect(`/posts/${id}`))
    .catch((error) => handleError(res, error));
};
module.exports = {
  getPost,
  deletePost,
  getPosts,
  getAddPost,
  addPost,
  getEditPost,
  editPost,
};
