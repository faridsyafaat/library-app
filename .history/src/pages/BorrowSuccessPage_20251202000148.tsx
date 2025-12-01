import { useLocation, useNavigate } from "react-router-dom";
import NavbarAfter from "@/components/layout/NavbarAfter";
import FooterSection from "@/components/layout/FooterSection";
import { motion } from "framer-motion";

const BorrowSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { returnDate } = (location.state as { returnDate: string }) || {
    returnDate: null,
  };

  return (
    <>
      <NavbarAfter />

      <div className="container mx-auto flex flex-col items-center text-center py-20">
        
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="w-24 h-24 flex items-center justify-center bg-blue-100 rounded-full mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 h-14 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-2"
        >
          Borrowing Successful!
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600"
        >
          Your book has been successfully borrowed.
        </motion.p>

       <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3 }}
  className="text-gray-700 mt-1"
>
  Your book has been successfully borrowed. Please return it by{" "}
  <span className="text-red-600 font-semibold">
    {returnDate}
  </span>.
</motion.p>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold"
          onClick={() => navigate("/borrowed")}
        >
          See Borrowed List
        </motion.button>
      </div>

      <FooterSection />
    </>
  );
};

export default BorrowSuccessPage;
