import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import '../styles/ContactPage.css';
import '../styles/ContactPageFixes.css';

const ContactPage = () => {  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  useEffect(() => {
    // GSAP animation for content elements
    const tl = gsap.timeline();
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )    .fromTo(
      infoRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  // Animation variants for framer-motion elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Social media links with svg icons
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
        </svg>
      )
    },
    {
      name: 'Email',
      url: 'mailto:contact@example.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
        </svg>
      )
    }
  ];  return (
    <div className="page-container py-3 py-md-4 py-lg-5 contact-page-container">
      <div className="container mt-3 mt-sm-4 mt-md-5 pt-2 pt-md-3 pt-lg-4 px-3 px-md-4 contact-page-container"
        style={{ overflowX: 'hidden', maxWidth: '100%' }}>
        {/* Page Title with animated underline */}        <div className="text-center mb-4 mb-md-5">
          <motion.h1 
            ref={titleRef}
            className="display-5 display-md-4 fw-bold position-relative d-inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ 
              fontSize: 'clamp(2rem, 1.5rem + 2vw, 3.5rem)',
              lineHeight: '1.2'
            }}
          >
            İletişim
            <motion.div 
              className="position-absolute"
              style={{
                height: 'calc(3px + 0.2vw)',
                width: '100%',
                bottom: 'calc(-6px - 0.2vw)',
                left: 0,
                background: 'linear-gradient(90deg, var(--gradient-start), var(--gradient-end))',
                borderRadius: '2px'
              }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.h1>
          <motion.p 
            className="lead mt-3 px-2 px-md-0 text-secondary mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ 
              fontSize: 'clamp(1rem, 0.85rem + 0.5vw, 1.25rem)',
              maxWidth: '700px',
              lineHeight: '1.5'
            }}
          >
            Benimle iletişime geçmek için aşağıdaki formu doldurabilir veya sosyal medya hesaplarımdan bana ulaşabilirsiniz.
          </motion.p>
        </div>

        <div className="row g-4 g-lg-5 justify-content-center">
          {/* Contact Form */}          <motion.div 
            className="col-lg-6 order-2 order-lg-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="card border-0 shadow-sm" 
              style={{ 
                backgroundColor: 'var(--card-bg)', 
                backdropFilter: 'blur(10px)',
                borderRadius: 'calc(0.375rem + 0.1vw)'
              }}
            >
              <div className="card-body p-3 p-sm-4 p-md-4 p-lg-5">
                <h3 className="mb-4" style={{ 
                  color: 'var(--accent-color)',
                  fontSize: 'calc(1.3rem + 0.3vw)',
                  fontWeight: '600'
                }}>Mesaj Gönderin</h3>
                
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="row g-2 g-md-3">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control bg-opacity-10"
                          style={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                            color: 'var(--text-color)',
                            fontSize: 'calc(0.9rem + 0.1vw)',
                            height: 'calc(3rem + 0.2vw)'
                          }}
                          id="nameInput"
                          name="name"
                          placeholder="Adınız"
                          value={formState.name}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="nameInput" style={{ 
                          color: 'var(--text-color)',
                          fontSize: 'calc(0.85rem + 0.1vw)',
                          padding: '0.75rem 1rem'
                        }}>Adınız</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control bg-opacity-10"
                          style={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                            color: 'var(--text-color)',
                            fontSize: 'calc(0.9rem + 0.1vw)',
                            height: 'calc(3rem + 0.2vw)'
                          }}
                          id="emailInput"
                          name="email"
                          placeholder="E-posta Adresiniz"
                          value={formState.email}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="emailInput" style={{ 
                          color: 'var(--text-color)',
                          fontSize: 'calc(0.85rem + 0.1vw)',
                          padding: '0.75rem 1rem'
                        }}>E-posta Adresiniz</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control bg-opacity-10"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                        color: 'var(--text-color)',
                        fontSize: 'calc(0.9rem + 0.1vw)',
                        height: 'calc(3rem + 0.2vw)'
                      }}
                      id="subjectInput"
                      name="subject"
                      placeholder="Konu"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="subjectInput" style={{ 
                      color: 'var(--text-color)',
                      fontSize: 'calc(0.85rem + 0.1vw)',
                      padding: '0.75rem 1rem'
                    }}>Konu</label>
                  </div>
                  
                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control bg-opacity-10"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                        color: 'var(--text-color)',
                        height: 'calc(120px + 2vw)',
                        minHeight: 'calc(120px + 2vw)',
                        fontSize: 'calc(0.9rem + 0.1vw)',
                        padding: '1rem'
                      }}
                      id="messageInput"
                      name="message"
                      placeholder="Mesajınız"
                      value={formState.message}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="messageInput" style={{ 
                      color: 'var(--text-color)',
                      fontSize: 'calc(0.85rem + 0.1vw)',
                      padding: '1rem'
                    }}>Mesajınız</label>
                  </div>
                    <motion.div 
                    className="mt-4 d-flex flex-column flex-sm-row align-items-center w-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.button
                      type="submit"
                      className="btn px-4 py-2 w-100 w-sm-auto"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        background: 'linear-gradient(90deg, var(--gradient-start), var(--gradient-end))',
                        color: '#fff',
                        borderRadius: '30px',
                        fontSize: 'calc(0.9rem + 0.1vw)',
                        minWidth: 'calc(100px + 2vw)',
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Gönderiliyor...
                        </>
                      ) : 'Gönder'}
                    </motion.button>
                      {submitStatus === 'success' && (
                      <motion.span 
                        className="ms-sm-3 mt-3 mt-sm-0 text-success text-center w-100 w-sm-auto"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-check-circle me-2 d-inline-block" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                          <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                        </svg>
                        <span style={{ fontSize: 'calc(0.85rem + 0.1vw)' }}>Mesajınız başarıyla gönderildi!</span>
                      </motion.span>
                    )}
                    
                    {submitStatus === 'error' && (
                      <motion.span 
                        className="ms-sm-3 mt-3 mt-sm-0 text-danger text-center w-100 w-sm-auto"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-exclamation-circle me-2 d-inline-block" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                        </svg>
                        <span style={{ fontSize: 'calc(0.85rem + 0.1vw)' }}>Bir hata oluştu, lütfen tekrar deneyin.</span>
                      </motion.span>
                    )}
                  </motion.div>
                </form>
              </div>
            </div>          </motion.div>
            {/* Contact Information */}          <div className="col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">            <motion.div 
              ref={infoRef}
              className="card border-0 shadow-sm h-100 contact-card" 
              style={{ 
                backgroundColor: 'var(--card-bg)', 
                backdropFilter: 'blur(10px)',
                maxWidth: '100%',
                margin: '0 auto',
                borderRadius: 'calc(0.375rem + 0.1vw)',
                overflow: 'hidden' // Taşmaları engeller
              }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >              <div className="card-body p-3 p-sm-4 p-md-4 p-lg-5 h-100" style={{ overflowX: 'hidden' }}>                <h2 className="h3 mb-2 text-center text-sm-start" style={{ 
                  color: 'var(--accent-color)', 
                  fontWeight: 600,
                  fontSize: 'clamp(1.2rem, 1rem + 1vw, 1.5rem)', // Responsive boyut
                  maxWidth: '100%'
                }}>İletişim Bilgileri</h2>
                
                <p className="text-center text-sm-start mb-4" style={{
                  color: 'var(--text-color)',
                  opacity: 0.8,
                  fontSize: 'clamp(0.875rem, 0.8rem + 0.2vw, 1rem)', // Responsive boyut
                  maxWidth: '100%', // Taşmayı önle
                  wordBreak: 'break-word' // Uzun kelimelerin taşmasını önle
                }}>
                  Sorularınız için bana aşağıdaki iletişim kanallarından ulaşabilirsiniz.
                </p>                  <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="d-flex flex-column gap-3 gap-md-4 contact-info-container"
                  style={{ maxWidth: '100%', overflowX: 'hidden' }}
                ><motion.div variants={itemVariants} className="d-flex align-items-start align-items-sm-center flex-column flex-sm-row">
                    <div className="rounded-circle d-flex align-items-center justify-content-center mb-2 mb-sm-0" 
                      style={{ 
                        width: 'calc(50px + 1vw)', 
                        height: 'calc(50px + 1vw)', 
                        background: '#0ea5e9',
                        flexShrink: 0
                      }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 24 24">
                        <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
                      </svg>
                    </div>                    <div className="ms-sm-3 w-100" style={{ overflow: 'hidden', wordBreak: 'break-word' }}>
                      <h3 className="h5 mb-0 text-center text-sm-start" style={{ 
                        fontWeight: 600, 
                        fontSize: 'clamp(0.95rem, 0.85rem + 0.2vw, 1.15rem)',
                        maxWidth: '100%'
                      }}>Telefon</h3>
                      <p className="mb-0 text-center text-sm-start" style={{ 
                        color: 'var(--text-color)', 
                        opacity: 0.8,
                        fontSize: 'clamp(0.85rem, 0.8rem + 0.1vw, 1rem)',
                        maxWidth: '100%',
                        overflowWrap: 'break-word'
                      }}>+90 (552) 756 8268</p>
                    </div>
                  </motion.div>
                    <motion.div variants={itemVariants} className="d-flex align-items-start align-items-sm-center flex-column flex-sm-row">
                    <div className="rounded-circle d-flex align-items-center justify-content-center mb-2 mb-sm-0" 
                      style={{ 
                        width: 'calc(50px + 1vw)', 
                        height: 'calc(50px + 1vw)', 
                        background: '#0ea5e9',
                        flexShrink: 0
                      }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 24 24">
                        <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                      </svg>
                    </div>                     <div className="ms-sm-3 w-100 contact-info-text">
                      <h3 className="h5 mb-0 text-center text-sm-start" style={{ 
                        fontWeight: 600,
                        fontSize: 'clamp(0.95rem, 0.85rem + 0.2vw, 1.15rem)'
                      }}>E-posta</h3>
                      <p className="mb-0 text-center text-sm-start text-break contact-email" style={{ 
                        color: 'var(--text-color)', 
                        opacity: 0.8,
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        maxWidth: '100%',
                        fontSize: 'clamp(0.85rem, 0.8rem + 0.1vw, 1rem)'
                      }}>bayramsenbay4068@gmail.com</p>
                    </div>
                  </motion.div>                  <motion.div variants={itemVariants} className="d-flex align-items-start align-items-sm-center flex-column flex-sm-row mb-4">
                    <div className="rounded-circle d-flex align-items-center justify-content-center mb-2 mb-sm-0" 
                      style={{ 
                        width: 'calc(50px + 1vw)', 
                        height: 'calc(50px + 1vw)', 
                        background: '#0ea5e9',
                        flexShrink: 0
                      }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 24 24">
                        <path d="M12,2C8.13,2 5,5.13 5,9c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zM12,11.5c-1.38,0 -2.5,-1.12 -2.5,-2.5s1.12,-2.5 2.5,-2.5 2.5,1.12 2.5,2.5 -1.12,2.5 -2.5,2.5z" />
                      </svg>
                    </div>                    <div className="ms-sm-3 w-100 contact-info-text">
                      <h3 className="h5 mb-0 text-center text-sm-start" style={{ 
                        fontWeight: 600, 
                        fontSize: 'clamp(0.95rem, 0.85rem + 0.2vw, 1.15rem)'
                      }}>Adres</h3>
                      <p className="mb-0 text-center text-sm-start contact-address" style={{ 
                        color: 'var(--text-color)', 
                        opacity: 0.8,
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        fontSize: 'calc(0.875rem + 0.1vw)'
                      }}>Türkiye</p>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="w-100">
                    <h3 className="h5 mb-3 text-center text-sm-start" style={{ fontWeight: 600, fontSize: 'calc(1rem + 0.15vw)' }}>Sosyal Medya</h3>
                    <div className="d-flex flex-wrap justify-content-center justify-content-sm-start gap-3">                      <motion.a 
                        href="https://www.linkedin.com/in/bayram-şenbay-26169b252"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          width: 'calc(45px + 0.8vw)',
                          height: 'calc(45px + 0.8vw)',
                          border: '2px solid #fff',
                          background: 'rgba(10, 102, 194, 0.2)',
                          color: '#fff',
                          transition: 'background-color 0.3s ease'
                        }}
                        aria-label="LinkedIn"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </motion.a>                      <motion.a 
                        href="https://github.com/bayramsn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          width: 'calc(45px + 0.8vw)',
                          height: 'calc(45px + 0.8vw)',
                          border: '2px solid #fff',
                          background: 'rgba(36, 41, 47, 0.2)',
                          color: '#fff',
                          transition: 'background-color 0.3s ease'
                        }}
                        aria-label="GitHub"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </motion.a>                      <motion.a 
                        href="https://www.instagram.com/bayram_senbay?igsh=MWp5bDBrZmdzaXU5eA%3D%3D&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          width: 'calc(45px + 0.8vw)',
                          height: 'calc(45px + 0.8vw)',
                          border: '2px solid #fff',
                          background: 'rgba(225, 48, 108, 0.2)', // Instagram gradiyent rengi
                          color: '#fff',
                          transition: 'background-color 0.3s ease'
                        }}
                        aria-label="Instagram"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </motion.a>

                      <motion.a 
                        href="mailto:bayramsenbay4068@gmail.com"
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          width: 'calc(45px + 0.8vw)',
                          height: 'calc(45px + 0.8vw)',
                          border: '2px solid #fff',
                          background: 'rgba(234, 67, 53, 0.2)',
                          color: '#fff',
                          transition: 'background-color 0.3s ease'
                        }}
                        aria-label="Email"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                        </svg>
                      </motion.a>
                    </div>
                  </motion.div>
                </motion.div>
              </div>            </motion.div>
          </div>
        </div>
      </div>      {/* Decorative Elements - Gradient Circles */}
      <div className="position-fixed d-none d-lg-block" style={{
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(58, 134, 255, 0.15) 0%, rgba(0, 191, 166, 0.05) 50%, rgba(0, 0, 0, 0) 70%)',
        bottom: '-250px',
        left: '-250px',
        zIndex: -1,
        pointerEvents: 'none'
      }}></div>
      
      {/* Mobile decorative element - smaller size */}
      <div className="position-fixed d-block d-lg-none" style={{
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(58, 134, 255, 0.15) 0%, rgba(0, 191, 166, 0.05) 50%, rgba(0, 0, 0, 0) 70%)',
        bottom: '-150px',
        left: '-150px',
        zIndex: -1,
        pointerEvents: 'none'
      }}></div>
      
      {/* Additional decorative element - top right */}
      <div className="position-fixed d-none d-lg-block" style={{
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 191, 166, 0.1) 0%, rgba(58, 134, 255, 0.05) 50%, rgba(0, 0, 0, 0) 70%)',
        top: '0',
        right: '0',
        zIndex: -1,
        pointerEvents: 'none'
      }}></div>
      
      {/* Decorative Element - Gradient Circle */}
      <div className="position-fixed d-none d-lg-block" style={{
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 191, 166, 0.15) 0%, rgba(58, 134, 255, 0.05) 50%, rgba(0, 0, 0, 0) 70%)',
        top: '-200px',
        right: '-200px',
        zIndex: -1,
        pointerEvents: 'none'
      }}></div>
      
      {/* Mobile decorative elements - smaller and positioned differently */}
      <div className="position-fixed d-block d-lg-none" style={{
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(58, 134, 255, 0.15) 0%, rgba(0, 191, 166, 0.05) 50%, rgba(0, 0, 0, 0) 70%)',
        bottom: '-125px',
        left: '-125px',
        zIndex: -1,
        pointerEvents: 'none'
      }}></div>
      
      <div className="position-fixed d-block d-lg-none" style={{
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 191, 166, 0.15) 0%, rgba(58, 134, 255, 0.05) 50%, rgba(0, 0, 0, 0) 70%)',
        top: '-100px',
        right: '-100px',
        zIndex: -1,
        pointerEvents: 'none'
      }}></div>    </div>
  );
};

export default ContactPage;
