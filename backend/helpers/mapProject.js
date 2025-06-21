const mongoose = require("mongoose");

module.exports = function (project) {
  return {
    id: project.id,
    name: post.name,
    description: post.description,
    tag: post.tag,
  };
};
