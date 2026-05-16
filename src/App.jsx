import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Game from './utils/Game'
import ClipGame from './utils/ClipGame'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chardle" element={<Game />} />
        <Route path="/clipdle" element={<ClipGame mode="daily" />} />
        <Route path="/clipdleUnlimited" element={<ClipGame mode="unlimited" />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App