import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaFilm,
  FaPlay,
  FaShoppingBag,
  FaSpinner,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../features/cartSlice";

const apiKey = "9997b33eea4d13c4b98fdbed0caf336d";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        setError(null);

        const movieResponse = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}?api_key=${apiKey}&language=es-ES`
        );

        const videosResponse = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}/videos?api_key=${apiKey}&language=es-ES`
        );

        setMovie(movieResponse.data);
        setVideos(videosResponse.data.results || []);
      } catch (err) {
        setError("No se pudo cargar la información de la película");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieData();
    }
  }, [id]);

  const getImageUrl = (path, size = "original") => {
    if (!path) return "/placeholder.svg?height=600&width=1200";
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  };

  const getMainTrailer = () => {
    const officialTrailer = videos.find(
      (video) =>
        video.type === "Trailer" &&
        video.site === "YouTube" &&
        video.official === true
    );

    if (officialTrailer) return officialTrailer;

    const anyTrailer = videos.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    if (anyTrailer) return anyTrailer;

    return videos.find((video) => video.site === "YouTube");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No disponible";
    return dateString;
  };

  const formatLanguage = (lang) => {
    if (!lang) return "No disponible";
    return lang.toUpperCase();
  };

  const generatePrice = (movieId) => {
    const seed = Number.parseInt(movieId) || 550;
    return ((seed % 300) + 150) / 10;
  };

  const handleTrailerClick = () => {
    const trailer = getMainTrailer();
    if (trailer) {
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
    } else {
      alert("Trailer no disponible para esta película");
    }
  };

  const handlePlayClick = () => {};

  const handleAddToCart = () => {
    if (!movie) return;

    const movieItem = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      image: getImageUrl(movie.poster_path, "w500"),
      price: generatePrice(movie.id),
      overview: movie.overview,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
    };

    dispatch(addToCart(movieItem));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="movie-page-container">
        <div className="movie-loading">
          <FaSpinner className="loading-spinner" />
          <p>Loading movie data...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-page-container">
        <div className="movie-error">
          <h2>Error al cargar la película</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/")} className="back-home-btn">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const trailer = getMainTrailer();

  return (
    <div className="movie-page-container">
      <button className="back-button" onClick={handleGoBack}>
        <FaArrowLeft /> Back
      </button>

      <div
        className="movie-hero"
        style={{ backgroundImage: `url(${getImageUrl(movie.backdrop_path)})` }}
      >
        <div className="movie-hero-overlay">
          <div className="movie-content">
            <h1 className="movie-title">{movie.title}</h1>

            <div className="movie-meta">
              <span>Date: {formatDate(movie.release_date)}</span>
              <span>Language: {formatLanguage(movie.original_language)}</span>
              <span>Rating: {movie.vote_average?.toFixed(3)}</span>
            </div>

            <p className="movie-description">
              {movie.overview || "Descripción no disponible."}
            </p>

            <div className="movie-actions">
              <FaFilm
                className="action-btn"
                onClick={handleTrailerClick}
                title={
                  trailer
                    ? `Ver Trailer: ${trailer.name}`
                    : "Trailer no disponible"
                }
                disabled={!trailer}
              />

              <FaPlay
                className="action-btn"
                onClick={handlePlayClick}
                title="Reproducir (No disponible)"
              />

              <FaShoppingBag
                className="action-btn"
                onClick={handleAddToCart}
                title="Agregar al Carrito"
              />

              <span className="movie-price">${generatePrice(movie.id)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
