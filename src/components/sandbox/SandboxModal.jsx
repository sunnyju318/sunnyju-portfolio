import "./SandboxModal.scss";
import { AiFillGithub } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";

export default function SandboxModal({ isOpen, onClose, data, getIcon }) {
  if (!isOpen || !data) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      // e.target: 실제로 클릭된 요소
      // e.currentTarget: 이벤트 핸들러가 붙은 요소
      onClose();
    }
  };

  const getModalMedia = (data) => {
    if (data.preview) {
      // 프리뷰 영상이 있으면 영상 우선
      return <video src={data.preview} controls autoPlay muted />;
    } else if (data.largeImage) {
      // 없으면 큰 이미지
      return <img src={data.largeImage} alt={`${data.title} Project`} />;
    }
    // 둘 다 없으면 썸네일
    return <img src={data.thumbnail} alt={`${data.title} Project`} />;
  };

  return (
    <div className="sandbox-modal_wrapper" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-links">
            {data.links?.liveDemo && (
              <a
                href={data.links.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live Demo"
                className="modal-button"
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
                className="modal-button"
              >
                <AiFillGithub size="2rem" color="#d13221" />
              </a>
            )}
          </div>
          <button className="modal-close" onClick={onClose}>
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

        <div className="modal-image">{getModalMedia(data)}</div>

        <div className="modal-info">
          <div className="modal-info-left">
            <h3 className="modal-title">{data.title}</h3>
            <div className="modal-stack">
              {data.stack?.map((tech, index) => (
                <span key={index} className="tech-tag">
                  {getIcon(tech)}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-info-right">{data.description}</div>
        </div>
      </div>
    </div>
  );
}
