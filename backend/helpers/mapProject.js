module.exports = function mapProject(project) {
  if (!project) return null;
  
  return {
    id: project._id.toString(),
    userId: project.userId,
    name: project.name,
    description: project.description,
    tag: project.tag,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
};
