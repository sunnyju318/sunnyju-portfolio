import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Route 쓰기전에 터미널에서 "npm i react-router-dom" 먼저 설치할것

import MainLayout from './Layouts/MainLayout.jsx';
import Home from './pages/Home/Home.jsx';
import Projects from './pages/Projects/Projects.jsx';
import About from './pages/About/About.jsx';
import Sandbox from './pages/Sandbox/Sandbox.jsx';
import Contact from './pages/Contact/Contact.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import WorkDetail from './pages/Projects/WorkDetail.jsx';

import './styles/global.scss';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='projects' element={<Projects />}/>
          <Route path='projects/detail/:id' element={<WorkDetail/>}/>
          {/* :id 
          URL 경로에 들어가는 데이터늬 고유값(ID)를 의미한다. 
          즉, 이 디테일 페이지에서 어떤 데이터를 보여줄지 구분하는 key 역할을 한다.
          그리고 이 id는 data 배열에서 해당 id에 맞는 항목을 찾을때 쓴다.   
          */}
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
