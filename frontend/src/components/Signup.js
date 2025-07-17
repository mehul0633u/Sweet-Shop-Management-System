import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup=()=>{
    const [username,setuserName]=React.useState("");
    const [email,setEmail]=React.useState("");
    const [password,setPassword]=React.useState("");
    const navigate=useNavigate();

    
        useEffect(()=>{
            const auth = localStorage.getItem("user");
            if(auth){
                navigate('/')
            }
        })

    const collectdata= async (e)=>{
        e.preventDefault();
        // console.log(name,email,password);
        const result=await fetch("http://localhost:5002/register",{
            method:"post",
            body:JSON.stringify({username,email,password}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data=await result.json();
        console.log(data);
        localStorage.setItem("user",JSON.stringify(data));
        if(data){
            alert("Signup Successful");
            navigate("/");
    }
    }
    return(
        <div className="signup">
            <h1>Signup</h1>
            <form>
                <input className="inputbox" type="text" value={username}
                 onChange={(e)=>setuserName(e.target.value)} placeholder="UserName" required/>

                <input className="inputbox" type="email" value={email} 
                onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required/>

                <input className="inputbox" type="password" value={password} 
                onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required/> <br></br>

                <button onClick={collectdata} className="signup-button" type="submit">Signup</button>
            </form>
        </div>
    )
}

export default Signup;