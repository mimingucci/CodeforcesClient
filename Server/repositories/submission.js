const Submission = require("../models/submission");

const save = async (data) => {
  const submit = new Submission({
    author: data.author,
    code: data.code,
    language: data.language,
    problem: data.problem,
  });
  const rs = await submit.save();
  return rs;
};

const update = async (id, data) => {
  const rs = await Submission.findByIdAndUpdate(id, data);
  return rs;
};

const getById = async (id) => {
  const rs = await Submission.findById(id);
  return rs;
};

const getByAuthor = async (author) => {
  const rs = await Submission.find({ author });
  return rs;
};

const getByProblem = async (problem) => {
  const rs = await Submission.find({ problem });
  return rs;
};

module.exports = {
  save,
  update,
  getById,
  getByAuthor,
  getByProblem,
};