const express = require("express")
const userRouter = express.Router();
const {signUp ,logIn } = require("../controller/user-contoller");

userRouter.post("/login",logIn)
userRouter.post("/signup",signUp)


module.exports = userRouter;
