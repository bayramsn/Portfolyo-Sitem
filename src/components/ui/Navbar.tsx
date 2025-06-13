import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);  // Navigation links - HashRouter için slash kaldıralım
  const navLinks = [
    { title: 'Ana Sayfa', path: '/' },
    { title: 'Hakkımda', path: 'about' },
    { title: 'Projeler', path: 'projects' },
    { title: 'Sertifikalar', path: 'certificates' },
    { title: 'İletişim', path: 'contact' }
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 w-100 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-opacity-90 shadow-lg backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{
        backgroundColor: isScrolled ? 'var(--background-light)' : 'transparent',
        transition: 'all 0.3s'
      }}
    >
      <div className="container py-3 d-flex align-items-center justify-content-between">
        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className="rounded d-flex align-items-center justify-content-center text-white fw-bold" 
              style={{
                height: '2.5rem', 
                width: '2.5rem', 
                background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))'
              }}
            >
              BS
            </div>
          </motion.div>
          <motion.span 
            className="fs-4 fw-bold"
            style={{ color: 'var(--text-color)' }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Bayram Şenbay
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="d-none d-md-flex align-items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`position-relative fw-medium mx-3 text-decoration-none`}
              style={{
                color: location.pathname === link.path 
                  ? 'var(--accent-color)' 
                  : 'var(--text-color)',
                opacity: location.pathname !== link.path ? 0.8 : 1
              }}
            >
              {link.title}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="navIndicator"
                  className="position-absolute rounded"
                  style={{
                    height: '3px', 
                    bottom: '-6px', 
                    left: 0, 
                    right: 0,
                    background: 'linear-gradient(90deg, var(--gradient-start), var(--gradient-end))'
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 380, 
                    damping: 30 
                  }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <motion.button 
          className="d-md-none p-2 btn btn-link border-0"
          style={{ color: 'var(--text-color)' }}
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle mobile menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </>
            )}
          </svg>
        </motion.button>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="d-md-none w-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ 
              background: 'var(--background-light)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="container py-3">
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="py-2"
                >
                  <Link
                    to={link.path}
                    className="d-block py-2 text-decoration-none"
                    style={{
                      color: location.pathname === link.path 
                        ? 'var(--accent-color)' 
                        : 'var(--text-color)',
                      fontWeight: location.pathname === link.path ? '600' : '400'
                    }}
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;