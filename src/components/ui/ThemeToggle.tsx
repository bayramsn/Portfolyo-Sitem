import { motion } from 'framer-motion';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => {
  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1, rotate: 15 }}
      aria-label={`${theme === 'dark' ? 'Light' : 'Dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
      >
        {theme === 'dark' ? (
          // Sun icon with rays animation for dark mode
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="22" 
            height="22" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ color: '#FFC107' }}
          >
            <motion.circle 
              cx="12" 
              cy="12" 
              r="5" 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 3
              }}
            />
            <motion.g
              animate={{ 
                rotate: [0, 15, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </motion.g>
          </svg>
        ) : (
          // Moon icon with stars for light mode
          <div className="position-relative">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: '#6C63FF' }}
              initial={{ rotate: 45 }}
              animate={{ 
                rotate: [45, 30, 45],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </motion.svg>
            
            {/* Small animated stars */}
            <motion.div 
              className="position-absolute"
              style={{ top: '-8px', right: '-8px', width: '4px', height: '4px', backgroundColor: '#fff', borderRadius: '50%' }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.5
              }}
            />
            <motion.div 
              className="position-absolute"
              style={{ bottom: '0px', right: '2px', width: '3px', height: '3px', backgroundColor: '#fff', borderRadius: '50%' }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                repeatType: "loop",
                delay: 1.2
              }}
            />
            <motion.div 
              className="position-absolute"
              style={{ top: '5px', left: '-5px', width: '2px', height: '2px', backgroundColor: '#fff', borderRadius: '50%' }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.8
              }}
            />
          </div>
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;