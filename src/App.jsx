import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Compare from './pages/Compare';
import AIAdvisor from './pages/AIAdvisor';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow pt-14 sm:pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/ai-advisor" element={<AIAdvisor />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
            <p>Aggregating from Saka, Autokeskus, and Kamux</p>
            <p className="mt-1 text-xs">
              © 2026 Autotori - Your trusted car aggregator for Finland
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
