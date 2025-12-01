import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NavbarAfter from "@/components/layout/NavbarAfter";

export default function BorrowSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { returnDate } = (location.state as { returnDate: string }) || {
    returnDate: "",
  };

  return (
    <>
      <NavbarAfter />

      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 10 }}
          className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-4xl mb-6"
        >
          ✓
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-2"
        >
          Borrow Successful!
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-700 max-w-lg"
        >
          Your book has been successfully borrowed. Please return it by
          {" "}
          <span className="text-red-600 font-semibold">{returnDate}</span>.
        </motion.p>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate("/borrow-list")}
          className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          See Borrowed List
        </motion.button>
      </div>

      </>
  );
}
