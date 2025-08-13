import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  // useLocation으로 현재 URL 경로를 감지한다.
  // 페이지가 바뀔때마다 pathname이 변경된다.

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  // pathname이 바뀔때마다 useEffect가 실행된다.
  // window.scrollTo(0, 0)으로 페이지 맨 위로 스크롤 이동

  return null;
  // 이 컴포넌트는 UI가 필요없으니 null 반환
  // 기능만 하고 화면에는 아무것도 렌더하지 않는다.
}