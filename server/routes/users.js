const express = require("express")
const userRouter = express.Router();
const { enrollUser } = require("../controllers/user");

userRouter.post("/", enrollUser);
module.exports = userRouter ;