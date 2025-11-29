import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeBefore from "./pages/HomeBefore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeAfter from "./pages/HomeAfter";
import DetailPage from "@/pages/DetailPage";


console.log("APP RENDERED")
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeBefore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homeafter" element={<HomeAfter />} />
        <Route path="/book/:id" element={<DetailPage /> } />

      </Routes>
    </Router>
  );
}

export default App;

