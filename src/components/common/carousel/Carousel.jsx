import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
/* 두줄을 합쳐서 씀
import React from 'react';
import { useEffect, useRef, useState } from 'react';
*/
import './Carousel.scss';

export default function Carousel() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // 프로젝트 데이터를 useMemo로 최적화
  const projects = useMemo(() => [
    {
      id: 1,
      title: "Mobile App Design",
      category: "UI/UX",
      description: "Restaurant booking app with modern interface",
      tags: ["React Native", "Figma"],
      color: "#ff6b6b"
    },
    {
      id: 2,
      title: "Dashboard Design", 
      category: "Web Design",
      description: "Analytics dashboard with data visualization",
      tags: ["React", "D3.js"],
      color: "#45b7d1"
    },
    {
      id: 3,
      title: "E-commerce Platform",
      category: "Full Stack", 
      description: "Complete online store with payment integration",
      tags: ["Next.js", "Node.js"],
      color: "#96ceb4"
    },
    {
      id: 4,
      title: "Brand Identity",
      category: "Branding",
      description: "Complete brand package for tech startup",
      tags: ["Illustrator", "Photoshop"],
      color: "#feca57"
    },
    {
      id: 5,
      title: "AR Experience",
      category: "Interactive",
      description: "Augmented reality shopping experience",
      tags: ["Three.js", "WebGL"],
      color: "#ff9ff3"
    }
  ], []);

  // Intersection Observer로 뷰포트 내 여부 확인
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 최적화된 애니메이션 함수
  const updateCarousel = useCallback((centerIndex) => {
    if (!isVisible) return; // 화면에 보이지 않으면 애니메이션 중지
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const itemCount = projects.length;
      
      itemsRef.current.forEach((el, i) => {
        if (!el) return;

        let adjustedIndex = (i - centerIndex + itemCount) % itemCount;
        if (adjustedIndex > itemCount / 2) {
          adjustedIndex = adjustedIndex - itemCount;
        }

        // 간소화된 계산으로 성능 향상
        const distance = Math.abs(adjustedIndex);
        const x = adjustedIndex * 140;
        const y = distance * -15;
        const scale = i === centerIndex ? 1.05 : Math.max(0.9 - distance * 0.05, 0.8);
        const opacity = i === centerIndex ? 1 : Math.max(0.7 - distance * 0.1, 0.4);
        const zIndex = 100 - distance * 10;

        // transform을 한 번에 적용하여 reflow 최소화
        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        el.style.opacity = opacity;
        el.style.zIndex = zIndex;
      });
    });
  }, [projects.length, isVisible]);

  // 디바운스된 자동재생
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (!isVisible) return; // 화면에 보이지 않으면 자동재생 중지
    
    autoPlayRef.current = setInterval(() => {
      if (!isHovered) {
        setActiveIndex(prev => (prev + 1) % projects.length);
      }
    }, 5000); // 5초 간격
  }, [isHovered, projects.length, isVisible]);

  useEffect(() => {
    updateCarousel(activeIndex);
  }, [activeIndex, updateCarousel]);

  useEffect(() => {
    if (isVisible) {
      startAutoPlay();
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }
    
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [startAutoPlay, isVisible]);

  const handleCardClick = useCallback((project, index) => {
    if (index === activeIndex) {
      // 이미 중앙에 있는 카드 클릭 시 디테일 페이지로 이동
      console.log(`Opening ${project.title} detail page`);
      // 실제 구현: router.push(`/project/${project.id}`)
      // 또는 window.open(`/project/${project.id}`, '_blank')
    } else {
      // 중앙이 아닌 카드 클릭 시 중앙으로 이동
      setActiveIndex(index);
    }
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % projects.length);
  }, [projects.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex(prev => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  return (
    <div 
      className="portfolio-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel-section">
        <div ref={containerRef} className="carousel-wrapper">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`carousel-card ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleCardClick(project, index)}
            >
              <div className="card-image">
                <div 
                  className="placeholder-image"
                  style={{ backgroundColor: project.color }}
                >
                  <span className="project-icon">{project.category.charAt(0)}</span>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">{project.title}</h3>
                <p className="card-category">{project.category}</p>
                <p className="card-description">{project.description}</p>
                <div className="card-tags">
                  {project.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-bottom">
          <button className="nav-btn nav-prev" onClick={handlePrev}>‹</button>
          <div className="carousel-indicators">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <button className="nav-btn nav-next" onClick={handleNext}>›</button>
        </div>
      </div>
    </div>
  );
}