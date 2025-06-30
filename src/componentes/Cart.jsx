import { FaMinus, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  addToCart,
  clearCart,
  removeFromCart,
  selectCartItems,
} from "../features/cartSlice";

const Cart = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(removeFromCart(item.id));
      dispatch(addToCart({ ...item, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}

      <div className={`cart-sidebar ${isOpen ? "cart-open" : ""}`}>
        <div className="cart-header">
          <h2>
            CART ({getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""})
          </h2>
          <button className="cart-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>You haven't added any movies yet!</p>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={
                      item.image
                        ? `https://image.tmdb.org/t/p/w200${item.image}`
                        : "/placeholder.svg"
                    }
                    alt={item.title}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h4>{item.title}</h4>
                    <p className="cart-item-price">
                      ${item.price?.toFixed(2) || "9.99"}
                    </p>

                    <div className="quantity-controls">
                      <button>
                        <FaMinus
                          onClick={() => handleDecreaseQuantity(item)}
                          className="quantity-btn"
                        />
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button>
                        <FaPlus
                          onClick={() => handleIncreaseQuantity(item)}
                          className="quantity-btn"
                        />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="remove-item-btn"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}

              <div className="cart-total">
                <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
              </div>

              <button onClick={handleClearCart} className="clear-cart-btn">
                Clear Cart
              </button>
            </div>
          )}
        </div>

        <div className="cart-footer">
          {cartItems.length > 0 && (
            <NavLink to="/checkout" className="checkout-btn">
              Checkout
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
