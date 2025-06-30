import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "https://ha-videoclub-api-g1.vercel.app/users",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Error al registrar usuario");
      }
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-columns">
          <div className="form-column">
            <label htmlFor="firstname">Name</label>
            <input
              type="text"
              id="txtFirstName"
              name="firstname"
              placeholder="Hack"
              required
              onChange={handleChange}
            />
            <label htmlFor="lastname">Surname</label>
            <input
              type="text"
              id="txtLastName"
              name="lastname"
              placeholder="Flix"
              required
              onChange={handleChange}
            />
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="txtAddress"
              name="address"
              placeholder="Hackflix Avenue 123"
              required
              onChange={handleChange}
            />
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="txtPhone"
              name="phone"
              placeholder="+598 99 123 456"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-column">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="txtEmail"
              name="email"
              placeholder="hackflix@mail.com"
              required
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="txtPassword"
              name="password"
              placeholder="●●●●●●●●"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" id="btnRegister">
          Register
        </button>
        <Link to="/login">I already have an account</Link>
      </form>
    </div>
  );
};

export default RegisterPage;
