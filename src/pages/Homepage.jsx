import { useNavigate } from 'react-router-dom'

function Homepage() {
  const navigate = useNavigate()

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center gap-4 text-white">
      <button style={{ backgroundColor: '#F0E400', fontFamily: 'Barlow, sans-serif', fontSize: '1.5rem', fontWeight: '800' }} className="text-black px-6 py-3 rounded-lg w-48" onClick={() => navigate('/chardle')}>SKAM CHARDLE</button>
      <button style={{ backgroundColor: '#F0E400', fontFamily: 'Barlow, sans-serif', fontSize: '1.5rem', fontWeight: '800' }} className=" text-black px-6 py-3 rounded-lg w-48" onClick={() => navigate('/clipdle')}>SRAM CLIPDLE</button>
    </div>
  )
}

export default Homepage