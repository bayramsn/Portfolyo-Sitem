import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const AboutPage = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animation for content elements
    const tl = gsap.timeline();
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(
      skillsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );
  }, []);

  // Backend technologies you're skilled in
  const skills = [
    { name: 'Node.js', level: 90, icon: '⚙️' },
    { name: 'Express.js', level: 85, icon: '🚀' },
    { name: 'ASP.NET Core', level: 80, icon: '🔷' },
    { name: 'MongoDB', level: 75, icon: '🍃' },
    { name: 'PostgreSQL', level: 85, icon: '🐘' },
    { name: 'Docker', level: 70, icon: '🐳' },
    { name: 'Kubernetes', level: 65, icon: '⚓' },
    { name: 'CI/CD', level: 75, icon: '⚡' },
    { name: 'Microservices', level: 80, icon: '🔌' },
    { name: 'API Design', level: 90, icon: '📊' },
  ];

  const languages = [
    { name: 'JavaScript', years: 4, icon: '📜' },
    { name: 'TypeScript', years: 3, icon: '🔷' },
    { name: 'C#', years: 4, icon: '🔶' },
    { name: 'Python', years: 2, icon: '🐍' },
    { name: 'SQL', years: 5, icon: '📊' },
    { name: 'Go', years: 1, icon: '🔹' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen py-16">
      {/* Hero section */}
      <section className="mb-5 pt-5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-5"
          >
            <h1 
              ref={titleRef}
              className="display-4 fw-bold mb-3"
            >
              <span className="text-gradient">Hakkımda</span>
            </h1>
            <p className="lead mb-0 col-lg-8 mx-auto opacity-75">
              Backend geliştirme uzmanı olarak, güçlü ve ölçeklenebilir sistemler tasarlıyorum.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Profile section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            {/* Profile content */}
            <motion.div 
              ref={contentRef}
              className="col-lg-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="card p-4 p-lg-5 h-100">
                <h2 className="text-gradient fs-1 fw-bold mb-4 pb-2 border-bottom border-opacity-25">Ben Kimim?</h2>
                
                <div className="mb-4">
                  <div className="feature-item mb-4 d-flex align-items-start">
                    <div className="feature-icon rounded-circle bg-gradient me-3 p-3 d-flex align-items-center justify-content-center">
                      <span className="fs-4">🎓</span>
                    </div>
                    <div>
                      <h3 className="fs-5 fw-bold mb-2">Eğitim Yolculuğum</h3>
                      <p className="opacity-75">
                        Necmettin Erbakan Üniversitesi'nde <span className="fw-medium text-accent">Yönetim Bilişim Sistemleri</span> 
                        öğrencisiyim. Veri analitiği ve bilgi yönetimi alanlarında uzmanlaşmayı hedefliyorum.
                      </p>
                    </div>
                  </div>
                  
                  <div className="feature-item mb-4 d-flex align-items-start">
                    <div className="feature-icon rounded-circle bg-gradient me-3 p-3 d-flex align-items-center justify-content-center">
                      <span className="fs-4">💼</span>
                    </div>
                    <div>
                      <h3 className="fs-5 fw-bold mb-2">Profesyonel Deneyim</h3>
                      <p className="opacity-75">
                        MAYLOG Nakliyat ve Lojistik Hizmetleri'nde <span className="fw-medium text-accent">Sosyal Medya Yöneticisi</span> 
                        olarak 2,5+ yıl çalıştım. Bu süreçte proje yönetimi, dijital pazarlama ve içerik stratejileri 
                        konularında kapsamlı deneyim kazandım.
                      </p>
                    </div>
                  </div>
                  
                  <div className="feature-item d-flex align-items-start">
                    <div className="feature-icon rounded-circle bg-gradient me-3 p-3 d-flex align-items-center justify-content-center">
                      <span className="fs-4">🚀</span>
                    </div>
                    <div>
                      <h3 className="fs-5 fw-bold mb-2">Tutkularım</h3>
                      <p className="opacity-75">
                        <span className="fw-medium text-accent">Google Developer Student Club</span> etkinliklerine aktif katılım gösteriyorum.
                        Sürekli kendimi geliştirmek, yeni teknolojileri keşfetmek ve toplulukla bilgi paylaşımı yapmaktan büyük keyif alıyorum.
                      </p>
                    </div>
                  </div>
                </div>
                
                <style>{`
                  .bg-gradient {
                    background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
                  }
                  
                  .feature-icon {
                    width: 48px;
                    height: 48px;
                    flex-shrink: 0;
                    color: white;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                  }
                  
                  .text-accent {
                    color: var(--accent-color);
                  }
                  
                  .border-opacity-25 {
                    border-color: rgba(255, 255, 255, 0.25) !important;
                  }
                `}</style>
                
                {/* Experience timeline */}
                <div className="mt-4">
                  <h3 className="fs-4 fw-bold mb-4">Deneyim & Eğitim</h3>
                  
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="position-relative timeline-container">
                      {/* Timeline line */}
                      <div className="position-absolute h-100" 
                        style={{ 
                          width: '2px', 
                          background: 'linear-gradient(to bottom, var(--gradient-start), var(--gradient-end))',
                          left: '7px',
                          top: '8px'
                        }}
                      ></div>
                      
                      {/* Timeline items */}
                      {/* Social Media Manager Experience */}
                      <motion.div 
                        className="d-flex mb-4"
                        variants={itemVariants}
                      >
                        <div className="timeline-dot"></div>
                        <div className="ms-4">
                          <h4 className="fs-5 fw-bold">Social Media Manager</h4>
                          <p className="text-white-50 mb-1">Oca 2022 - Tem 2024 · 2 yıl 7 ay</p>
                          <p className="opacity-75">MAYLOG Nakliyat ve Lojistik Hizmetleri Tic.Ltd.Şti. · Serbest Çalışan</p>
                          <p className="opacity-75">Proje Yönetimi, Pazarlama ve diğer +11 yetenek</p>
                        </div>
                      </motion.div>
                      {/* Education: Management Information Systems */}
                      <motion.div
                        className="d-flex"
                        variants={itemVariants}
                      >
                        <div className="timeline-dot"></div>
                        <div className="ms-4">
                          <h4 className="fs-5 fw-bold">Lisans Derecesi, Yönetim Bilişim Sistemleri</h4>
                          <p className="text-white-50 mb-1">2022 - 2026</p>
                          <p className="opacity-75">Necmettin Erbakan University</p>
                          <p className="opacity-75">Faaliyet ve Topluluklar: Google Developer Student Club</p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Skills section */}
            <motion.div 
              ref={skillsRef}
              className="col-lg-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="card p-4 p-lg-5 h-100">
                <h2 className="fs-1 fw-bold mb-4">Yeteneklerim</h2>
                
                {/* Technical skills */}
                <div className="mb-5">
                  <h3 className="fs-4 fw-bold mb-4">Teknik Yetenekler</h3>
                  
                  <div className="mb-4">
                    {skills.map((skill, index) => (
                      <div key={skill.name} className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <div className="d-flex align-items-center">
                            <span className="me-2">{skill.icon}</span>
                            <span className="fw-medium">{skill.name}</span>
                          </div>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <motion.div 
                            className="skill-progress"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ 
                              duration: 1.5, 
                              delay: index * 0.1,
                              ease: "easeOut"
                            }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Languages */}
                <div className="mb-4">
                  <h3 className="fs-4 fw-bold mb-4">Programlama Dilleri</h3>
                  
                  <div className="row g-3">
                    {languages.map((lang) => (
                      <div key={lang.name} className="col-6 col-md-4">
                        <motion.div 
                          className="card h-100 text-center p-3"
                          whileHover={{ 
                            y: -5, 
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="fs-2 mb-2">{lang.icon}</div>
                          <h4 className="fs-6 fw-bold mb-1">{lang.name}</h4>
                          <p className="small opacity-75 mb-0">{lang.years} yıl deneyim</p>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Soft skills */}
                <div>
                  <h3 className="fs-4 fw-bold mb-3">Kişisel Yetenekler</h3>
                  
                  <div className="d-flex flex-wrap gap-2">
                    {[
                      'Takım Çalışması', 
                      'Problem Çözme', 
                      'Analitik Düşünme', 
                      'Zaman Yönetimi', 
                      'İletişim',
                      'Adaptasyon'
                    ].map((skill) => (
                      <motion.div
                        key={skill}
                        className="badge fs-6 fw-normal p-2 mb-2"
                        style={{ 
                          background: 'rgba(58, 134, 255, 0.2)', 
                          color: 'var(--accent-color)',
                          borderRadius: '50px',
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          background: 'rgba(58, 134, 255, 0.3)'
                        }}
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Supplemental style for timeline dots */}
      <style>{`
        .timeline-container {
          position: relative;
        }
        
        .timeline-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
          position: relative;
          z-index: 2;
          flex-shrink: 0;
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(var(--accent-color-rgb), 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(var(--accent-color-rgb), 0); }
          100% { box-shadow: 0 0 0 0 rgba(var(--accent-color-rgb), 0); }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;