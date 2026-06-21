import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/Slices/authSlice";
import "../../style/authPages/Login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="login">
      <div className="cont">
        <h2>تسجيل الدخول</h2>
        {auth.error && <p style={{ color: "red" }}>{auth.error.message}</p>}
        <form>
          <input
            className="form-control"
            type="email"
            placeholder="الايميل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="form-control"
            type="password"
            placeholder="كلمة السر"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn btn-primary" onClick={handleSubmit}>
            تسجيل
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
