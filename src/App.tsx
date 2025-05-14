import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, lazy } from 'react'

// Lazy loaded pages
const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const CertificatesPage = lazy(() => import('./pages/CertificatesPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

// Components
import Navbar from './components/ui/Navbar'
import ThemeToggle from './components/ui/ThemeToggle'
import BackendScene from './components/3d/BackendScene'

// Theme context
import { ThemeProvider, useTheme } from './context/ThemeContext'

// Loading spinner component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Yükleniyor...</p>
  </div>
);

const AppContent = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Log navigation for debugging
  const location = useLocation();
  useEffect(() => {
    console.log('Current path:', location.pathname);
  }, [location]);

  return (
    <div className="app-container">
      {/* Disable background 3D animation temporarily due to black screen issue */}
      {/* <div className="background-animation">
        <Suspense fallback={<LoadingSpinner />}>
          <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
            <BackendScene />
          </Canvas>
        </Suspense>
      </div> */}
      {/* End background-animation disable */}
      
      {/* Main content */}
      <div className="content-container">
        <Navbar />
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="certificates" element={<CertificatesPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App
