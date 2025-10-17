import "./SandboxCard.scss";
import { useState } from "react";

function SandboxCard({ onClick, image, title, stack, getIcon, loading }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="sandbox-card" onClick={onClick}>
      {/* 이미지 영역 */}
      <div className="sandbox-card__image">
        {!imageLoaded && <div className="sandbox-card__image-skeleton" />}
        <img
          src={image}
          alt={`${title} Project thumbnail`}
          width="400"
          height="300"
          loading={loading}
          decoding="async"
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="sandbox-card__content">
        <h3 className="sandbox-card__title">{title}</h3>
        <div className="sandbox-card__stack">
          {stack?.map((tech, index) => (
            <span key={index} className="sandbox-card__tag">
              {getIcon(tech)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SandboxCard;
