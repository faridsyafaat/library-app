import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeBefore from "./pages/HomeBefore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeAfter from "./pages/HomeAfter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeBefore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homeafter" element={<HomeAfter />} />
      </Routes>
    </Router>
  );
}

export default App;

