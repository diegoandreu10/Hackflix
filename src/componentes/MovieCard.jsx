import { FaShoppingBag } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/cartSlice";

const MovieCard = ({
  id,
  title,
  image,
  poster_path,
  overview,
  vote_average,
  release_date,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImageClick = () => {
    navigate(`/movie/${id}`);
  };

  const generatePrice = (movieId) => {
    const seed = Number.parseInt(movieId) || 550;
    return ((seed % 300) + 150) / 10;
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    const movieItem = {
      id: id,
      title: title,
      poster_path: poster_path,
      image: image,
      price: generatePrice(id),
      overview: overview,
      vote_average: vote_average,
      release_date: release_date,
    };

    dispatch(addToCart(movieItem));

  };

  return (
    <div className="movie-card">
      <img
        className="movie-poster"
        src={image || "/placeholder.svg"}
        alt={title}
        onClick={handleImageClick}
      />
      <div className="movie-action" onClick={handleAddToCart}>
        <span>
          <FaShoppingBag style={{ marginRight: "8px" }} />
          Add to Cart
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
