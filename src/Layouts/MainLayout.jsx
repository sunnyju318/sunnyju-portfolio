import { Outlet } from "react-router-dom";
import Header from "../components/global/Header.jsx";
import Footer from "../components/global/Footer.jsx";
import BackgroundAnimation from "../components/common/backgroundAnimation/BackgroundAnimation.jsx";
import React, { useState, useEffect } from 'react';


/*
1. handleScroll을 활용해 조건식을 만든다. (50px 이상 스크롤되면 true, 같거나 작으면 false)
2. setter가 이 값을 리액트에게 전달하고, 리액트는 상태를 바탕으로 컴포넌트를 다시 렌더링한다.
3. isScrolled를 활용해 true이면 class를 붙이고, 아니면 지운다.
4. 결과적으로 스크롤의 상하 이동분기점 50px를 기준으로 class를 활용한 애니메이션(스타일)이 적용되거나 적용되지 않는다.
*/


function MainLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  // isScrolled 라는 상태값을 만듬 = 초기값 false, 스크롤 안됨
  // 나중에 스크롤이 50px가 넘으면 true로 바꿔줄것.
  // setIsScrolled는 이 값을 바꾸는 함수
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 현재 메뉴가 열려있는지 여부를 저장하는 state 값. true면 열리고 false면 닫힘.
  // 초기 상태값이 false 이므로 처음엔 기본적으로 메뉴가 닫혀있음
  const [isContactOpen, setIsContactOpen] = useState(false);

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
      if (window.innerWidth >768 && isMenuOpen){
        // 여기서 && : 양쪽 둘다 true일때 다음을 실행해라
        // 768px 이상이면서 메뉴가 열려있으면 
        setIsMenuOpen(false); // 메뉴를 닫아라
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
  }, [isMenuOpen]); 
  // [] : 컴포넌트가 처음 생길때 한번만 실행함
  return (
    <div className="main-layout">
      <BackgroundAnimation />
      <Header isScrolled={isScrolled} 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isContactOpen={isContactOpen}
        setIsContactOpen={setIsContactOpen} 
      />
      <main>
        <Outlet />
      </main>
      <Footer
        isMenuOpen={isMenuOpen}
        setIsContactOpen={setIsContactOpen} 
        isContactOpen={isContactOpen}
        setIsMenuOpen={setIsMenuOpen}
        />
    </div>
  )
}

export default MainLayout;