import "./SandboxModal.scss";
import { useState, useEffect } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";

import AnimatedArrow from "../common/AnimatedArrow/AnimatedArrow";

function SandboxModal({ isOpen, onClose, data, getIcon }) {
  const [imageOrientation, setImageOrientation] = useState("landscape");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // 미디어 로딩
  const [mediaLoaded, setMediaLoaded] = useState(false);

  // =============== Side Effects ===============

  useEffect(() => {
    if (isOpen) {
      setImageOrientation("landscape"); // 모달 열릴 때 초기화
      setCurrentImageIndex(0); // 모달 열릴때 첫번째 이미지로 초기화
      setMediaLoaded(false); // 모달 열릴 때 초기화
    }
  }, [isOpen]);

  // currentImageIndex 변경될 때마다 로딩 상태 초기화
  // SandboxModal.jsx - useEffect 수정
  useEffect(() => {
    setMediaLoaded(false);

    // 이미지 변경 시 약간의 지연 후 렌더링
    const timer = setTimeout(() => {}, 50);

    return () => clearTimeout(timer);
  }, [currentImageIndex]);

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;

      if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isOpen, currentImageIndex]);

  useEffect(() => {
    if (isOpen) {
      // 모달 열릴 때 history에 state 추가
      window.history.pushState({ modal: true }, "");

      // 뒤로가기 이벤트 리스너
      const handlePopState = (e) => {
        onClose();
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    } else {
      // 모달이 닫힐 때 history에서 제거 (중복 방지)
      if (window.history.state?.modal) {
        window.history.back();
      }
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      // modal-open 클래스 추가
      document.body.classList.add("modal-open");
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;

      // modal-open 클래스 제거
      document.body.classList.remove("modal-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // =============== Helper Functions ===============

  // 이미지 배열 가져오기 (기존 단일 이미지도 호환)
  const getImages = () => {
    if (!data) return [];

    if (data.images && Array.isArray(data.images)) {
      return data.images;
    } else if (data.largeImage) {
      return [{ type: "image", src: data.largeImage }];
    } else if (data.preview) {
      return [{ type: "video", src: data.preview }];
    }
    return [{ type: "image", src: data.thumbnail }];
  };

  // =============== Carousel Logic ===============

  const images = getImages();
  const currentImage =
    images && images.length > 0 ? images[currentImageIndex] : null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  // =============== Event Handers ===============

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setImageOrientation(
      naturalHeight > naturalWidth ? "portrait" : "landscape"
    );
    setMediaLoaded(true);
  };

  const handleVideoLoad = (e) => {
    const { videoWidth, videoHeight } = e.target;
    setImageOrientation(videoHeight > videoWidth ? "portrait" : "landscape");
    setMediaLoaded(true);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      // e.target: 실제로 클릭된 요소
      // e.currentTarget: 이벤트 핸들러가 붙은 요소
      onClose();
    }
  };

  // =============== Media Renderer ===============

  const renderCurrentMedia = () => {
    if (!currentImage) return null;

    if (currentImage.type === "video") {
      return (
        <video
          key={currentImage.src}
          // 비디오 변경 시 엘리먼트 재생성
          // 비디오가 바뀔 때 이전 비디오를 제대로 정리함
          src={currentImage.src}
          controls
          autoPlay
          muted
          onLoadedMetadata={handleVideoLoad}
          preload="metadata"
          playsInline // 모바일 최적화
          style={{ opacity: mediaLoaded ? 1 : 0 }}
        />
      );
    } else {
      return (
        <img
          src={currentImage.src}
          alt={
            currentImage.caption ||
            `${data.title} - Image ${currentImageIndex + 1}`
          }
          onLoad={handleImageLoad}
          decoding="async"
          style={{ opacity: mediaLoaded ? 1 : 0 }}
        />
      );
    }
  };

  if (!isOpen || !data) return null;

  return (
    <div className="sandbox-modal" onClick={handleBackdropClick}>
      <div
        className={`sandbox-modal__content ${
          imageOrientation === "portrait"
            ? "sandbox-modal__content--portrait"
            : ""
        }`}
      >
        {/* =============== Header =============== */}

        <div className="sandbox-modal__header">
          <div className="sandbox-modal__links">
            {data.links?.liveDemo && (
              <a
                href={data.links.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live Demo"
                className="sandbox-modal__button"
              >
                <FiExternalLink size="2rem" color="#d13221" />
              </a>
            )}
            {data.links?.viewCode && (
              <a
                href={data.links.viewCode}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="sandbox-modal__button"
              >
                <AiFillGithub size="2rem" color="#d13221" />
              </a>
            )}
          </div>
          <button className="sandbox-modal__close" onClick={onClose}>
            <svg viewBox="0 0 93.76 93.76">
              <g>
                <path
                  d="M4.15 4.15h20.06v20.06H4.15z"
                  transform="rotate(45 14.188 14.177)"
                />
                <path
                  d="M69.54 4.15H89.6v20.06H69.54z"
                  transform="rotate(45 79.572 14.19)"
                />
                <path
                  d="M36.85 36.85h20.06v20.06H36.85z"
                  transform="rotate(45 46.882 46.88)"
                />
                <path
                  d="M4.15 69.54h20.06V89.6H4.15z"
                  transform="rotate(45 14.18 79.573)"
                />
                <path
                  d="M69.54 69.54H89.6V89.6H69.54z"
                  transform="rotate(45 79.571 79.57)"
                />
              </g>
            </svg>
          </button>
        </div>

        {/* =============== Body =============== */}

        <div className="sandbox-modal__body">
          <div className="sandbox-modal__image">
            {!mediaLoaded && (
              <div className="loading-overlay">
                <div className="spinner" />
              </div>
            )}

            {renderCurrentMedia()}

            {/* 캐러셀 컨트롤 - 이미지가 2개 이상일 때만 표시 */}
            {images.length > 1 && (
              <>
                <button
                  className="sandbox-modal__carousel-nav sandbox-modal__carousel-nav--prev"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <AnimatedArrow
                    direction="left"
                    className="sandbox-modal__carousel-arrow"
                  />
                </button>

                <button
                  className="sandbox-modal__carousel-nav sandbox-modal__carousel-nav--next"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <AnimatedArrow
                    direction="right"
                    className="sandbox-modal__carousel-arrow"
                  />
                </button>

                {/* 도트 인디케이터 */}
                <div className="sandbox-modal__carousel-dots">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`sandbox-modal__carousel-dot ${
                        index === currentImageIndex
                          ? "sandbox-modal__carousel-dot--active"
                          : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="sandbox-modal__info">
            <div className="sandbox-modal__info-left">
              <h3 className="sandbox-modal__title">{data.title}</h3>
              <div className="sandbox-modal__stack">
                {data.stack?.map((tech, index) => (
                  <span key={index} className="sandbox-modal__tag">
                    {getIcon(tech)}
                  </span>
                ))}
              </div>
            </div>

            <div className="sandbox-modal__info-right">
              {/* 현재 이미지에 캡션이 있으면 표시, 없으면 기본 설명 */}
              {currentImage?.caption || data.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SandboxModal;
