import './MobileNavigation.scss';
import { Link } from 'react-router-dom';


function MobileNavigation({ isOpen, onToggle, onClose }) {
  return (
    <>
          {/* 햄버거 메뉴 버튼 */}
          <button
            className={`hamburger ${isOpen ? 'open' : ''}`}
            // 기본적으로 hamburger이라는 클래스를 가지고 있으며 메뉴가 열렸을때는 open이라는 클래스도 추가로 갖는다
            onClick={onToggle}
            aria-label='Toggle menu'
          >
            <svg
              viewBox="0 0 93.76 93.76">
              <g id="hamburger">
                <path id="Rec-1" d="M4.15 4.15h20.06v20.06H4.15z" className="cls-1" transform="rotate(45 14.188 14.177)" />
                <path id="Rec-2" d="M36.85 4.15h20.06v20.06H36.85z" className="cls-1" transform="rotate(45 46.874 14.186)" />
                <path id="Rec-3" d="M69.54 4.15H89.6v20.06H69.54z" className="cls-1" transform="rotate(45 79.572 14.19)" />
                <path id="Rec-4" d="M4.15 36.85h20.06v20.06H4.15z" className="cls-1" transform="rotate(45 14.184 46.875)" />
                <path id="Rec-5" d="M36.85 36.85h20.06v20.06H36.85z" className="cls-1" transform="rotate(45 46.882 46.88)" />
                <path id="Rec-6" d="M69.54 36.85H89.6v20.06H69.54z" className="cls-1" transform="rotate(45 79.563 46.876)" />
                <path id="Rec-7" d="M4.15 69.54h20.06V89.6H4.15z" className="cls-1" transform="rotate(45 14.18 79.573)" />
                <path id="Rec-8" d="M36.85 69.54h20.06V89.6H36.85z" className="cls-1" transform="rotate(45 46.873 79.565)" />
                <path id="Rec-9" d="M69.54 69.54H89.6V89.6H69.54z" className="cls-1" transform="rotate(45 79.571 79.57)" />
              </g>
            </svg>
          </button>

                {/* 모바일 풀스크린 메뉴 */}
      <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}>
      {/* 기본적으로 mobile-menu-overlay 라는 클래스명을 가짐
       isMobileMenuOpen ? 'open' : '' // isMobileMenuOpen 이게 true 일때(열렸을때)는 open이라는 클래스를 붙이고 false이면(닫혔으면) 붙이지 마세요. // 삼항연산자 : 조건이 true일때 ~하라. 는 구조이다
       */}
      <nav className='mobile-menu-content'>
        <ul>
          <li>
            <Link className="nav-link" to="/" onClick={onClose}>
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/work" onClick={onClose}>
              {/*  onClick={() => setIsMobileMenuOpen(false)} : 클릭하면 해당 페이지로 이동하며 이 함수가 실행되어 false 즉, 토글이 닫힘 상태가 된다. (x자 빨간색에서 네모 베이지가 되는것) */}
              Work
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/about" onClick={onClose}>
              About
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/sandbox" onClick={onClose}>
              Sandbox
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    </>
  )
}

export default MobileNavigation;
