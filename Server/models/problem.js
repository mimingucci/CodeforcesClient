const mongoose = require("mongoose");

function noDuplicateElements(value) {
  return value.length === new Set(value).size; // Check if the array contains unique elements
}

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    statement: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tag",
      },
    ],
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    solution: {
      type: String,
      default: "",
    },
    timelimit: {
      type: Number,
      required: true,
    },
    memorylimit: {
      type: Number,
      required: true,
    },
    testcases: [
      {
        input: { type: String },
        output: { type: String },
      },
    ],
    rating: {
      type: Number,
      min: 500,
      max: 3500,
    },
    submissions: [{ type: mongoose.Types.ObjectId, ref: "Submission" }],
    score: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Problem", problemSchema);
