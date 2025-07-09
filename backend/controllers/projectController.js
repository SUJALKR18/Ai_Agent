const projectModel = require("../models/project_model");
const {
  createProject,
  getAllProjectsByUserId,addUsers
} = require("../services/project_services");
const { validationResult } = require("express-validator");
const userModel = require("../models/user_model");

module.exports.ProjectController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const email = req.user.email;

  if (!name) {
    return res.status(400).json({ error: "Project name is required" });
  }
  if (!email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const project = await createProject(name, user._id);
    if (!project) {
      return res.status(500).json({ error: "Failed to create project" });
    }
    res.status(201).json({ message: "Project cretaed successfully", project });
  } catch (err) {
    console.error("Error creating project:", err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports.getAllProjects = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    const allUserProjects = await getAllProjectsByUserId(user._id);
    return res.status(201).json({ projects: allUserProjects });
  } 
  catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.addUserToProject = async (req ,res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(401).json({errors : errors.array()});
  }

  try{
    const {users , projectId} = req.body;
    const loggedUser = await userModel.findOne({email : req.user.email});
    const project = await addUsers(projectId, users, loggedUser._id);
    return res.status(200).json({project})
  }
  catch(err){
    console.log(err);
    res.status(400).json({error : err.message});
  }
}