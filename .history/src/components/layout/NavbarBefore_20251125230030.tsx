import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function NavbarBefore() {
  const navigate = useNavigate();

  return (
    <nav className='w-full bg-white shadow-sm px-4 py-3 flex items-center justify-between container mx-auto'/>
           
        {/* Logo */}
        <div className="flex items-left gap-2">
          <img src="/icon/logo.png" alt="Logo" className="w-[155px] h-[42px] object-contain" />

        <span className='text-2xl font-bold text-gray-800 hidden sm:inline-block'>
          Booky
        </span>
        
  <div className='hidden sm:flex relative w-[500px] h-[44px] items-center gap-6'>
        <span className='absolute left-[16px] top-1/2 transform -translate-y-1/2 text-gray-400'>
          <img src='/icon/search.png' alt='Search' className='w-5 h-5' />
        </span>

        <input
          type='text'
          placeholder='Search book'
          className='w-full h-full rounded-full border pl-[44px] pr-[16px] pt-[8px] pb-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div className='flex items-center gap-4'>
        <div className='sm:hidden cursor-pointer'>
          <img src='/icon/search.png' alt='Search' className='w-6 h-6' />
        </div>

        <div className='relative cursor-pointer'>
          <img src='/icon/bag.png' className='w-9' alt='Cart' />
          {cartCount > 0 && (
            <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
              {cartCount}
            </span>
          )}
        </div>

        <div className='flex items-center gap-2 cursor-pointer'>
          <img
            src="/image/johndoe.png"}
            alt='User'
            className='w-9 h-9 rounded-full border'
          />

          <span className='font-medium hidden sm:inline-block'>
           John Doe
          </span>
        </div> 
       
       
    </nav>
  );
}
