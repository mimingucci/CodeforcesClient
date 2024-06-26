const { default: mongoose } = require("mongoose");
const Problem = require("../models/problem");

const save = async (data) => {
  const problem = new Problem({
    title: data.title,
    statement: data.statement,
    author: mongoose.Types.ObjectId(data.author),
    timelimit: data.timelimit,
    memorylimit: data.memorylimit,
    testcases: [...data.testcases],
  });
  const rs = await problem.save();
  return rs;
};

const getById = async (id) => {
  const problem = await Problem.findOne({ _id: id }).populate({
    path: "tags",
    model: "Tag",
    select: "name",
  });
  return problem;
};

const getTestCases = async (id) => {
  const problem = await Problem.findOne({ _id: id })
    .populate({ path: "author", model: "User", select: "username rating" })
    .populate({ path: "submissions", model: "Submission" })
    .populate({ path: "tags", model: "Tag", select: "name" });
  return problem;
};

const getByAuthor = async (author) => {
  const problems = await Problem.find({ author }).populate({
    path: "tags",
    model: "Tag",
    select: "name",
  });
  return problems;
};

const getByTag = async (tag) => {
  const problems = await Problem.find({ tags: { $in: [tag] } }).populate({
    path: "tags",
    model: "Tag",
    select: "name",
  });
  return problems;
};

const getAll = async () => {
  const problems = await Problem.find().populate({
    path: "tags",
    model: "Tag",
    select: "name",
  });
  return problems;
};

const update = async (id, data) => {
  const problem = await Problem.findByIdAndUpdate(id, data, {
    new: true,
  }).populate({ path: "tags", model: "Tag", select: "name" });
  return problem;
};

const deleteById = async (id) => {
  const rs = await Problem.findByIdAndDelete(id);
  return rs ? true : false;
};

module.exports = {
  save,
  getById,
  getByAuthor,
  getByTag,
  deleteById,
  update,
  getAll,
  getTestCases,
};
