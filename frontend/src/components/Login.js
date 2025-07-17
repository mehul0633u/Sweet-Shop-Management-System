import React from "react";
import { useNavigate } from "react-router-dom";

const Login =()=>{
    const [email,setEmail]=React.useState("");
    const [password,setPassword]=React.useState("");
    const navigate = useNavigate();
    React.useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth){
            navigate("/");
        }
    },[]);
    const handleLogin=async ()=>{
         
        // console.log(email,password);
         const result=await fetch("http://localhost:5002/login",{
            method:"post",
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await result.json();
        // console.log(data);
        if(data.result.username){
            localStorage.setItem("user",JSON.stringify(data));
            navigate("/");
        }
        else{
            alert("Please enter valid details");
        }
    }
    return(
        <div className="login">
            <h1>Login</h1>
            <input className="inputbox" onChange={(e)=>setEmail(e.target.value)} 
            value={email} type="text" placeholder="Enter Email" />
            <input className="inputbox" onChange={(e)=>setPassword(e.target.value)}
            value={password} type="password" placeholder="Enter Password" />
            <br></br>
            <button onClick={handleLogin} className="login-button" type="submit">Login</button>
        </div>
    )
}

export default Login;