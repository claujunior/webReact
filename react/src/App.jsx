import { useState } from "react";
import './App.css'
import { CadastroPage } from "./components/cadastro.jsx";
import { LoginPage } from "./components/login.jsx";
import { Navbar } from "./components/navbar.jsx";
import { Dashboard } from "./components/dashboard.jsx";
import { AnimeView } from "./components/anime.jsx";

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [idPage, setIdPage] = useState({ page: "dashboard", id: 0 });
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPage("login");
  };



  const renderPage = () => {
    switch (idPage.page) {
      case "login":
        return <LoginPage setIdPage={setIdPage} setToken={setToken} />;
      case "cadastro":
        return <CadastroPage setIdPage={setIdPage} />;
      case "anime":
        return <AnimeView id={idPage.id}/>;
      default:
        return <Dashboard setIdPage={setIdPage} />;
    }
  };

  return (
    <>
      <Navbar
        setIdPage={setIdPage}
        token={token}
        onLogout={handleLogout}
      />
      {renderPage()}
    </>
  );
}