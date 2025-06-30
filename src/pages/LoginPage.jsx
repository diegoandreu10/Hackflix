import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post(
        "https://ha-videoclub-api-g1.vercel.app/tokens",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = res.data.token;
      const decoded = jwtDecode(token);
      const userId = decoded.sub || decoded.id;

      const userRes = await axios.get(
        `https://ha-videoclub-api-g1.vercel.app/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = userRes.data;

      dispatch(login({ token, user }));
      localStorage.setItem("token", token);

      navigate("/");
    } catch (err) {
      setError("Credenciales inválidas o error al conectar con el servidor.");

    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" id="btnLogin">
          Login
        </button>
        <Link to="/register">Create an account</Link>
      </form>
    </div>
  );
};

export default LoginPage;
