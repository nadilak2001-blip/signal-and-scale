import {useEffect} from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import {Layout} from './components/Layout';
import {initializeGA4} from './lib/analytics';
import {HomePage} from './pages/HomePage';
import {ServicesPage} from './pages/ServicesPage';
import {AboutPage} from './pages/AboutPage';
import {InsightsPage} from './pages/InsightsPage';
import {ContactPage} from './pages/ContactPage';
import {IndustriesPage} from './pages/IndustriesPage';
import {EvidencePage} from './pages/EvidencePage';

export default function App() {
  useEffect(() => {
    initializeGA4();
  }, []);

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
