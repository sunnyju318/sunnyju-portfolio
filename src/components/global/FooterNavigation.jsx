import { Link } from "react-router-dom";
import "./FooterNavigation.scss";

function FooterNavigation() {
  return (
    <nav className="footer-nav-wrapper">
      <div className="footer-col">
        <Link to="/" className="nav-plain">
          Home
        </Link>
        <Link to="/projects" className="nav-highlight">
          Projects
        </Link>
      </div>
      <div className="footer-col">
        <Link to="/about" className="nav-plain">
          About
        </Link>
        <Link to="/sandbox" className="nav-plain">
          Sandbox
        </Link>
        <a
          className="nav-highlight"
          href="/jisunju_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="resume"
        >
          Resume
        </a>
      </div>
    </nav>
  );
}

export default FooterNavigation;
