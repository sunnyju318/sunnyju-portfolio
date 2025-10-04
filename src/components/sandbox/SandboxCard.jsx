import "./SandboxCard.scss";
import { useState } from "react";

export default function SandboxCard({
  onClick,
  image,
  title,
  stack,
  getIcon,
  loading,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="sandbox-card" onClick={onClick}>
      <div className="sandbox-card_image">
        {!imageLoaded && <div className="skeleton" />}
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
      <div className="sandbox-card_content">
        <h3 className="sandbox-card_title">{title}</h3>
        <div className="sandbox-card_stack">
          {stack?.map((tech, index) => (
            <span key={index} className="tech-tag">
              {getIcon(tech)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
