import { apiCadastro } from "../api/apiCadastro";
import { useState } from "react";
export function CadastroPage({ setPage }) {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async () => {
    setErro("");
    if (password1 !== password2) {
      setErro("Senhas diferentes");
      return;
    }
    try {
      await apiCadastro(username, password1);
      alert("Cadastro feito.");
      setPage("dashboard");
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="form-card">
      <h1 className="form-title">Cadastro</h1>
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
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
      />
      <input
        className="form-input"
        type="password"
        placeholder="Confirmar Password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />
      <button className="form-button" onClick={handleSubmit}>Cadastrar</button>
      {erro && <p className="form-erro">{erro}</p>}
    </div>
  );
}