import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadUser, loadUserFail } from "./slices/auth/authSlice";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import setAuthToken from "./utils/setAuthToken";
import { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import StoragePlaceDetail from "./components/storagePlaces/StoragePlaceDetail";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserFromToken = async () => {
      try {
        const res = await axios.get('/api/auth');
        dispatch(loadUser({ user: res.data }));
      } catch (error) {
        dispatch(loadUserFail());
      }
    }

    loadUserFromToken();
  }, [dispatch])

  return (
    <Router>
      <div className="App">
        <h1>Helloooo</h1>
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute>
            <Dashboard />
          </PrivateRoute>} />
          <Route path="/storageplaces/:id" element={<PrivateRoute>
            <StoragePlaceDetail />
          </PrivateRoute>} />
          {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
