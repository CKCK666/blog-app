import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import { LinkContainer } from "react-router-bootstrap";
import {NavDropdown } from "react-bootstrap";



export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"
  console.log(user)

  const handleLogout = () => {
  dispatch({ type: "LOGOUT" })
   
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/?cat=sport">
             Sports
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/?cat=entertainment">
           Entertainment
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/?cat=travel">
             Travel
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              Write a post
            </Link>
          </li>
          
          
            
         
      
         
         
         
          
         
        </ul>
      </div>
      <div className="topRight">
{user ? ( 
  user.profilePic?(
    <ul className="topList">
  <li className="topListItem">
        <Link  className="link" to="/settings">
        <img className="topImg" src={PF+user.profilePic} alt="" />
        </Link>
      
        </li>
  </ul>

  ):null

):null}
     

        {user ? (
    <ul className="topList">
   
  
       
        <li className="topListItem">
        <NavDropdown title={user.username} id="username">
        <NavDropdown.Item>
        <Link  className="link"  to="/settings">
    Profile
    
    </Link>
        </NavDropdown.Item>
  
       <NavDropdown.Item>
       <Link  className="link" onClick={handleLogout} >
      Logout
      </Link>
       </NavDropdown.Item>
     
    
    </NavDropdown>
        </li>    
       
    </ul>
         
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
           
          </ul>
        )}
       
          
        
       
      </div>
     
    </div>
  );
}
