import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeBefore from "./pages/HomeBefore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeAfter from "./pages/HomeAfter";

function App() {
  const isLoggedIn = false; // nanti bisa pakai Redux/TanStack Query

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeBefore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={isLoggedIn ? <HomeAfter /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

