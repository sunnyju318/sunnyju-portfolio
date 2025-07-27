import React, { useEffect, useRef, useState } from 'react';
// import './PortfolioCarousel.css';

export default function PortfolioCarousel() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      id: 1,
      title: "Mobile App Design",
      category: "UI/UX",
      description: "Restaurant booking app with modern interface",
      image: "/api/placeholder/300/400",
      tags: ["React Native", "Figma", "UI/UX"]
    },
    {
      id: 2,
      title: "Preloader Animation",
      category: "Frontend",
      description: "CSS-only animated loader with hand-drawn SVGs",
      image: "/api/placeholder/300/400",
      tags: ["HTML", "CSS", "SVG"]
    },
    {
      id: 3,
      title: "Dashboard Design",
      category: "Web Design",
      description: "Analytics dashboard with data visualization",
      image: "/api/placeholder/300/400",
      tags: ["React", "D3.js", "Design"]
    },
    {
      id: 4,
      title: "E-commerce Platform",
      category: "Full Stack",
      description: "Complete online store with payment integration",
      image: "/api/placeholder/300/400",
      tags: ["Next.js", "Node.js", "MongoDB"]
    },
    {
      id: 5,
      title: "Brand Identity",
      category: "Branding",
      description: "Complete brand package for tech startup",
      image: "/api/placeholder/300/400",
      tags: ["Illustrator", "Photoshop", "Branding"]
    }
  ];

  const updateCarousel = (centerIndex) => {
    const itemCount = projects.length;
    const centerX = 400;
    const centerY = 300;

    itemsRef.current.forEach((el, i) => {
      if (!el) return;

      // 중앙 기준으로 인덱스 재정렬
      let adjustedIndex = (i - centerIndex + itemCount) % itemCount;
      if (adjustedIndex > itemCount / 2) {
        adjustedIndex = adjustedIndex - itemCount;
      }

      // 가로형 원형 배치 (넓게 펼쳐진 타원)
      const angle = (adjustedIndex * Math.PI) / 4; // 각도 범위를 줄여서 더 가로형으로
      const x = centerX + adjustedIndex * 180 + Math.sin(angle) * 50; // 가로 간격 + 살짝 곡선
      const y = centerY + Math.abs(Math.sin(angle)) * -30; // 중앙이 앞으로, 양쪽이 뒤로

      // 중앙 카드는 더 크고 앞으로
      const scale = i === centerIndex ? 1.1 : 0.9 - Math.abs(adjustedIndex) * 0.1;
      const zIndex = 100 - Math.abs(adjustedIndex) * 10;
      const opacity = i === centerIndex ? 1 : 0.7 - Math.abs(adjustedIndex) * 0.1;

      el.style.transform = `translate(${x - centerX}px, ${y - centerY}px) scale(${scale})`;
      el.style.zIndex = zIndex;
      el.style.opacity = Math.max(opacity, 0.3);
      el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  };

  useEffect(() => {
    updateCarousel(activeIndex);
  }, [activeIndex, projects.length]);

  const handleCardHover = (index) => {
    setActiveIndex(index);
  };

  const handleCardClick = (project) => {
    // 상세 페이지로 이동하는 로직
    alert(`Navigating to ${project.title} detail page`);
    // 실제로는 router.push('/project/' + project.id) 같은 방식으로 구현
  };

  return (
    <div className="portfolio-container">
      <header className="header">
        <h1>See my recent works</h1>
        <div className="decorative-dots">
          <span></span><span></span><span></span>
        </div>
      </header>

      <div className="carousel-section">
        <div className="section-title">
          <span className="dev-label">Dev</span>
          <div className="diamond-accent"></div>
        </div>

        <div ref={containerRef} className="carousel-wrapper">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`carousel-card ${index === activeIndex ? 'active' : ''}`}
              onMouseEnter={() => handleCardHover(index)}
              onClick={() => handleCardClick(project)}
            >
              <div className="card-image">
                <div className="placeholder-image">
                  <span className="project-icon">{project.category.charAt(0)}</span>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">{project.title}</h3>
                <p className="card-category">{project.category}</p>
                <p className="card-description">{project.description}</p>
                <div className="card-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-indicators">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .portfolio-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
          color: #ffffff;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow-x: hidden;
        }

        .header {
          text-align: center;
          padding: 60px 20px 40px;
        }

        .header h1 {
          font-size: 2.5rem;
          font-weight: 300;
          margin-bottom: 20px;
          color: #ff6b6b;
        }

        .decorative-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .decorative-dots span {
          width: 8px;
          height: 8px;
          background: #ff6b6b;
          transform: rotate(45deg);
          display: block;
        }

        .carousel-section {
          position: relative;
          padding: 40px 20px;
        }

        .section-title {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
        }

        .section-title .dev-label {
          font-size: 2rem;
          font-weight: 500;
          color: #cccccc;
        }

        .section-title .diamond-accent {
          width: 12px;
          height: 12px;
          background: #ff6b6b;
          transform: rotate(45deg);
          margin: 15px auto;
        }

        .carousel-wrapper {
          position: relative;
          height: 500px;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-card {
          position: absolute;
          width: 280px;
          height: 380px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .carousel-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 107, 107, 0.3);
          transform: translateY(-10px) !important;
        }

        .carousel-card.active {
          border-color: rgba(255, 107, 107, 0.5);
          box-shadow: 
            0 20px 60px rgba(255, 107, 107, 0.1),
            0 0 40px rgba(255, 107, 107, 0.05);
        }

        .card-image {
          height: 200px;
          position: relative;
          overflow: hidden;
        }

        .card-image .placeholder-image {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .card-image .placeholder-image .project-icon {
          font-size: 3rem;
          font-weight: bold;
          color: white;
          opacity: 0.8;
        }

        .card-content {
          padding: 24px;
          height: 180px;
          display: flex;
          flex-direction: column;
        }

        .card-content .card-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: #ffffff;
        }

        .card-content .card-category {
          font-size: 0.9rem;
          color: #ff6b6b;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .card-content .card-description {
          font-size: 0.9rem;
          color: #cccccc;
          line-height: 1.5;
          margin-bottom: 16px;
          flex-grow: 1;
        }

        .card-content .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .card-content .card-tags .tag {
          background: rgba(255, 107, 107, 0.1);
          color: #ff8e8e;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          border: 1px solid rgba(255, 107, 107, 0.2);
        }

        .carousel-indicators {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 50px;
        }

        .carousel-indicators .indicator {
          width: 8px;
          height: 8px;
          border: none;
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(45deg);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .carousel-indicators .indicator.active {
          background: #ff6b6b;
          transform: rotate(45deg) scale(1.2);
        }

        .carousel-indicators .indicator:hover {
          background: rgba(255, 107, 107, 0.7);
        }

        @media (max-width: 768px) {
          .carousel-wrapper {
            height: 400px;
          }
          
          .carousel-card {
            width: 240px;
            height: 320px;
          }
          
          .card-content {
            padding: 20px;
            height: 140px;
          }
          
          .header h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}