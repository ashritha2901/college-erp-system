const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req,res)=>{

const {email,password} = req.body;

try{

const user = await User.findOne({email});

if(!user){
return res.status(401).json({message:"User not found"});
}

// compare hashed password
const isMatch = await bcrypt.compare(password,user.password);

if(!isMatch){
return res.status(401).json({message:"Invalid password"});
}

// create JWT token
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