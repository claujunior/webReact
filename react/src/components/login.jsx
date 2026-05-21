import { apiLogin } from "../api/apiLogin";
import { useState } from "react";
export function LoginPage({ setPage, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async () => {
    setErro("");
    try {
      const data = await apiLogin(username, password);
      localStorage.setItem("token", data.access_token);
      setToken(data.access_token);
      setPage("dashboard");
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="form-card">
      <h1 className="form-title">Login</h1>
      <input
        className="form-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="form-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="form-button" onClick={handleSubmit}>Entrar</button>
      {erro && <p className="form-erro">{erro}</p>}
    </div>
  );
}