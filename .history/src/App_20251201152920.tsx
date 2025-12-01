import { Routes, Route } from "react-router-dom";
import HomeBefore from "@/pages/HomeBefore";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import HomeAfter from "@/pages/HomeAfter";
import DetailPage from "@/pages/DetailPage";
import CategoryPage from "@/pages/CategoryPage";
import AuthorPage from "@/pages/AuthorPage";
import MyCartPage from "./pages/MyCartPage";


function App() {
  return (
         <Routes>
        <Route path="/" element={<HomeBefore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homeafter" element={<HomeAfter />} />
        <Route path="/books/:id" element={<DetailPage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/author/:id" element={<AuthorPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/my-cart" element={<MyCartPage />} />
        </Routes>
        
      );
}

export default App;
