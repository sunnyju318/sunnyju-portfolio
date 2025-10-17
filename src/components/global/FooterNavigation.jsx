import "./FooterNavigation.scss";
import { Link } from "react-router-dom";

function FooterNavigation() {
  return (
    <nav className="footer-navigation">
      <div className="footer-navigation__col">
        <Link to="/" className="footer-navigation__link">
          Home
        </Link>
        <Link
          to="/projects"
          className="footer-navigation__link footer-navigation__link--highlight"
        >
          Projects
        </Link>
      </div>
      <div className="footer-navigation__col">
        <Link to="/about" className="footer-navigation__link">
          About
        </Link>
        <Link to="/sandbox" className="footer-navigation__link">
          Sandbox
        </Link>
        <a
          className="footer-navigation__link footer-navigation__link--highlight"
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
