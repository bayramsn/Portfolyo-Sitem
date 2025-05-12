import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

// Pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import CertificatesPage from './pages/CertificatesPage'
import ContactPage from './pages/ContactPage'

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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App
