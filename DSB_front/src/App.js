import React from 'react';
import './App.css';
import Navbar from './component/navbar';
import MainBody from './component/main_body';
import Login from './component/login';
import Signup from './component/signup';
import Findinfo from './component/findinfo';
import Post from './component/post';
import Footer from './component/footer';
import Enrolment from './component/Enrolment';
import Ai from './component/ai';

import Calculate from './component/calculate';
import Review from './component/review';
import TimeSchedule from './component/timeschedule';

import Interests from './component/interests';

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
        <Route path='/enrolment' element={
          <>
            <Navbar/>
            <Enrolment/>
            <Footer/>
          </>
        }/>
        <Route path='/ai' element={
          <>
            <Navbar/>
            <Ai/>
            <Footer/>
          </>
        }/>
        <Route path='/calculate' element={
          <>
            <Navbar/>
            <Calculate/>
            <Footer/>
          </>
        }/>
        <Route path='/review' element={
          <>
            <Navbar/>
            <Review/>
            <Footer/>
          </>
        }/>
        <Route path='/schedule' element={
          <>
            <Navbar/>
            <TimeSchedule/>
            <Footer/>
          </>
        }/>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/find_info' element={<Findinfo />} />
        <Route path='/interests' element={<Interests />} />

        <Route path='*' element={<div>404error! 없는 페이지 입니다.</div>} />
      </Routes>
    </Router>
  );
}

export default App;
