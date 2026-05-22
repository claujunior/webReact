import { searchAnimes } from "../api/apiAnimes";
import { useState, useEffect, useCallback } from "react";
export function Navbar({ setIdPage, token, onLogout }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
  useEffect(() => {
    handleSearch(query); // dispara toda vez que query mudar
  }, [query]);

  const handleSearchInput = (e) => {
    setQuery(e.target.value); // só isso, sem chamar handleSearch
  };

  return (
    <header className="navbar">
      <div className="logo">
        <span className="logo-red">Ani</span>lib
      </div>

      <nav className="menu">
        <a onClick={() => setIdPage({ page: "dashboard", id: 0 })}>Animes</a>
        <a onClick={() => setIdPage({ page: "dashboard", id: 0 })}>Filmes</a>
        <a onClick={() => setIdPage({ page: "dashboard", id: 0 })}>Pedir Anime</a>
        {!token && <a onClick={() => setIdPage({ page: "login", id: 0 })}>Login</a>}
        {!token && <a onClick={() => setIdPage({ page: "cadastro", id: 0 })}>Cadastro</a>}
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
              <button
               key={anime.node.id}
                className="anime-link"
                onClick={() => {
                  setIdPage({ page: "anime", id: anime.node.id })
                }}
              >
                <div className="anime-item">
                  <img
                    src={anime.node.main_picture?.medium}
                    alt={anime.node.title}
                  />
                  <h3>{anime.node.title}</h3>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
