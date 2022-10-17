import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState,useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import Swal from 'sweetalert2'


export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
   const [about,setAbout]=useState("")
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"
 


  useEffect(() => {
    
    if(user){
      setUsername(user.username)
      setEmail(user.email)
      setAbout(user.about)
    }
    else{
      window.location.replace("/login")
    }
  },[user]);
  const deleteHandler=()=>{
    console.log("deleted ........")
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/users/${user._id}`)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          ).then(()=>{
            localStorage.clear()
            window.location.replace("/login")
          })
          
        } catch (error) {
          localStorage.clear()
          window.location.replace("/login")
          
        }
       
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
      about
    };
  
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      window.location.reload()
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      

    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span  className="settingsUpdateTitle">Update Your Account</span>
          
        
        
        
           
          <button className="settingsDeleteTitle" onClick={deleteHandler}>
        Delete
          </button>
          
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
          value={username}
           name="username"
            type="text"
          
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
          value={email}
          name="email"
            type="email"
         
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>About me</label>
           <input
          name="about"
            type="text"
            
            placeholder="Say about you......."
            onChange={(e) => setAbout(e.target.value)}
          />
          <label>Password</label>
          <input
          name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
