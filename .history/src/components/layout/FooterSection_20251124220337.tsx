import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";

export default function FooterSection() {
  return (
    <footer className="mt-10 py-16 text-center container">

      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img
          src="/icon/booky.png"
          alt="Bookly Logo"
          className="w-[155px] h-[42px]"
        />
      </div>

      {/* Description */}
      <p className="max-w-xl mx-auto text-gray-600 text-[15px] leading-relaxed mb-8">
        Discover inspiring stories & timeless knowledge, ready to borrow anytime.
        Explore online or visit our nearest library branch.
      </p>

      {/* Social Media Label */}
      <p className="text-gray-700 text-sm font-medium mb-4">
        Follow on Social Media
      </p>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-5 text-gray-700 text-xl">
        <FaFacebookF className="cursor-pointer hover:text-blue-600 duration-200" />
        <FaInstagram className="cursor-pointer hover:text-pink-600 duration-200" />
        <FaLinkedinIn className="cursor-pointer hover:text-blue-500 duration-200" />
        <FaTiktok className="cursor-pointer hover:text-black duration-200" />
      </div>
    </footer>
  );
}
