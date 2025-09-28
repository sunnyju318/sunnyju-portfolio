import "./SandboxCard.scss";

export default function SandboxCard({ onClick, image, title, stack, getIcon }) {
  return (
    <div className="sandbox-card" onClick={onClick}>
      <div className="sandbox-card_image">
        <img src={image} alt={`${title} Project`} />
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
