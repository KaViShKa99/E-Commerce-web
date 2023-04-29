const express = require("express")
const userRouter = express.Router();
const {signUp ,logIn ,logOut } = require("../controller/user-contoller");
const {userSignUpValidationRules,userSignInValidationRules,validateSignup,validateSignin} = require('../config/validator')
const middleware = require('../middleware/middleware')



userRouter.post("/login",[userSignInValidationRules(),validateSignin],logIn)
userRouter.post("/signup",[userSignUpValidationRules(),validateSignup],signUp)
// userRouter.post("/signup",[middle1ware.isNotLoggedIn,userSignUpValidationRules(),validateSignup],signUp)
userRouter.get("/logout",logOut)


module.exports = userRouter;
