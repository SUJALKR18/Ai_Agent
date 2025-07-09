const router = require("express").Router();
const { body } = require("express-validator");
const {
  ProjectController,
  getAllProjects,
  addUserToProject,
} = require("../controllers/projectController");
const { isLoggedin } = require("../middlewares/isLoggedin");

router.post(
  "/create",
  isLoggedin,
  body("name").isString().withMessage("Project name is required"),
  ProjectController
);

router.get("/all", isLoggedin, 
getAllProjects);

router.put(
    "/add_user",
    isLoggedin,
    body("projectId")
        .isString()
        .withMessage("Project ID must be a string"),
    body("users")
        .isArray({ min: 1 })
        .withMessage("Users must be a non-empty array")
        .bail()
        .custom((arr) => arr.every((u) => typeof u === "string"))
        .withMessage("Each user must be a string"),
    addUserToProject
);

module.exports = router;
