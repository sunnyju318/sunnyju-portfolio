
import { Link } from "react-router-dom";
import './Footer.scss';
import FooterNavigation from "./FooterNavigation.jsx";


function Footer() {
  return (
    <footer>
      <div className="footer-content">

        <div className="footer-text">
<p>Build with Purpose</p>
<p>and Mass Appeal</p>
        </div>

        <div className="footer-icons">
          <a
            href="https://www.linkedin.com/in/jisun-ju/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.12 0H2.88A2.88 2.88 0 0 0 0 2.88v18.23a2.88 2.88 0 0 0 2.88 2.88h18.23a2.88 2.88 0 0 0 2.88-2.88V2.88A2.88 2.88 0 0 0 21.11 0ZM8.84 15.48H6.56v-6.5h2.28v6.5ZM7.7 8.26c-.84 0-1.39-.53-1.39-1.21s.55-1.21 1.39-1.21 1.39.49 1.39 1.18c0 .72-.55 1.25-1.39 1.25Zm9.54 7.22h-2.28v-3.35c0-.94-.41-1.33-1.07-1.33-.73 0-1.3.46-1.3 1.54v3.14h-2.28v-6.5h2.17v.71c.52-.54 1.25-.82 2.06-.82 1.52 0 2.69.88 2.69 2.89v3.72Z" />
            </svg>
          </a>
          <a
            href="https://github.com/sunnyju318"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g>
                <path d="M7.26 10.69c-.82 0-1.43.53-1.43 1.32s.61 1.33 1.43 1.33 1.42-.54 1.42-1.33-.6-1.32-1.42-1.32Z" />
                <path d="M21.12 0H2.88A2.88 2.88 0 0 0 0 2.88v18.23a2.88 2.88 0 0 0 2.88 2.88h18.23a2.88 2.88 0 0 0 2.88-2.88V2.88A2.88 2.88 0 0 0 21.11 0ZM10.93 14.3c0 2.46-1.39 3.62-3.81 3.62-1.25 0-2.43-.29-3.23-.85l.83-1.6c.54.43 1.43.7 2.19.7 1.22 0 1.74-.55 1.74-1.57v-.22c-.44.52-1.1.77-1.93.77-1.73 0-3.19-1.22-3.19-3.14s1.46-3.13 3.19-3.13c.9 0 1.6.29 2.04.9v-.79h2.17v5.31Zm3.75 1.19H12.4v-6.5h2.28v6.5Zm-1.14-7.22c-.84 0-1.39-.53-1.39-1.21s.55-1.21 1.39-1.21 1.39.49 1.39 1.18c0 .72-.55 1.25-1.39 1.25Zm5.52 7.33c-1.67 0-2.64-.82-2.64-2.48v-2.18h-.95v-1.7h.95V7.55h2.28v1.69h1.49v1.7H18.7v2.16c0 .48.28.74.68.74.25 0 .5-.07.7-.2l.56 1.6c-.4.25-.98.37-1.58.37Z" />
              </g>
            </svg>
          </a>
        </div>


        <hr className="footer-divider"></hr>

        <FooterNavigation />

        <div className="footer-copy">
          <small>© 2025 Sunny Ju. All rights reserved.</small>
        </div>
        <Link to="/" className="footer-logo">
          <p>SUNNY</p>
        </Link>
      </div>
    </footer>
  )
}

export default Footer;