import { useState, useEffect, useCallback } from "react";
import './App.css'
import { apiLogin, apiCadastro, fetchAnimes, searchAnimes } from "./api.js";

function Navbar({ setPage, token, onLogout, searchResults, onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearchInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  return (
    <header className="navbar">
      <div className="logo">
        <span className="logo-red">Ani</span>lib
      </div>

      <nav className="menu">
        <a onClick={() => setPage("dashboard")}>Animes</a>
        <a onClick={() => setPage("filmes")}>Filmes</a>
        <a onClick={() => setPage("pedir")}>Pedir Anime</a>
        {!token && <a onClick={() => setPage("login")}>Login</a>}
        {!token && <a onClick={() => setPage("cadastro")}>Cadastro</a>}
        {token && <a onClick={onLogout}>Logout</a>}
      </nav>

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearchInput}
        />
        {searchResults.length > 0 && query.length > 2 && (
          <div className="results">
            {searchResults.map((anime) => (
              <div key={anime.node.id} className="anime-item">
                <img
                  src={anime.node.main_picture?.medium}
                  alt={anime.node.title}
                />
                <h3>{anime.node.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}


function LoginPage({ setPage, setToken }) {
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



function CadastroPage({ setPage }) {
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



function AnimeCard({ anime }) {
  return (
    <div className="card">
      <img
        src={anime.node.main_picture?.medium}
        alt={anime.node.title}
      />
      <h3>{anime.node.title}</h3>
    </div>
  );
}



function Dashboard() {
  const [animes, setAnimes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const carregarAnimes = useCallback(async (p) => {
    setLoading(true);
    try {
      const data = await fetchAnimes(p);
      setAnimes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarAnimes(page);
  }, [page, carregarAnimes]);

  const irPrev = () => { if (page > 1) setPage((p) => p - 1); };
  const irNext = () => setPage((p) => p + 1);

  return (
    <main className="main">
      <h1 className="section-title">Animes recentes:</h1>
      {loading ? (
        <p style={{ color: "var(--text-secondary)", padding: "2rem" }}>Carregando...</p>
      ) : (
        <div className="animes-grid">
          {animes.map((anime) => (
            <AnimeCard key={anime.node.id} anime={anime} />
          ))}
        </div>
      )}
      <div className="paginacao">
        <button className="pageBtn" onClick={irPrev} disabled={page === 1}>
          Anterior
        </button>
        <button className="pageBtn" onClick={irNext}>
          Próxima
        </button>
      </div>
    </main>
  );
}



export default function App() {
  const [page, setPage] = useState("dashboard");
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [searchResults, setSearchResults] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPage("login");
  };

  const handleSearch = useCallback(async (query) => {
    if (query.length > 2) {
      try {
        const data = await searchAnimes(query);
        setSearchResults(data);
      } catch (err) {
        console.error(err);
      }
    } else {
      setSearchResults([]);
    }
  }, []);

  const renderPage = () => {
    switch (page) {
      case "login":
        return <LoginPage setPage={setPage} setToken={setToken} />;
      case "cadastro":
        return <CadastroPage setPage={setPage} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Navbar
        setPage={setPage}
        token={token}
        onLogout={handleLogout}
        searchResults={searchResults}
        onSearch={handleSearch}
      />
      {renderPage()}
    </>
  );
}