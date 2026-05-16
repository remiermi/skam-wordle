import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const buttonClass = "text-black px-6 py-3 rounded-2xl w-64 max-w-[80vw] text-xl sm:text-2xl font-extrabold transition-transform hover:scale-105 active:scale-95";

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-white">
      <button
        style={{
          backgroundColor: "#F0E400",
          fontFamily: "Barlow, sans-serif",
        }}
        className={buttonClass}
        onClick={() => navigate("/chardle")}
      >
        SKAM CHARDLE
      </button>

      <button
        style={{
          backgroundColor: "#F0E400",
          fontFamily: "Barlow, sans-serif",
        }}
        className={buttonClass}
        onClick={() => navigate("/clipdle")}
      >
        SRAM CLIPDLE
      </button>

      <button
        style={{
          backgroundColor: "#F0E400",
          fontFamily: "Barlow, sans-serif",
        }}
        className={buttonClass}
        onClick={() => navigate("/clipdleUnlimited")}
      >
        SRAM CLIPDLE UNLIMITED
      </button>
    </div>
  );
}

export default Homepage;