const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');



const signUp = async(req,res,next) =>{

    const {fname, lname, email, password } = req.body;

    try {
        // const existingUser = await User.findByUsername(username);
        // if (existingUser) {
        // return res.status(409).json({ error: 'Username already exists' });
        // }

        // const existingEmail = await User.findByEmail(email);
        // if (existingEmail) {
        // return res.status(409).json({ error: 'Email already exists' });
        // }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create(fname, lname, email, hashedPassword);
        // if(!user){
        //     return res.status(401).json({ message:"email already exists" });
        // }

        return res.status(201).json({ message:"sign up successfully" });

    } catch (err) {
        // return next(err)
        return res.status(401).json({ message:"email already exists" })
    }

}

const logIn = async(req,res,next) => {

    const { email, password } = req.body

    try{

        const user = await User.findByEmailAndPassword(email,password)

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
          }

        const token = await User.generateAuthToken(email)
        return res.status(201).json({ token:token});

    }catch (err){
        return next(err);
    }
}

const logOut = async(req,res,next) =>{
    req.session.destroy();
    return res.redirect('/');
}
const getProducts = async(req,res,next)=>{
    
}

module.exports = {signUp ,logIn,logOut};