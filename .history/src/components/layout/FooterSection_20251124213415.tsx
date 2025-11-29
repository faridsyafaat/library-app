import Image from "next/image";

export default function FooterSection() {
  return (
    <footer className="mt-20 py-16 text-center">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <Image
          src="/image/logo.png" 
          alt="Bookly Logo"
          width={50}
          height={50}
        />
      </div>

      {/* Description */}
      <p className="max-w-xl mx-auto text-gray-600 text-sm leading-relaxed mb-8">
        Discover inspiring stories & timeless knowledge, ready to borrow anytime.
        Explore online or visit our nearest library branch.
      </p>

      {/* Social Media Label */}
      <p className="text-gray-700 text-sm font-medium mb-4">
        Follow on Social Media
      </p>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-5">
        <Image src="/image/facebook.png" alt="Facebook" width={20} height={20} />
        <Image src="/image/instagram.png" alt="Instagram" width={20} height={20} />
        <Image src="/image/linkedin.png" alt="LinkedIn" width={20} height={20} />
        <Image src="/image/tiktok.png" alt="TikTok" width={20} height={20} />
      </div>
    </footer>
  );
}
