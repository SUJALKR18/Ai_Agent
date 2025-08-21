const userModel = require("../models/user_model");

module.exports.createUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const hashedPaassword = await userModel.hashPssword(password);
  try {
    const user = await userModel.create({
      email,
      password: hashedPaassword,
    });
    return user;
  } catch (err) {
    console.error("Error creating user:", err);
    throw new Error("Internal server error");
  }
};

module.exports.getAll = async (userId) => {
  try {
    const allUsers = await userModel.find();
    const requiredUsers = [];
    allUsers.forEach((user) => {
      if (!user._id.equals(userId)) {
        requiredUsers.push(user);
      }
    });
    return requiredUsers;
  } catch (err) {
    console.error(err);
    throw new Error("Internal server error");
  }
};
