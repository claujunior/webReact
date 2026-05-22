import { useState } from "react";
import './App.css'
import { CadastroPage } from "./components/cadastro.jsx";
import { LoginPage } from "./components/login.jsx";
import { Navbar } from "./components/navbar.jsx";
import { Dashboard } from "./components/dashboard.jsx";
import { AnimeView } from "./components/anime.jsx";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [id,setId] = useState(0)
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPage("login");
  };



  const renderPage = () => {
    switch (page) {
      case "login":
        return <LoginPage setPage={setPage} setToken={setToken} />;
      case "cadastro":
        return <CadastroPage setPage={setPage} />;
      case "anime":
        return <AnimeView id={id}/>;
      default:
        return <Dashboard setPage={setPage} setId={setId}/>;
    }
  };

  return (
    <>
      <Navbar
        setPage={setPage}
        token={token}
        onLogout={handleLogout}
        setId={setId}
      />
      {renderPage()}
    </>
  );
}