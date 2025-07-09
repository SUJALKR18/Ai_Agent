const projectModel = require("../models/project_model");
const mongoose = require('mongoose');

module.exports.createProject = async (name, userId) => {
  if (!name) {
    throw new Error("Project name is required");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }
  try {
    const existingProject = await projectModel.findOne({
      name: name.toLowerCase(),
    });
    if (existingProject) {
      throw new Error("Project with this name already exists");
    }
    const Project = await projectModel.create({
      name,
    });
    Project.users.push(userId);
    await Project.save();
    return Project;
  } catch (err) {
    console.error("Error creating project:", err);
    throw new Error("Internal server error");
  }
};

module.exports.getAllProjectsByUserId = async (userId) => {
  if (!userId) {
    throw new Error("UserId is required");
  }

  const allUserProjects = await projectModel.find({
    users: userId,
  });

  return allUserProjects;
};

module.exports.addUsers = async (projectId , users , userId) => {
  if(!projectId){
    throw new Error ("projectId is required");
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid projectId");
  }
  if(!users){
    throw new Error ("Users are required");
  }
  if (!Array.isArray(users) || users.some(user => !mongoose.Types.ObjectId.isValid(user))) {
    throw new Error("All users must be valid mongoose ObjectIds");
  }
  if(!userId){
    throw new Error("User Id is required");
  }
  if(!mongoose.Types.ObjectId.isValid(userId)){
    throw new Error("User Id must be a valid one");
  }

  try{
    const project = await projectModel.findOne({_id : projectId , users : userId});
    if(!(project)){
      throw new Error("User not belongs to project");
    }
    const updatedProject = await projectModel.findOneAndUpdate({
      _id : projectId},
      {
        $addToSet :{
          users:{
            $each : users
          }
        }
      },
      {new : true}
    )
    return updatedProject;
  }
  catch(err){
    console.log(err);
    throw new Error ("Internal server error");
  }
} 