import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart, selectCartItems } from "../features/cartSlice";
import { addOrder } from "../features/orderSlice";
import { selectCurrentUser } from "../features/userSlice";

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price || 9.99) * item.quantity,
      0
    );
  };

  const getTotal = () => {
    return getSubtotal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      order_id: Date.now(),
      createdAt: new Date().toISOString(),
      total: getTotal(),
      data: cartItems.map((item) => ({
        title: item.title,
        qty: item.quantity,
        price: item.price || 9.99,
      })),
      userId: user?.id,
    };

    dispatch(addOrder(newOrder));
    toast.success("Transaction successfully processed!", {
      position: "top-center",
    });
    dispatch(clearCart());
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-section">
            <h2>Contacto</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label htmlFor="nombre">First Name</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={user.firstname || ""}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="apellido">Last Name</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={user.lastname || ""}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="direccion">Address</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={user.address || ""}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Phone</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={user.phone || ""}
                  readOnly
                />
              </div>

              <button type="submit" className="confirm-transaction-btn">
                Confirm Transaction
              </button>
            </form>
          </div>

          <div className="checkout-summary-section">
            <h2>Items</h2>
            <div className="checkout-summary">
              {cartItems.length > 0 ? (
                <>
                  <div className="checkout-items">
                    {cartItems.map((item) => (
                      <div key={item.id} className="checkout-item">
                        <img
                          src={
                            item.image
                              ? `https://image.tmdb.org/t/p/w200${item.image}`
                              : "/placeholder.svg?height=80&width=60"
                          }
                          alt={item.title}
                          className="checkout-item-image"
                        />
                        <div className="checkout-item-details">
                          <h4>{item.title}</h4>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                        <div className="checkout-item-price">
                          ${((item.price || 9.99) * item.quantity).toFixed(0)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="checkout-totals">
                    <div className="total-line">
                      <span>Subtotal:</span>
                      <span>${getSubtotal().toFixed(0)}</span>
                    </div>
                    <div className="total-line">
                      <span>Shipping:</span>
                      <span>Free</span>
                    </div>
                    <div className="total-line total-final">
                      <span>Total</span>
                      <span>${getTotal().toFixed(0)}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="checkout-totals">
                    <div className="total-line">
                      <span>Subtotal:</span>
                      <span>$0</span>
                    </div>
                    <div className="total-line">
                      <span>Shipping:</span>
                      <span>Free</span>
                    </div>
                    <div className="total-line total-final">
                      <span>Total</span>
                      <span>$0</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
