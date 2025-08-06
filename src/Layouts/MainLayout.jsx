import { Outlet } from "react-router-dom";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import BackgroundAnimation from "../components/common/backgroundAnimation/BackgroundAnimation.jsx";

function MainLayout() {
  return (
    <div className="main-layout">
      <BackgroundAnimation />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout;