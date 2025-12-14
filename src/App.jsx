import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Games from './pages/Games';

function App() {
  return (
    <div className="font-sans antialiased bg-[#050505]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Changed route from /bindrune to /games as requested */}
        <Route path="/games" element={<Games />} />
      </Routes>
    </div>
  )
}

export default App