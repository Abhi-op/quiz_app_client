import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BACKEND;

const Login = (props) => {
  const [credential, setcredential] = useState({ email: "", password: "" });
  let Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${BASE_URL}/user/login`
    try {
      const email = credential.email;
      const password = credential.password;
      const response = await axios.post(url,{email,password} , { withCredentials: false });
      const authToken = response.data.resData.authToken;
      const userId = response.data.resData.userId;
  
      if (authToken) {
        localStorage.setItem('token', authToken);
        localStorage.setItem('user_id', userId);
        Navigate('/');
        alert('Logged in successfully');
      }
    } catch (error) {
      console.error(error);
      alert('Error in login');
    }
  };
  const onChange =(e)=>{
    setcredential({...credential, [e.target.name]: e.target.value})
  }
  return (
    <div class="container d-flex justify-content-center align-items-center">
    <div class="row" className="my-4 px-4 row mx-auto" style={{ maxWidth: "800px" }}>
        <div class="card">
          <div class="card-body">
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label htmlFor="email" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  name="email"
                  value={credential.email}
                  onChange={onChange}
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" class="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label htmlFor="password" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  value={credential.password}
                  onChange={onChange}
                  name="password"
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
    </div>
  </div>
   );
};

export default Login;