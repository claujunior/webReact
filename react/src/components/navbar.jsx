import { searchAnimes } from "../api/apiAnimes";
import { useState, useEffect, useCallback } from "react";
export function Navbar({ setPage, token, onLogout}) {
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
