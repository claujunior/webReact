import { fetchAnimes } from "../api/apiAnimes";
import { useState, useEffect, useCallback } from "react";
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



export function Dashboard({ setPage, setId }) {
  const [animes, setAnimes] = useState([]);
  const [page, setPage1] = useState(1);
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

  const irPrev = () => { if (page > 1) setPage1((p) => p - 1); };
  const irNext = () => setPage1((p) => p + 1);

  return (
    <main className="main">
      <h1 className="section-title">Animes recentes:</h1>
      {loading ? (
        <p style={{ color: "var(--text-secondary)", padding: "2rem" }}>Carregando...</p>
      ) : (
        <div className="animes-grid">
         
          {animes.map((anime) => (
            <button
                key={anime.node.id}
                className="anime-link"
                onClick={() => {
                  setId(anime.node.id)
                  setPage("anime")
                }}
              >
            <AnimeCard anime={anime} />
            </button>
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