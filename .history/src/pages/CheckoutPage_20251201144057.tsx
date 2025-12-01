import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const handleBorrow = async () => {
  try {
    // proses API borrow
    // await axios.post(...)

    navigate("/checkout"); // ⬅️ pindah halaman
  } catch (error) {
    console.log(error);
  }
};
