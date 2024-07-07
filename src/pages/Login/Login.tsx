import React, { useState } from "react";
import axiosInstance from "../../services/api";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }: { setToken: (token: string) => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/login", {
        username,
        passwordHash: password,
      });
      setToken(response.data.token);
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Login;
