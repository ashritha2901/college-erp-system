const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.login = async (req,res)=>{

const {email,password} = req.body;

try{

const user = await User.findOne({
  email: email.trim()
});

if(!user){
return res.status(401).json({message:"User not found"});
}

// simple password check
const isMatch = password === user.password;

if(!isMatch){
return res.status(401).json({message:"Invalid password"});
}

const token = jwt.sign(
{email:user.email, role:user.role},
"SECRETKEY",
{expiresIn:"1h"}
);

res.json({
token,
email:user.email,
role:user.role
});

}catch(err){

console.log(err);
res.status(500).json({message:"Server error"});

}

};