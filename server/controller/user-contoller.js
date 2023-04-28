const bcrypt = require('bcrypt');
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
        const userId = await User.create(fname, lname, email, hashedPassword);
        return res.status(201).json({ userId });
    } catch (err) {
        return next(err);
    }

}

const logIn = async(req,res,next) => {

    const { email, password } = req.body

    try{
        await User.findByEmailAndPassword(email,password)
        const token = User.generateAuthToken(email)
        return res.status(201).json({ token:token });
    }catch (err){
        return next(err);
    }
}


module.exports = {signUp ,logIn};