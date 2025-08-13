import { useState } from 'react';
import './NavigationDropdown.scss';
import { Link } from 'react-router-dom';
import AnimatedArrow from '../common/AnimatedArrow/AnimatedArrow.jsx';
import { motion } from 'framer-motion';


function NavigationDropdown({ isMenuOpen, onToggle, onClose, contactOnly = false }) {


  const [expandedItem, setExpandedItem] = useState(contactOnly ? 'contact' : null);
  // contactOnly가 true이면 처음부터 contact가 열려있도록 초기세팅을 함

  const handleContactClick = () => {
    setExpandedItem(expandedItem === 'contact' ? null : 'contact');
  }

  return (
    <>
      {/* 햄버거 메뉴 버튼 */}
      {/* (a || b) && c : a와 b 둘중 하나라도 참이면 c를 실행해라. 
여기서 contactOnly앞에 !가 붙은 이유는 초기세팅을 contactOnly = false  이렇게 했기때문이다. 
즉, 컨텍트온니가(!이 붙어서 거짓을 참으로 바꿈) 참이거나 isOpen이 참일경우 아래 버튼을 실행해라 라는 뜻. */}
      {(!contactOnly || isMenuOpen) && (
        <button
          className={`hamburger 
            ${isMenuOpen ? 'open' : ''}
            ${contactOnly ? 'contact-mode' : ''}
            `}
          // 기본적으로 hamburger이라는 클래스를 가지고 있으며 메뉴가 열렸을때는 open이라는 클래스도 추가로 갖는다
          onClick={contactOnly ? onClose : onToggle}
          // contactOnly가 참이면 onClose (닫기만) 가능하게 하고 그게 아니면 onToggle 열고 닫기 둘다 가능하게 함.
          aria-label={contactOnly ? 'Close contact' : 'Toggle menu'}
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
      )}

      {/* 모바일 풀스크린 메뉴 */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        {/* 기본적으로 mobile-menu-overlay 라는 클래스명을 가짐
       isMobileMenuOpen ? 'open' : '' // isMobileMenuOpen 이게 true 일때(열렸을때)는 open이라는 클래스를 붙이고 false이면(닫혔으면) 붙이지 마세요. // 삼항연산자 : 조건이 true일때 ~하라. 는 구조이다
       */}
        <nav className='mobile-menu-content'>
          {/* 만약 컨텍트온리가 아닌게(전체 메뉴가 다 나와야 하는게) 사실이라면 아래 내용을 실행할것./ 컨텍트는 이 조건문 밖으로 뺐음. 왜냐하면 데스크탑 버전에서는 컨텍트만 나와야 하기 때문 */}
          {!contactOnly && (
            <ul>
              <li>
                <Link className="nav-link" to="/" onClick={onClose}>
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/projects" onClick={onClose}>
                  {/*  onClick={() => setIsMobileMenuOpen(false)} : 클릭하면 해당 페이지로 이동하며 이 함수가 실행되어 false 즉, 토글이 닫힘 상태가 된다. (x자 빨간색에서 네모 베이지가 되는것) */}
                  Projects
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
          )}

          <div className='nav-link-contact'>
            <button className="nav-link" onClick={handleContactClick}>
              Contact
            </button>

            {expandedItem === 'contact' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                // 높이가 0에서 auto(컨텐츠 크기만큼 늘어남)
                className='contact-wrapper'>
                <div className='horizontal-line' />
                <div className='contact-list'>
                  <a
                    className='email-address'
                    href='mailto:sunnyju318@naver.com'>
                    sunnyju318@naver.com
                    <AnimatedArrow
                      className='contact-arrow'
                      direction='right' />
                  </a>
                  <p className='contact-sub-title'>Email</p>
                </div>
                <div className='contact-list'>
                  <div className='social-icon-wrapper'>
                    <a
                      href="https://www.linkedin.com/in/jisun-ju/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                      className='social-icon'
                    >
                      in
                    </a>
                    <a
                      href="https://github.com/sunnyju318"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile" className='social-icon'
                    >
                      git
                    </a>
                  </div>
                  <p className='contact-sub-title'>Socials</p>
                </div>
              </motion.div>
            )}
          </div>
        </nav>
      </div>
    </>
  )
}

export default NavigationDropdown;
