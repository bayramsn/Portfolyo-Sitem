import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptopCode, FaServer, FaDatabase } from 'react-icons/fa';
import { useBlobProfileImage } from '../assets/profileBlobUtils';
import '../styles/secure-image.css';

const HomePage: React.FC = () => {
  const blobProfileImageUrl = useBlobProfileImage();
  return (    <div className="container py-5">
      {/* Hero Section */}      <section
        className="hero text-center text-light py-5 mb-5"
        style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', borderRadius: '8px' }}
      >
        <div className="d-flex justify-content-center mb-4">
          <div 
            className="rounded-circle overflow-hidden border-3 border-light shadow-lg"
            style={{ width: '150px', height: '150px' }}
          >            <img 
              src={blobProfileImageUrl || ''} 
              alt="Bayram Şenbay" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}              onContextMenu={(e) => e.preventDefault()} /* Sağ tıkla indirmeyi engelle */
              draggable="false" /* Sürükle-bırak yoluyla indirmeyi engelle */
              className="no-download-image" /* İndirmeyi engelleyen sınıf */
            />
          </div>
        </div>
        <h1 className="display-4 fw-bold">Ölçeklenebilir Web Çözümleri</h1>
        <p className="lead mt-3">Backend'den frontend'e yenilikçi geliştirme.</p>
        <Link to="/projects" className="btn btn-outline-light btn-lg mt-4">
          Çalışmalarımı Gör
        </Link>
      </section>

      {/* Feature Cards */}
      <section className="features">
        <div className="row gy-4">          <div className="col-md-4">
            <div className="card h-100 text-center p-4 shadow-sm border-0">
              <FaLaptopCode size={48} className="mb-3 text-primary" />
              <h5 className="mb-2">Frontend Geliştirme</h5>
              <p className="text-muted">React ve modern çerçevelerle oluşturulmuş duyarlı ve dinamik kullanıcı arayüzleri.</p>
            </div>
          </div>          <div className="col-md-4">
            <div className="card h-100 text-center p-4 shadow-sm border-0">
              <FaServer size={48} className="mb-3 text-success" />
              <h5 className="mb-2">Backend Mimarisi</h5>
              <p className="text-muted">Node.js, Express ve mikroservislerle güçlü sunucu taraflı çözümler.</p>
            </div>
          </div>          <div className="col-md-4">
            <div className="card h-100 text-center p-4 shadow-sm border-0">
              <FaDatabase size={48} className="mb-3 text-warning" />
              <h5 className="mb-2">Veritabanı Tasarımı</h5>
              <p className="text-muted">SQL ve NoSQL veritabanları ile verimli veri modellemesi ve yönetimi.</p>
            </div>
          </div>
        </div>
      </section>      {/* Call To Action */}
      <section className="text-center mt-5">
        <h2 className="mb-4">Birlikte çalışmak ister misiniz?</h2>
        <Link to="/contact" className="btn btn-primary btn-lg">
          İletişime Geç
        </Link>
      </section>
    </div>
  );
};

export default HomePage;