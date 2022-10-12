import "./register.css"
import axios from "axios"
export default function Register() {
  
  const submitHandler=async()=>{
    
    const data = await axios.post("http://localhost:5000/user/signup",{
      "firstName":"vishnu",
      "lastName":"ck",
      "email":"vishnuck464@gmail.com",
      "password":"qwerty",
      "confirmPassword":"qwerty"
  
  })




  }
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={submitHandler}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." />
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." />
        <button className="registerButton">Register</button>
      </form>
        <button className="registerLoginButton">Login</button>
    </div>
    )
}
