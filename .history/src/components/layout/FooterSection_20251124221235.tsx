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
      <p className="max-w-xl mx-auto text-gray-600 text-[10px] leading-relaxed mb-4">
        Discover inspiring stories & timeless knowledge, ready to borrow anytime.
        Explore online or visit our nearest library branch.
      </p>

      {/* Social Media Label */}
      <p className="text-gray-700 text-sm font-medium mb-4">
        Follow on Social Media
      </p>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-5 text-gray-700 text-xl">
  <div className="w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-blue-100 duration-200">
    <FaFacebookF />
  </div>

  <div className="w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hhover:bg-blue-100 duration-200">
    <FaInstagram />
  </div>

  <div className="w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-blue-100 duration-200">
    <FaLinkedinIn />
  </div>

  <div className="w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-blue-100 duration-200">
    <FaTiktok />
  </div>
</div>

    </footer>
  );
}
