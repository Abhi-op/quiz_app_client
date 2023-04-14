import React, {useState} from "react";
import jwt from 'jwt-decode'
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BACKEND;
const Signup = (props) => {
  const [credential, setcredential] = useState({ name:"", email: "", password: "", confirmpassword:"" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credential
    // console.log(credential);
    const url = `${BASE_URL}/user/createUser`
    try {
      const result = await axios.post(url, { name, email, password }, { withCredentials: false });
if (result.status === 200) {
  const authToken = result.data.resData.authToken;
  const userId = result.data.resData.userId;
  console.log("userId",userId);
  if (authToken) {
    localStorage.setItem('token', authToken);
    localStorage.setItem('user_id',userId );
    navigate('/login');
    alert('Account created successfully');
  }
}
    } catch (error) {
      console.log(error)
          alert(error)
    }
   
    
  };
  const onChange =(e)=>{
    setcredential({...credential, [e.target.name]: e.target.value})
  }
  return (
    <div className="container">
  <form onSubmit={handleSubmit} style={{padding: '20px'}}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">
        Name
      </label>
      <input 
        type="text" 
        className="form-control" 
        id="name"  
        name="name"
        onChange={onChange} 
        required
        style={{marginBottom: '10px'}}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">
        Email address
      </label>
      <input
        type="email"
        className="form-control"
        name="email"
        id="email"
        onChange={onChange}
        aria-describedby="emailHelp"
        style={{marginBottom: '10px'}}
      />
      <div id="emailHelp" className="form-text">
      </div>
    </div>
    <div className="mb-3">
      <label htmlFor="password" 
      className="form-label">
        Password
      </label>
      <input type="password"
      className="form-control" 
      id="password"
      name="password" 
      onChange={onChange} 
      minLength={5} 
      required
      style={{marginBottom: '10px'}}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="confirmpassword" 
      className="form-label">
        Confirm Password
      </label>
      <input
        type="password"
        className="form-control"
        id="confirmpassword" 
        name="confirmpassword"
        onChange={onChange} 
        minLength={5} 
        required
        style={{marginBottom: '10px'}}
      />
    </div>
    <button type="submit" className="btn btn-primary" style={{marginTop: '10px'}}>
      Submit
    </button>
  </form>
</div>

  );
};

export default Signup;
