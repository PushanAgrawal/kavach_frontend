import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image'

import NavItem from "./NavItem";
// import logo from '@/public/factifier-logo2.svg'

const Navbar = () => {
  const [active, setActive] = useState(false);

  const MENU_LIST = [
      { text: "About Us", href: "/about" },
      { text: "Extension", href: "/extension" },
      { text: "Get App", href: "/getapp" },
      { text: "FAQs", href: "/faqs" },
    ];

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className='flex items-center flex-wrap 
      bg-[#609966] p-2 relative z-0'>
        <Link href='/' className='inline-flex items-center p-2 mr-4 '> 
          <div className='w-[150px] lg:inline-flex text-[#FFF1DC] lg:w-auto w-full px-3 py-2 rounded font-bold items-center justify-center hover:text-white '>
            FACTIFIER
          </div>
        </Link>
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${
            active ? '' : 'hidden'
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>
          {MENU_LIST.map((menu, idx) => (
               <NavItem key = {idx} {...menu} />
           ))}
          </div>
        </div>
        
      </nav>
    </>
  );
};

export default Navbar;