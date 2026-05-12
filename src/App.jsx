import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Game from './utils/Game'
import ClipGame from './utils/ClipGame'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chardle" element={<Game />} />
        <Route path="/clipdle" element={<ClipGame />} />
      </Routes>
    </div>
  )
}

export default App