import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    return navigate("/");
  }

  const authLinks = (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  )

  const guestLinks = (
    <>
      <Link to="/register">
            <button>REGISTER</button>
        </Link>
        <Link to="/login">
            <button>LOGIN</button>
        </Link>
    </>
  )

  return (
    <div>
        <h1>Navbar</h1>
        { !loading && (<>{ isAuthenticated ? authLinks : guestLinks }</>)}
    </div>
  )
}

export default Navbar