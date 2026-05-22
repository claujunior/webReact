import { searchId } from "../api/apiAnimes";
import { useState, useEffect } from "react";
export function AnimeView({ id }) {
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    async function fetchAnime() {
      try {
        if (!id) return
        const data = await searchId(id);
        console.log(data)
        setAnime(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAnime();
  }, [id]);

  
  
  if (!anime) {
    return <h1>Carregando...</h1>;
  }

  return (
    <main id="conteudo">
      <div className="anime-page">
        <div className="anime-banner">
          {anime.pictures?.map((picture) => (
            <img key={picture.large} src={picture.large} alt={anime.title} />
          ))}
        </div>

        <div className="anime-content">
          <div className="anime-poster">
            <img
              src={anime.pictures?.[0]?.large || anime.main_picture?.large}
              alt={anime.title}
            />
          </div>

          <div className="anime-info">
            <h1>{anime.title}</h1>

            <div className="anime-meta">
              <span>⭐ {anime.mean || "N/A"}</span>
              <span>🏆 #{anime.rank || "N/A"}</span>
              <span>🔥 #{anime.popularity || "N/A"}</span>
              <span>📺 {anime.status || "Unknown"}</span>
            </div>

            <div className="genres">
              {anime.genres?.map((g) => (
                <span key={g.id} className="genre">
                  {g.name}
                </span>
              ))}
            </div>

            <p className="synopsis">
              {anime.synopsis || "No synopsis available"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
