import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Route 쓰기전에 터미널에서 "npm i react-router-dom" 먼저 설치할것

import MainLayout from './Layouts/MainLayout';
import Home from './pages/Home/Home';
import Work from './pages/Work/Work';
import About from './pages/About/About';
import Sandbox from './pages/Sandbox/Sandbox';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';

import './styles/global.scss';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='work' element={<Work />} />
          <Route path='about' element={<About />} />
          <Route path='sandbox' element={<Sandbox />} />
          <Route path='contact' element={<Contact />} />
          {/* path는 웹표준 URL이 소문자를 사용하므로 소문자로 하는게 좋다. */}
        </Route>
        <Route path='*' element={<NotFound />} />
        {/* NotFound는 헤더나 푸터없이 전체화면을 사용하므로 MainLayout안에 넣을 필요가 없다 */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
