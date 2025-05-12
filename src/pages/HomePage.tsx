import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptopCode, FaServer, FaDatabase } from 'react-icons/fa';

const HomePage: React.FC = () => {
  return (
    <div className="container py-5">
      {/* Hero Section */}      <section
        className="hero text-center text-light py-5 mb-5"
        style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', borderRadius: '8px' }}
      >
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