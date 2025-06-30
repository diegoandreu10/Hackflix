import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../componentes/MovieCard";

const apiKey = "9997b33eea4d13c4b98fdbed0caf336d";

const HomePage = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=1`
        );
        setPeliculas(res.data.results);
      } catch (err) {
        console.error("Error al cargar películas", err);
      }
    };

    fetchPeliculas();
  }, []);

  const peliculasFiltradas = peliculas.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <section className="image-main">
        <h2>¿What would you like to watch?</h2>
        <input
          type="text"
          placeholder="🔍 Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className="movie-list">
        {peliculasFiltradas.map((p) => (
          <MovieCard
            id={p.id}
            key={p.id}
            title={p.title}
            image={`https://image.tmdb.org/t/p/w500${p.poster_path}`}
          />
        ))}
      </section>
    </main>
  );
};

export default HomePage;
