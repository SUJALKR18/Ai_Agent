const userModel = require("../models/user_model");
const { createUser , getAll } = require("../services/user_Services");
const { validationResult } = require("express-validator");
const redisClient = require("../services/redis_services");

module.exports.registerUser = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
    return res.status(409).json({ error: "Email already registered" });
    }
    const user = await createUser(email, password);
    if (!user) {
    return res.status(500).json({ error: "Failed to create user" });
    }
    const token = user.generateJWT();
    res.cookie("token", token);
    const safe_user = {
        email : user.email,
        _id : user._id,
        __v : user.__v
    };
    res.status(201).json({ message: "User created successfully", user : safe_user, token : token});
  } 
  catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.loginUser = async function(req ,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;
    
    try {
        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
        return res.status(404).json({ error: "User not found" });
        }
    
        const isValidPassword = await user.isValidPassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid password" });
        }
        const safe_user = {
            email: user.email,
            _id: user._id,
            __v: user.__v,
        };
        const token = user.generateJWT();
        res.cookie("token", token);
        res.status(200).json({ message: "Login successful", user : safe_user , token });
    } 
    catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports.profileController = async function(req ,res){
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "Profile fetched successfully", user});
    } 
    catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports.logoutUser = async (req ,res) => {
    try{
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        redisClient.set(token , 'logout' , 'EX' , 60 * 60 * 24);

        res.status(200).json(
            { message: "Logged out successfully" }
        );
    }
    catch(err){
        console.error("Error logging out:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports.getAllUser = async (req ,res) => {
    try{
       const loggedUser = await userModel.findOne({email : req.user.email});
       const allUsers = await getAll(loggedUser._id);
       return res.status(200).json({users : allUsers});
    }
    catch(err){
        console.log(err);
        res.status(400).json({ error: err.message });
    }
}