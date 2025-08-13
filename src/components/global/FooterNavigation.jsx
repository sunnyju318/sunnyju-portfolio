
import { Link } from "react-router-dom";
import './FooterNavigation.scss';

function FooterNavigation({ setIsContactOpen, isContactOpen }) {
  return (
    <nav className="footer-nav-wrapper">
      <div className="footer-col">
        <Link to="/"
          className="nav-plain">Home</Link>
        <Link to="/projects" className="nav-highlight">Projects</Link>
      </div>
      <div className="footer-col">
        <Link to="/about"
          className="nav-plain">About</Link>
        <Link to="/sandbox"
          className="nav-plain">Sandbox</Link>
        <button 
        className="nav-highlight"
          onClick={() => {setIsContactOpen(!isContactOpen);
            // console.log('컨택트 버튼 클릭됨!');
            // console.log('현재 상태:', isContactOpen);
            // console.log('변경될 상태:', !isContactOpen);
            // 모바일 버전에서만 모달창 안나오는 건 관련 디버깅중
          }
          }
        >
          Contact
        </button>
      </div>
    </nav>
  )
}

export default FooterNavigation;
