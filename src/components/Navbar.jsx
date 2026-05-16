import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="sticky justify-center top-0 z-50 bg-black text-white border-b border-white px-6 py-4 flex gap-6">
      <Link to="/chardle" className="px-2 py-1 md:px-4 md:py-2 rounded-lg font-extrabold text-black transition-colors text-xs md:text-base" style={{ backgroundColor: '#F0E400', fontFamily: 'Barlow, sans-serif' }}>CHARDLE</Link>
      <Link to="/clipdle" className="px-2 py-1 md:px-4 md:py-2 rounded-lg font-extrabold text-black transition-colors text-xs md:text-base" style={{ backgroundColor: '#F0E400', fontFamily: 'Barlow, sans-serif' }}>CLIPDLE</Link>
      <Link
        to="/clipdleUnlimited"
        onClick={() => {
            if (window.location.pathname === "/clipdleUnlimited") {
            window.location.reload();
            }
        }} className="px-2 py-1 md:px-4 md:py-2 rounded-lg font-extrabold text-black transition-colors text-xs md:text-base" style={{ backgroundColor: '#F0E400', fontFamily: 'Barlow, sans-serif' }}>
        CLIPDLE UNLIMITED
        </Link>
    </nav>
  );
};