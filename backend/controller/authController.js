const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.login = async (req,res)=>{

const {email,password} = req.body;

const user = await User.findOne({email,password});

if(!user){
return res.status(401).json({message:"Invalid login"});
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

};