const Blog = require("../models/blog");
const {
  save,
  getAll,
  getByAuthor,
  getById,
  getByTag,
  deleteById,
  updateById,
  alreadyLike,
  alreadyDislike,
  like,
  dislike,
  addComment,
  deleteComment,
  addTag,
  deleteTag,
  deleteLike,
  deleteDislike,
} = require("../repositories/blog");

const blogExists = async (id) => {
  const blog = await getById(id);
  if (blog && blog?._id.toString() === id.toString()) {
    return true;
  } else {
    return false;
  }
};

const addCommentToBlog = async (blog, comment) => {
  return await addComment(blog, comment);
};

module.exports = { blogExists, addCommentToBlog };
