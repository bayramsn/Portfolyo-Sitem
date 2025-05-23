import React, { useState } from 'react';

const CertificatesPage: React.FC = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);
  
  // Helper function to convert Google Drive view links to embed links
  const getEmbedUrl = (url: string): string => {
    if (url.includes('drive.google.com/file/d/')) {
      // Extract file ID from Google Drive URL
      const fileIdMatch = url.match(/\/d\/([^/]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
      }
    }
    
    // Return the original URL if it's not a Google Drive link or can't be parsed
    return url;
  };
  
  // Sertifika verileriniz
  const certificates = [
    {
      id: 1,
      title: "Python Programming for Data Science",
      issuer: "Miuul",
      date: "2024",
      link: "https://drive.google.com/file/d/1mfRXSlg-Q5mvLYmcEHIgNKY8ykFKaAWU/view",
      embedLink: getEmbedUrl("https://drive.google.com/file/d/1mfRXSlg-Q5mvLYmcEHIgNKY8ykFKaAWU/view")
    },
    {
      id: 2,
      title: "Miuul Data Science & Machine Learning Bootcamp",
      issuer: "Miuul",
      date: "2024",
      link: "https://certificate.miuul.com/bayram_senbay",
      embedLink: "https://certificate.miuul.com/bayram_senbay"
    },
    {
      id: 3,
      title: "Miuul Machine Learning",
      issuer: "Miuul",
      date: "2024",
      link: "https://drive.google.com/file/d/1XBhxlp_o6QecQA-7RL9zxe63f54VhK76/view",
      embedLink: getEmbedUrl("https://drive.google.com/file/d/1XBhxlp_o6QecQA-7RL9zxe63f54VhK76/view")
    },
    {
      id: 4,
      title: "CCNAv7: Introduction to Networks",
      issuer: "Cisco Networking Academy",
      date: "2024",
      link: "https://drive.google.com/file/d/1uhHRYBE5xnVGBxMpdsuloEHz1gmW6YrU/view",
      embedLink: getEmbedUrl("https://drive.google.com/file/d/1uhHRYBE5xnVGBxMpdsuloEHz1gmW6YrU/view")
    },
    {
      id: 5,
      title: "Uygulamalarla SQL Öğreniyorum",
      issuer: "BTK Akademi",
      date: "2024",
      link: "https://drive.google.com/file/d/1UNm2SiJ1JC5CJSbDj6L-oe0wQgz8Kw2v/view",
      embedLink: getEmbedUrl("https://drive.google.com/file/d/1UNm2SiJ1JC5CJSbDj6L-oe0wQgz8Kw2v/view")
    },
    {
      id: 6,
      title: "Data Makine Öğrenmesi 101 (ML 101)",
      issuer: "Turkcell Academy",
      date: "2024",
      link: "https://drive.google.com/file/d/1Ag2uWouSptWWTYGIFPMw0QJNRnqYTq5T/view",
      embedLink: getEmbedUrl("https://drive.google.com/file/d/1Ag2uWouSptWWTYGIFPMw0QJNRnqYTq5T/view")
    },
    {
      id: 7,
      title: "Python Programlama 101 (Python 101)",
      issuer: "Turkcell Academy",
      date: "2024",
      link: "https://drive.google.com/file/d/1_X5w3bTzWpJ21s9bsvdVr8vo0nDyK5xh/view",
      embedLink: getEmbedUrl("https://drive.google.com/file/d/1_X5w3bTzWpJ21s9bsvdVr8vo0nDyK5xh/view")
    },
    {
      id: 8,
      title: "Python Programlama 201 (Python 201)",
      issuer: "Turkcell Academy",
      date: "2024",
      link: "https://drive.google.com/file/d/1fGYvi3Lq906QgEHiAJ_ny6DR4CArnF0p/view",
      embedLink: getEmbedUrl("https://drive.google.com/file/d/1fGYvi3Lq906QgEHiAJ_ny6DR4CArnF0p/view")
    },
    {
      id: 9,
      title: "Python Programlama 301 (Python 301)",
      issuer: "Turkcell Academy",
      date: "2024",
      link: "https://drive.google.com/file/d/1P1o4rSdm6mAme75zClSmoozfqNrDnD4E/view",
      embedLink: getEmbedUrl("https://drive.google.com/file/d/1P1o4rSdm6mAme75zClSmoozfqNrDnD4E/view")
    },
    {
      id: 10,
      title: "Python Programlama 401 (Python 401)",
      issuer: "Turkcell Academy",
      date: "2024",
      link: "https://drive.google.com/file/d/19D7Gt_RlH0YhkLfaJXpCjNO2zr_GEMRe/view",
      embedLink: getEmbedUrl("https://drive.google.com/file/d/19D7Gt_RlH0YhkLfaJXpCjNO2zr_GEMRe/view")
    }
  ];
  
  // Handle certificate click to show preview
  const handleCertificateClick = (id: number) => {
    setSelectedCertificate(selectedCertificate === id ? null : id);
  };

  // Close preview
  const closePreview = () => {
    setSelectedCertificate(null);
  };

  return (
    <div className="container py-5">
      <h1 className="display-4 fw-bold text-center mb-5">
        <span className="text-gradient">Sertifikalarım</span>
      </h1>
      
      <p className="text-center mb-5">
        Sürekli öğrenme ve kendimi geliştirme tutkumun bir parçası olarak aldığım sertifikalar
      </p>

      <div className="row g-4">
        {certificates.map(certificate => (
          <div key={certificate.id} className="col-md-6 col-lg-4">
            <div 
              className={`card h-100 border-0 shadow-sm ${selectedCertificate === certificate.id ? 'selected' : ''}`}
              onClick={() => handleCertificateClick(certificate.id)}
            >
              <div className="certificate-preview">
                {selectedCertificate === certificate.id ? (
                  <div className="certificate-iframe-container">
                    <iframe 
                      src={certificate.embedLink} 
                      title={certificate.title}
                      className="certificate-iframe"
                      allowFullScreen
                    />
                    <button 
                      className="close-preview-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        closePreview();
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="certificate-placeholder d-flex align-items-center justify-content-center">
                    <div className="certificate-icon text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-award" viewBox="0 0 16 16">
                        <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/>
                        <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                      </svg>
                      <p className="mt-2 mb-0">Sertifikayı Görüntülemek İçin Tıklayın</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="card-body">
                <h5 className="card-title">{certificate.title}</h5>
                <p className="card-text mb-1 text-muted">{certificate.issuer}</p>
                <p className="card-text"><small className="text-muted">{certificate.date}</small></p>
                <a 
                  href={certificate.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline-primary mt-2 w-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  Sertifikayı Tam Boyutta Aç
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>      <style>{`
        .text-gradient {
          background: linear-gradient(90deg, var(--accent-color) 0%, var(--gradient-end) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .certificate-preview {
          overflow: hidden;
          height: 250px;
          position: relative;
        }
        
        .certificate-placeholder {
          height: 100%;
          background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
        }
        
        .certificate-iframe-container {
          position: relative;
          height: 100%;
          width: 100%;
        }
        
        .certificate-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        
        .close-preview-btn {
          position: absolute;
          top: 5px;
          right: 5px;
          background: rgba(0, 0, 0, 0.5);
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
          cursor: pointer;
          z-index: 10;
        }
        
        .close-preview-btn:hover {
          background: rgba(0, 0, 0, 0.7);
        }
        
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
        
        .card.selected {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  );
};

export default CertificatesPage;