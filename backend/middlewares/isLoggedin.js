const userModel = require('../models/user_model');
const jwt = require('jsonwebtoken');
const {logoutUser} = require('../controllers/userController');
const redisClient = require('../services/redis_services');

module.exports.isLoggedin = async (req ,res , next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token || token === undefined){
        res.status(401).json({error: "Unauthorized access"});
        return;
    }
     
    try{
        const isBlacklisted = await redisClient.get(token);
        if(isBlacklisted){
            res.cookie("token" , "");
            res.status(401).json({error: "Unauthorized access"});
            return;
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if(!verify){
            res.status(401).json({error: "Unauthorized access"});
            return;
        }
        const email = verify.email;
        const user = await userModel.findOne({email}).select("-password");

        if(!user){
            res.status(404).json({error: "User not found"});
            return;
        }
        req.user = verify;

        next();
    }
    catch(err){
        console.error("Error in isLoggedin middleware:", err);
        res.status(500).json({error: "Internal server error"});
    }
}