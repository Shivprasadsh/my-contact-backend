const asynHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt  = require("jsonwebtoken")
const User = require("../models/usermodel")

//Register a user
//route POST/ api/user/register
//acess pulbic

const registerUser = asynHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username||!email||!password){
       res.status(400);
       throw new Error("All feild are mandatory") 
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400);
        throw new Error("user already register ")
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed password",hashedPassword)
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    });
    console.log(`User created ${user}`)
    if(user){
        res.status(201).json({_id:user.id,email:user.email})
    }else{
        res.status(400)
        throw new Error("user data is not vald")
    }




    
    res.json({message:"Register the user"})
})

//Login a user
//route POST/ api/user/login
//acess pulbic

const loginUser = asynHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email||!password){
        res.status(400)
        throw new Error ("All feikd are madatory")
    }
    const user  = await User.findOne({email})
    //compare password withh hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

         res.status(200).json({ accessToken });
    }else{

    res.status(401)
    throw new Error("email or password is not valid")
    }
});


//current
//route get/ api/user/current
//acess private

const currentUser = asynHandler(async(req,res)=>{
    res.json(req.user)
})

module.exports ={registerUser,loginUser,currentUser}