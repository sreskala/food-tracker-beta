import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Helloooo</h1>
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
