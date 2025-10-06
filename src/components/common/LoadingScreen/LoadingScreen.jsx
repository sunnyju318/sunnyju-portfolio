import "./LoadingScreen.scss";

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <svg
        viewBox="0 0 93.76 93.76"
        className="loading-logo"
        width="40"
        height="40"
      >
        <g id="loading-grid">
          <path
            d="M4.15 4.15h20.06v20.06H4.15z"
            transform="rotate(45 14.188 14.177)"
          />
          <path
            d="M36.85 4.15h20.06v20.06H36.85z"
            transform="rotate(45 46.874 14.186)"
          />
          <path
            d="M69.54 4.15H89.6v20.06H69.54z"
            transform="rotate(45 79.572 14.19)"
          />
          <path
            d="M4.15 36.85h20.06v20.06H4.15z"
            transform="rotate(45 14.184 46.875)"
          />
          <path
            d="M36.85 36.85h20.06v20.06H36.85z"
            transform="rotate(45 46.882 46.88)"
          />
          <path
            d="M69.54 36.85H89.6v20.06H69.54z"
            transform="rotate(45 79.563 46.876)"
          />
          <path
            d="M4.15 69.54h20.06V89.6H4.15z"
            transform="rotate(45 14.18 79.573)"
          />
          <path
            d="M36.85 69.54h20.06V89.6H36.85z"
            transform="rotate(45 46.873 79.565)"
          />
          <path
            d="M69.54 69.54H89.6V89.6H69.54z"
            transform="rotate(45 79.571 79.57)"
          />
        </g>
      </svg>
    </div>
  );
}
