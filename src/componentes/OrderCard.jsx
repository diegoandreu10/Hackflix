const OrderCard = ({ order, user }) => {
  return (
    <div className="order-card">
      <div className="order-content">
        <div className="order-user">
          <h3>Customer</h3>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Order Number:</strong> {order.order_id}
          </p>
          <p>
            <strong>Name:</strong> {user.firstname} {user.lastname}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <div className="order-items">
          <h3>Items</h3>
          <ul>
            {order.data.map((item, index) => (
              <li key={index}>
                {item.title} x {item.qty || 1}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr />

      <div className="order-total">
        <strong>Total: ${Number(order.total).toFixed(1)}</strong>
      </div>
    </div>
  );
};

export default OrderCard;
