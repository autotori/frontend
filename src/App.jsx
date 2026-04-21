import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LegalModal from './components/LegalModal';
import CookieConsentBanner from './components/CookieConsentBanner';
import Home from './pages/Home';
import Search from './pages/Search';
import Compare from './pages/Compare';
import AIAdvisor from './pages/AIAdvisor';
import About from './pages/About';
import Contact from './pages/Contact';
import AdvertisementPlacements from './pages/AdvertisementPlacements';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';

function App() {
  const [legalDialog, setLegalDialog] = useState(null);

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
            <Route path="/contact" element={<Contact onOpenLegal={setLegalDialog} />} />
            <Route path="/advertisement-placements" element={<AdvertisementPlacements />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
          </Routes>
        </main>

        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
            <p>Tiedot koottu Saka Autokeskuksesta ja Kamuxista</p>
            <p className="mt-2 text-xs text-blue-700">
              <button type="button" onClick={() => setLegalDialog('terms')} className="underline hover:text-blue-900">Käyttöehdot</button>
              {' '}·{' '}
              <button type="button" onClick={() => setLegalDialog('privacy')} className="underline hover:text-blue-900">Tietosuojaseloste</button>
              {' '}·{' '}
              <button type="button" onClick={() => setLegalDialog('cookies')} className="underline hover:text-blue-900">Evästekäytäntö</button>
            </p>
            <p className="mt-1 text-xs">
              © 2026 Autotori – Luotettava autojen hakupalvelu Suomessa
            </p>
          </div>
        </footer>

        <LegalModal type={legalDialog} onClose={() => setLegalDialog(null)} />
        <CookieConsentBanner onOpenCookiesPolicy={() => setLegalDialog('cookies')} />
      </div>
    </Router>
  );
}

export default App;
