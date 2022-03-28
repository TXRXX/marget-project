import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/auth";
import { Nav } from "../../components";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const refreshCount = parseInt(sessionStorage.getItem("refreshCount"));
    if (refreshCount < 2) {
      sessionStorage.setItem('refreshCount', String(refreshCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('refreshCount');
    }
  }, []);

  const onLogin = async () => {
    try {
      await login(username, password);
      sessionStorage.setItem("refreshCount", 1);
      navigate("/");
    } catch (error) {
      setAlert(true);
    }
  };

  return (
    <div>
      <Nav />

      <div className="login-wrapper">
        <div className="login-container">
          {/* <label for="username">Username: </label> */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          {/* <label for="password">Password: </label> */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="signin-btn" onClick={onLogin}>
            SignIn
          </button>
          <span className="not-member">Not a member? <a href="/register" className="sign-up-text">Sign up</a></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
