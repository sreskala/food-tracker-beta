import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlert, removeAlert } from "../../slices/alert/alertSlice";
import { registerUser, registerFail } from "../../slices/auth/authSlice";
import Alert from "../Layout/Alert";
import axios from "axios";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const [formData, setFormData] = useState({
    ...initialFormState
  });
  const [loading, setLoading] = useState(false);

  const alertMsg = useSelector((state) => state.alert.msg);
  const alertType = useSelector((state) => state.alert.alertType);
  const dispatch = useDispatch();

  const { name, email, password, password2 } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRemoveAlert = () => {
    dispatch(removeAlert());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== password2) {
      setFormData({...initialFormState});
      dispatch(
        setAlert({ msg: "Passwords do not match", alertType: "danger" })
      );
      setLoading(false);
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ name, email, password });

      try {
        const res = await axios.post("/api/users", body, config);

        dispatch(registerUser({ token: res.data.token }));
        setFormData({...initialFormState});
        setLoading(false);
      } catch (err) {
        const errors = err.response.data.errors;
        let errorMessage = "";
        errors.forEach((error) => (errorMessage += ` ${error.msg}`));
        dispatch(
          setAlert({
            msg:
              errorMessage !== ""
                ? errorMessage
                : "Error while registering user",
            alertType: "danger",
          })
        );
        dispatch(registerFail());
        setFormData({...initialFormState});
        setLoading(false);
      }

      // const newUser = {
      //     name,
      //     email,
      //     password
      // };

      // try {
      //     const config = {
      //         headers: {
      //             'Content-Type': 'application/json'
      //         }
      //     }

      //     const body = JSON.stringify(newUser);

      //     const res = await axios.post('/api/users', body, config);
      //     console.log(res.data);
      // } catch (err) {
      //     console.error(err.response.data);
      // }
      console.log(formData);
    }
  };

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
      <div>Register</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          required
          onChange={(e) => handleChange(e)}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          minLength="8"
          value={password2}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Register;
