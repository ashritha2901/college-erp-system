import React,{useState} from "react";
import "./Login.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = () => {

const navigate = useNavigate()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [error,setError] = useState("")

const handleLogin = async () => {

try{

const res = await axios.post("http://localhost:5000/login",{
email,
password
})

console.log("LOGIN RESPONSE:", res.data)   // 👈 add this

localStorage.setItem("token", res.data.token);
localStorage.setItem("role", res.data.role);
localStorage.setItem("email", res.data.email);

const role = res.data.role.toLowerCase()

if(role === "admin") navigate("/dashboard")
else if(role === "student") navigate("/student")
else if(role === "faculty") navigate("/faculty")

}catch(err){

setError("Invalid email or password")

}

}

return(

<div className="login-container">

<div className="login-card">

<h2>🎓 College ERP</h2>

{error && <p className="error">{error}</p>}

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={handleLogin}>Login</button>

<p
className="forgot"
onClick={()=>alert("Reset link sent to email!")}
>
Forgot Password?
</p>

</div>

</div>

)

}

export default Login