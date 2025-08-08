import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Header.scss';
import HeaderNavigation from "./HeaderNavigation.jsx";
import NavigationDropdown from './NavigationDropdown.jsx';


function Header({ isScrolled, isMenuOpen, setIsMenuOpen, isContactOpen, setIsContactOpen }) {

  const onToggle = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
    // 현재값이 false면 true로 true면 false로 바뀜
    // e : event object, 예를들어 버튼을 클릭했을때 그 클릭 정보가 담긴 객체가 e로 들어와. (클릭한 대상, 마우스위치, 키보드 키, 이벤트 종류 등등)
    // e?.preventDefault() : 기본동작 막기, 예를들어 <a href="#"> 클릭 시 위로 튀는 동작, <form>에서 버튼 클릭 시 페이지 새로고침 같은 걸 막을 때 사용.
    // e? : 만약 e가 undefined거나 null이면 즉, 넘어온 이벤트가 없다면 이 코드는 에러가 발생한다. 하지만 e?를 사용하면 e가 존재하면 실행하고 e가 없으면 그냥 넘어가자. 라고 하는 방어코드이다.
    // stopPropagation() : 이벤트 버블링을 막는 메서드, 이벤트 요소가 부모요소로 전파되지 않도록 막음
    // 여기서는 햄버거 메뉴를 열었을때 의도하지 않은 바깥클릭닫힘 을 방지하기 위해서 사용한다.
    // 매뉴가 열렸을때 바깥 클릭시 닫힘, 메뉴 버튼 자체를 클릭할때는 토글만 하기
  };

  const onClose = () => {
    setIsMenuOpen(false);
  };

  // 여기서부터는 실제로 화면에 보여질 부분
  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      {/* isScrolled, 즉 스크롤이 되면 header에 className="scrolled"가 붙고 아니면 클레스가 없다. */}
      <div className="header-content">
        <Link to="/" className="logo-header">
          <div className="logo-text">
            <span className="jisun">JISUN</span>
            <span className="sunny">SUNNY</span>
            <span className="ju-dot">JU.</span>
          </div>
        </Link>

        <HeaderNavigation
          isScrolled={isScrolled}
          isContactOpen={isContactOpen}
          setIsContactOpen={setIsContactOpen} />

        <NavigationDropdown
          isMenuOpen={isMenuOpen}
          onToggle={onToggle}
          onClose={onClose}
          contactOnly={false}
        />
        {/* 
        1. isOpen : 현재 상태 데이터, true와 false 두개의 데이터를 가지고 있음
        2. onToggle : true와 false, 즉 열림과 닫힘 사이를 전환하는 함수(햄버거메뉴버튼)
        3. onClose: 무조건 닫는 함수(페이지링크버튼)
        */}
      </div>
    </header>
  );
}

export default Header;