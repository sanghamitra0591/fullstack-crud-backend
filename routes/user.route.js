const express= require("express");

const userRouter= express.Router();

const jwt= require("jsonwebtoken");

const bcrypt= require("bcrypt");
const { UserModel } = require("../models/User.model");

userRouter.use(express.json());

userRouter.post("/register", async(req, res)=>{
    const {name, email, password}= req.body;
    try {
        bcrypt.hash(password, +(process.env.saltRounds), async(err, hash)=>{
            if(err){
                console.log(err);
                res.send({"ERROR": "Unable to Register the user"});
            }else{
                const newdata= new UserModel({name, email, password:hash});
                await newdata.save();
                res.send(`Registered user having email id as ${email}, pass:${password}, hash:${hash}`);
            }
        })
    } catch (error) {
        console.log(error);
        res.send({"ERROR": "Unable to Register the user"});
    }
})

userRouter.post("/login", async(req, res)=>{
    const {email, password}= req.body;
    try {
        const user= await UserModel.find({email});
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result)=>{
                if(result){
                    const token= jwt.sign({userId: user[0]._id}, process.env.key);
                    res.send({"msg" : "Login Successful", "token" : token});
                }else{
                    res.send({"ERROR": "Wrong Credentials3"});
                }
            })
        }else{
            res.send({"ERROR": "Wrong Credentials3"});
        }
    } catch (error) {
        console.log(error);
        res.send({"ERROR": "Wrong Credentials3"});
    }
})



module.exports= {
    userRouter
}