import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setAlert } from "../../slices/alert/alertSlice";
//import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const alertMsg = useSelector((state) => state.alert.msg)
  const dispatch = useDispatch()

  const { name, email, password, password2 } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
        console.log('Passwords dont match');
        dispatch(setAlert({ msg: 'Passwords do not match', alertType: 'danger' }))
    } else {
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

  return (
    <>
    { alertMsg !== "" ? (
      <>
    <h1>Alert!</h1>
    <h2>{alertMsg}</h2>
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
