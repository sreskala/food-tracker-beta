import axios from "axios";
import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setAlert, removeAlert } from "../../slices/alert/alertSlice";
import { loginUser, loginFail, loadUser } from "../../slices/auth/authSlice";
import Alert from "../Layout/Alert";

const initialFormState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const alertMsg = useSelector((state) => state.alert.msg);
  const alertType = useSelector((state) => state.alert.alertType);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const dispatch = useDispatch();

  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRemoveAlert = () => {
    dispatch(removeAlert());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/api/auth", body, config);

      dispatch(loginUser({ token: res.data.token }));
      dispatch(loadUser({ user: res.data}))
      setFormData({ ...initialFormState });
      setLoading(false);
    } catch (err) {
      const errors = err.response.data.errors;
      let errorMessage = "";
      errors.forEach((error) => (errorMessage += ` ${error.msg}`));
      dispatch(
        setAlert({
          msg:
            errorMessage !== "" ? errorMessage : "Error while registering user",
          alertType: "danger",
        })
      );
      dispatch(loginFail());
      setFormData({ ...initialFormState });
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      {alertMsg !== "" ? (
        <>
          <Alert
            alertMsg={alertMsg}
            alertType={alertType}
            removeAlert={handleRemoveAlert}
          />
        </>
      ) : null}
      <div>Login</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          required
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          minLength="8"
          value={password}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
