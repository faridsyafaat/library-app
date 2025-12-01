import { Routes, Route } from "react-router-dom";
import HomeBefore from "@/pages/HomeBefore";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import HomeAfter from "@/pages/HomeAfter";
import DetailPage from "@/pages/DetailPage";
import CategoryPage from "@/pages/CategoryPage";
import AuthorPage from "@/pages/AuthorPage";

// Contoh import image aman
import banner from "@/assets/banner.jpg";

function App() {
  return (
    <>
      {/* Banner di atas */}
      <img src={banner} alt="Banner" style={{ width: "100%" }} />

      <Routes>
        <Route path="/" element={<HomeBefore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homeafter" element={<HomeAfter />} />
        <Route path="/books/:id" element={<DetailPage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/author/:id" element={<AuthorPage />} />
        <Route path="/categories/:id" element={<CategoryPage />} />
      </Routes>
    </>
  );
}

export default App;
