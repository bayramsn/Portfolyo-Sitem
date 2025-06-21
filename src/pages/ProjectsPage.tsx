import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Define project type
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  detailedDescription: string;
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  color: string;
}

const ProjectsPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Paralax heading effect
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.15], [1, 0]);

  // SVG Animation Paths
  const circlePath = "M18,2.0845 a 15.9155,15.9155 0 0 1 0,31.831 a 15.9155,15.9155 0 0 1 0,-31.831";
  const linePath = "M2,20 L40,20";
  // Sample projects - replace with your own
  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce API',
      description: 'Modern RESTful API for e-commerce platforms with cart management and payment processing',
      technologies: ['Node.js', 'Express', 'MongoDB', 'Stripe'],
      image: 'https://plus.unsplash.com/premium_photo-1661420900517-301eda8d0e87?q=80&w=1470&auto=format&fit=crop',
      detailedDescription: 'A comprehensive API service with user authentication, product management, shopping cart functionality, and secure payment processing. Designed with scalability in mind to support growing businesses.',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com/api-docs',
      features: [
        'JWT Authentication',
        'Product search with filters',
        'Cart management system',
        'Stripe payment integration',
        'Order tracking',
        'Admin dashboard API'
      ],
      color: '#3a86ff'
    },
    {
      id: 4,
      title: 'Learning Management System',
      description: 'Full-stack educational platform with course management and student tracking',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'GraphQL'],
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1374&auto=format&fit=crop',
      detailedDescription: 'A comprehensive learning management system built for educational institutions. Features include course creation, student enrollment, progress tracking, assignment submission, and performance analytics.',
      githubUrl: 'https://github.com',
      features: [
        'Content management system',
        'Student enrollment and tracking',
        'Assignment submission and grading',
        'Discussion forums',
        'Progress reports and analytics',
        'Interactive quizzes and assessments'
      ],
      color: '#ff006e'
    },
    {
      id: 6,
      title: 'Inventory Management System',
      description: 'Scalable inventory tracking system with barcode scanning and reports',
      technologies: ['C#', '.NET Core', 'SQL Server', 'Blazor'],
      image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=1470&auto=format&fit=crop',
      detailedDescription: 'A robust inventory management solution designed for retail and warehouse operations. Features include real-time stock tracking, barcode scanning, purchase order management, and detailed reporting.',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      features: [
        'Real-time inventory tracking',
        'Barcode and QR code scanning',
        'Purchase order management',
        'Supplier database integration',
        'Low stock alerts and forecasting',
        'Custom reporting and analytics'
      ],
      color: '#06d6a0'
    }
  ];

  // All unique technologies for filtering
  const allTechnologies = Array.from(new Set(projects.flatMap(project => project.technologies)));

  // Filtered projects based on active category
  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.technologies.includes(activeCategory));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <div ref={containerRef} className="py-5">
      {/* Hero Section with Parallax */}
      <div className="position-relative overflow-hidden mb-5" style={{ height: '40vh', minHeight: '300px' }}>
        <motion.div 
          className="position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <h1 className="display-3 fw-bold mb-3">
            <span className="text-gradient">Projelerim</span>
          </h1>
          <p className="lead col-md-8 mx-auto">
            Profesyonel gelişimimim boyunca çalıştığım projelerden bazıları
          </p>
        </motion.div>

        {/* Animated SVG Background */}
        <div className="position-absolute w-100 h-100 top-0 start-0 z-n1">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            {[...Array(12)].map((_, i) => (
              <motion.circle
                key={i}
                cx={10 + (i % 4) * 30}
                cy={10 + Math.floor(i / 4) * 30}
                r={2 + Math.random() * 5}
                fill="none"
                stroke="var(--accent-color)"
                strokeOpacity={0.1 + Math.random() * 0.2}
                strokeWidth="0.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 1.5, 1], 
                  opacity: [0, 0.8, 0, 0],
                  transition: { 
                    duration: 5 + Math.random() * 5,
                    repeat: Infinity,
                    delay: i * 0.5
                  }
                }}
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <motion.path
                key={`path-${i}`}
                d={`M${10 + Math.random() * 80},${10} C${20 + Math.random() * 60},${20 + Math.random() * 20} ${40 + Math.random() * 30},${60 + Math.random() * 30} ${80 + Math.random() * 10},${90}`}
                fill="none"
                stroke="var(--gradient-start)"
                strokeOpacity={0.05 + Math.random() * 0.1}
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1], 
                  opacity: [0, 0.5, 0],
                  transition: { 
                    duration: 8 + Math.random() * 5,
                    repeat: Infinity,
                    delay: i * 1.2
                  }
                }}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Technology Filter */}
      <div className="container mb-5">
        <div className="d-flex flex-wrap justify-content-center gap-2 pb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory("all")}
            className={`btn ${activeCategory === "all" ? 'btn-primary' : 'btn-outline-secondary'} rounded-pill px-3 py-2`}
          >
            Tümü
          </motion.button>
          
          {allTechnologies.map((tech) => (
            <motion.button
              key={tech}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(tech)}
              className={`btn ${activeCategory === tech ? 'btn-primary' : 'btn-outline-secondary'} rounded-pill px-3 py-2`}
            >
              {tech}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container pb-5">
        <motion.div 
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project) => (
            <div key={project.id} className="col-md-6 col-lg-4">
              <motion.div 
                className="card h-100 project-card border-0 shadow-sm"
                variants={cardVariants}
                whileHover="hover"
                onClick={() => setSelectedProject(project)}
                style={{
                  cursor: 'pointer',
                  perspective: '1000px',
                }}
              >
                <div className="project-card-inner">
                  <div className="project-card-front">
                    <div 
                      className="card-img-top position-relative overflow-hidden"
                      style={{ height: '180px' }}
                    >
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-100 h-100 object-fit-cover"
                        style={{ objectPosition: 'center' }}
                      />
                      <div 
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{ 
                          backgroundColor: `${project.color}25`,
                          backgroundImage: `linear-gradient(45deg, ${project.color}30, transparent)` 
                        }}
                      ></div>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h3 className="card-title h5 mb-3">{project.title}</h3>
                      <p className="card-text flex-grow-1">{project.description}</p>
                      
                      <div className="d-flex flex-wrap gap-2 mt-2 mb-3">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span 
                            key={tech}
                            className="badge rounded-pill"
                            style={{ 
                              backgroundColor: project.color,
                              fontSize: '0.7rem' 
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="badge bg-secondary rounded-pill" style={{ fontSize: '0.7rem' }}>
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-auto">
                        <button className="btn btn-sm btn-outline-primary w-100">
                          Detayları Göster
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="modal-backdrop position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.85)', 
              backdropFilter: 'blur(5px)',
              zIndex: 1050 
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              className="container"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="card border-0">
                    <div className="row g-0">
                      {/* Image Side */}
                      <div className="col-md-5 position-relative">
                        <div className="h-100 position-relative overflow-hidden" style={{ minHeight: '300px' }}>
                          <img 
                            src={selectedProject.image} 
                            alt={selectedProject.title}
                            className="w-100 h-100 object-fit-cover"
                          />
                          <div 
                            className="position-absolute top-0 start-0 w-100 h-100" 
                            style={{ 
                              background: `linear-gradient(135deg, ${selectedProject.color}50 0%, transparent 100%)`,
                            }}
                          ></div>
                        </div>
                        <button 
                          className="position-absolute top-0 end-0 btn btn-sm btn-dark m-3 rounded-circle p-2"
                          onClick={() => setSelectedProject(null)}
                          aria-label="Close"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                          </svg>
                        </button>
                      </div>
                      
                      {/* Content Side */}
                      <div className="col-md-7">
                        <div className="card-body p-4">
                          <h2 className="card-title h3 fw-bold">
                            {selectedProject.title}
                          </h2>
                          
                          <div className="d-flex flex-wrap gap-2 mt-2 mb-3">
                            {selectedProject.technologies.map((tech) => (
                              <span 
                                key={tech}
                                className="badge rounded-pill"
                                style={{ backgroundColor: selectedProject.color }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          <p className="card-text">{selectedProject.detailedDescription}</p>
                          
                          <div className="mt-4 mb-4">
                            <h3 className="h5 fw-bold">Özellikler</h3>
                            <ul className="list-group list-group-flush">
                              {selectedProject.features.map((feature, index) => (
                                <motion.li 
                                  key={index} 
                                  className="list-group-item bg-transparent border-start-0 border-end-0"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <div className="d-flex">
                                    <div className="me-2">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill={selectedProject.color} className="bi bi-check-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                      </svg>
                                    </div>
                                    {feature}
                                  </div>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                            <div className="d-flex flex-wrap gap-2">
                            {selectedProject.liveUrl && (
                              <motion.a 
                                href={selectedProject.liveUrl}
                                className="btn btn-primary d-flex align-items-center"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-right-square me-2" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"/>
                                </svg>
                                Canlı Demo
                              </motion.a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* SVG Decoration - Bottom */}
      <div className="svg-decoration position-relative overflow-hidden mt-5" style={{ height: '200px' }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0 }}>
          <motion.path
            d="M0,100 L100,100 L100,20 C75,40 50,0 25,20 L0,40 Z"
            fill="var(--background-light)"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.3, y: 0 }}
            transition={{ duration: 1.5 }}
          />
          <motion.path
            d="M0,100 L100,100 L100,40 C85,20 60,60 35,30 L0,60 Z"
            fill="var(--background-light)"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.2, y: 0 }}
            transition={{ duration: 1.8, delay: 0.2 }}
          />
        </svg>
      </div>      <style>
        {`
        .text-gradient {
          background: linear-gradient(90deg, var(--accent-color) 0%, var(--gradient-end) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .project-card {
          transform-style: preserve-3d;
          transition: all 0.5s ease;
        }
        
        .project-card:hover {
          transform: translateY(-10px) rotateY(5deg);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
        }
        
        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .modal-backdrop {
          z-index: 1500;
        }
        
        .object-fit-cover {
          object-fit: cover;
        }
        `}
      </style>
    </div>
  );
};

export default ProjectsPage;