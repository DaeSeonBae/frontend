import React from 'react';
import './App.css';
import Navbar from './component/navbar';
import MainBody from './component/main_body';
import Login from './component/login';
import Signup from './component/signup';
import Findinfo from './component/findinfo';
import Post from './component/post';
import Footer from './component/footer';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <>
            <Navbar />
            <MainBody />
            <Footer/>
          </>
        } />
        <Route path='/post' element={
          <>
            <Navbar />
            <Post />
            <Footer/>
          </>
        }/>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/find_info' element={<Findinfo />} />
        {/* <Route path='/post' element={<Post />} /> */}

        <Route path='*' element={<div>404error! 없는 페이지 입니다.</div>} />
      </Routes>
    </Router>
  );
}

export default App;
