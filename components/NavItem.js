import Link from "next/link";

const NavItem = ({ text, href, active }) => {
  return (
    <Link href={href} className='lg:inline-flex text-[#FFF1DC] lg:w-auto w-full px-3 py-2 rounded font-bold items-center justify-center hover:text-white' >
      {text}
    </Link>
  );
};

export default NavItem;