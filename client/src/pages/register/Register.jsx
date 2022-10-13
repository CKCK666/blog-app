import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [userName, setUsername] = useState("");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
   
      event.preventDefault();
    
   
    setError("");
    try {
     if (userName.length<6) {
      setError("Username must be 6 character!!!")
     }
     else if (password !== confirmPassword) {
      setError("Password not match!!!")
     }
     else if(password.length<8){
      setError("Password must be 8 character!!!!!!")
     }
      else {
      
      const {data} = await axios.post("auth/signup", {
        userName,
       
        email,
        password,
        
      });
      
      if(data.message){setError(data.message)}
      else{
        window.location.replace("/login")
      }
      
      
     }
     ;
      
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      {error && <span style={{color:"red", marginTop:"10px",fontSize:"20px"}}>{error}</span>}
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your firstname..."
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        

        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
          required
        />
          <label>Confirm Password</label>
         <input
          type="password"
          className="registerInput"
          placeholder="Enter your confirm password ..."
          onChange={(e) => setconfirmPassword(e.target.value)}
          required
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      
    </div>
  );
}
