const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  tag: {
    type: String,
    default: "",
  },
  created_at: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
