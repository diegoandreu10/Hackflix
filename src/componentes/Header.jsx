import { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { selectCartItems } from "../features/cartSlice";
import { logout } from "../features/userSlice";
import Cart from "./Cart";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const token = useSelector((state) => state.user.token);
  const currentUser = useSelector((state) => state.user.currentUser);

  const cartItems = useSelector(selectCartItems);

  const autenticado = !!token;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      <header className="header">
        <NavLink className="nav-logo" to="/">
          <h2>
            Hack<span style={{ color: "darkorange" }}>Flix</span>
          </h2>
        </NavLink>
        <nav className="nav-links">
          <NavLink className="navLink" to="/">
            Home
          </NavLink>
          <NavLink className="navLink" to="/aboutme">
            About Me
          </NavLink>

          {!autenticado ? (
            <>
              {location.pathname === "/login" ? (
                <NavLink className="navLink" to="/register">
                  Register
                </NavLink>
              ) : (
                <NavLink className="navLink" to="/login">
                  Login
                </NavLink>
              )}
            </>
          ) : (
            <div className="profile-container">
              <FaUser className="user-icon" onClick={toggleMenu} />
              {showMenu && (
                <div className="show-menu">
                  <NavLink to="/profile" onClick={() => setShowMenu(false)}>
                    Profile
                  </NavLink>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}

          <button className="cart-icon-button" onClick={toggleCart}>
            <FaShoppingCart />
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </button>
        </nav>
      </header>

      <Cart isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default Header;
