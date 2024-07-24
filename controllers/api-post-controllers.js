const Post = require("../models/post.js");
const handleError = (res, error) => {
  res.status(500).send(error.message);
};
const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};
const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json(req.params.id))
    .catch((error) => handleError(res, error));
};
const getPosts = (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => handleError(res, error));
};
const addPost = (req, res) => {
  const { author, text, title } = req.body;
  Post({ author, text, title })
    .save()
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};
const editPost = (req, res) => {
  const { author, text, title } = req.body;
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { author, text, title })
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};
module.exports = {
  getPost,
  deletePost,
  getPosts,
  addPost,
  editPost,
};
