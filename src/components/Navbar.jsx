import { Link } from "react-router-dom";
import { CircleHelp } from "lucide-react";
import { useState } from "react";
import { Help } from "./Help";

export const Navbar = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <nav className="sticky justify-center top-0 z-50 bg-black text-white border-b border-white px-6 py-4 flex gap-6">
        <div className="flex flex-1 justify-center gap-2 md:gap-4 flex-wrap">
          <Link
            to="/chardle"
            className="px-2 py-1 md:px-4 md:py-2 rounded-lg font-extrabold text-black text-xs md:text-base"
            style={{ backgroundColor: "#F0E400", fontFamily: "Barlow, sans-serif" }}
          >
            CHARDLE
          </Link>

          <Link
            to="/clipdle"
            className="px-2 py-1 md:px-4 md:py-2 rounded-lg font-extrabold text-black text-xs md:text-base"
            style={{ backgroundColor: "#F0E400", fontFamily: "Barlow, sans-serif" }}
          >
            CLIPDLE
          </Link>

          <Link
            to="/clipdleUnlimited"
            onClick={() => {
              if (window.location.pathname === "/clipdleUnlimited") {
                window.location.reload();
              }
            }}
            className="px-2 py-1 md:px-4 md:py-2 rounded-lg font-extrabold text-black text-xs md:text-base"
            style={{ backgroundColor: "#F0E400", fontFamily: "Barlow, sans-serif" }}
          >
            CLIPDLE UNLIMITED
          </Link>
        </div>

        <button
          className="absolute right-2 md:right-6 flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full"
          onClick={() => setShowHelp(true)}
          title="Help"
          style={{ backgroundColor: "#F0E400", color: "black" }}
        >
          <CircleHelp size={18} />
        </button>
      </nav>

      {showHelp && <Help onClose={() => setShowHelp(false)} />}
    </>
  );
};