import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { Context } from "../../context/Context"
export default function Sidebar({about}) {
  const [cats, setCats] = useState([]);
  const { user, dispatch } = useContext(Context)
  const PF = "http://localhost:5000/images/"
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          style={{height:"300px",width:"200px"}}
          src={PF+user.profilePic}
          alt="Add profile pic"
        />
        <h1>{user.username}</h1>
        <p>
         {user.about}
        </p>
      </div>
      <div className="sidebarItem">
        
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
