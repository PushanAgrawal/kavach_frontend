import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="bg-[#FFF1DC] w-full overflow-hidden">
        <div className='flex flex-col'>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
