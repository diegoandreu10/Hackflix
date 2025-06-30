import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../componentes/OrderCard";
import { selectOrders } from "../features/orderSlice";
import { selectCurrentUser, updateUser } from "../features/userSlice";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const currentUser = useSelector(selectCurrentUser);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstname: currentUser.firstname || "",
        lastname: currentUser.lastname || "",
        address: currentUser.address || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
      });
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing && currentUser) {
      setFormData({
        firstname: currentUser.firstname || "",
        lastname: currentUser.lastname || "",
        address: currentUser.address || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
      });
    }
  };

  const handleSave = () => {
    dispatch(updateUser(formData));
    setIsEditing(false);
  };

  const userOrders = orders.filter((order) => order.userId === currentUser?.id);

  if (!currentUser) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="no-user">
            <p>Please log in to view your profile</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container-profile">
        <div className="profile-section">
          <h1>Profile</h1>
          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="form-actions">
              {!isEditing ? (
                <button className="edit-btn" onClick={handleEditToggle}>
                  Edit data
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="save-btn" onClick={handleSave}>
                    Save
                  </button>
                  <button className="cancel-btn" onClick={handleEditToggle}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="orders-section">
          <h2>My Orders</h2>

          {userOrders.length > 0 ? (
            <div className="orders-list">
              {userOrders.map((order) => (
                <OrderCard
                  key={order.order_id}
                  order={order}
                  user={currentUser}
                />
              ))}
            </div>
          ) : (
            <div className="no-orders">
              <p>You don't have orders</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
