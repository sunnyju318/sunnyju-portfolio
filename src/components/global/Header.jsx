import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Header.scss';
import HeaderNavigation from "./HeaderNavigation.jsx";
import MobileNavigation from './MobileNavigation.jsx';


/*
1. handleScroll을 활용해 조건식을 만든다. (50px 이상 스크롤되면 true, 같거나 작으면 false)
2. setter가 이 값을 리액트에게 전달하고, 리액트는 상태를 바탕으로 컴포넌트를 다시 렌더링한다.
3. isScrolled를 활용해 true이면 class를 붙이고, 아니면 지운다.
4. 결과적으로 스크롤의 상하 이동분기점 50px를 기준으로 class를 활용한 애니메이션(스타일)이 적용되거나 적용되지 않는다.
*/


function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  // isScrolled 라는 상태값을 만듬 = 초기값 false, 스크롤 안됨
  // 나중에 스크롤이 50px가 넘으면 true로 바꿔줄것.
  // setIsScrolled는 이 값을 바꾸는 함수

  const [isOpen, setIsOpen] = useState(false);
  // 현재 메뉴가 열려있는지 여부를 저장하는 state 값. true면 열리고 false면 닫힘.
  // 초기 상태값이 false 이므로 처음엔 기본적으로 메뉴가 닫혀있음

  useEffect(() => {
    // 컴포넌트가 처음 나타날때 실행되는 코드영역
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };
    // handleScroll : 스크롤 될때마다 실행될 함수
    // window.scrollY : 지금 화면이 얼마나 아래로 내려갔는지 픽셀로 알려줌
    // scrollTop > 50 : 조건식, scrollTop가 50보다 크면 true이고 작거나 같으면 기존의 false를 리턴함

    const handleResize = () => {
      if (window.innerWidth >768 && isOpen){
        // 여기서 && : 양쪽 둘다 true일때 다음을 실행해라
        // 768px 이상이면서 메뉴가 열려있으면 
        setIsOpen(false); // 메뉴를 닫아라
      }
      };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
    // 컴포넌트가 사라질때 scroll 이벤트를 clean up 해주는 코드.
    // 메모리 누수를 막기위해 꼭 필요함
  }, [isOpen]); // isOpen 의존성 추가
  // [] : 컴포넌트가 처음 생길때 한번만 실행함

  const onToggle = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsOpen(!isOpen);
    // 현재값이 false면 true로 true면 false로 바뀜
    // e : event object, 예를들어 버튼을 클릭했을때 그 클릭 정보가 담긴 객체가 e로 들어와. (클릭한 대상, 마우스위치, 키보드 키, 이벤트 종류 등등)
    // e?.preventDefault() : 기본동작 막기, 예를들어 <a href="#"> 클릭 시 위로 튀는 동작, <form>에서 버튼 클릭 시 페이지 새로고침 같은 걸 막을 때 사용.
    // e? : 만약 e가 undefined거나 null이면 즉, 넘어온 이벤트가 없다면 이 코드는 에러가 발생한다. 하지만 e?를 사용하면 e가 존재하면 실행하고 e가 없으면 그냥 넘어가자. 라고 하는 방어코드이다.
    // stopPropagation() : 이벤트 버블링을 막는 메서드, 이벤트 요소가 부모요소로 전파되지 않도록 막음
    // 여기서는 햄버거 메뉴를 열었을때 의도하지 않은 바깥클릭닫힘 을 방지하기 위해서 사용한다.
    // 매뉴가 열렸을때 바깥 클릭시 닫힘, 메뉴 버튼 자체를 클릭할때는 토글만 하기
  };

  const onClose = () => {
    setIsOpen(false);
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

        <HeaderNavigation />

        <MobileNavigation
          isOpen={isOpen}
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