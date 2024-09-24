import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN = { name: "admin", pass: "admin" };

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("username:", username);
    console.log("password:", password);

    if (username === ADMIN.name && password === ADMIN.pass) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      navigate("/dashboard");
    } else {
      alert("Incorrect username or password. Please try again.");
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="login-page">
      <div>
        <h1 style={{ margin: 0 }}>Login</h1>
        <form style={{ marginTop: "1rem" }} onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
