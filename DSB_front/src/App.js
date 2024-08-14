import React from 'react';
import './App.css';
import Navbar from './component/navbar';
import MainBody from './component/main_body';
import Login from './component/login';
import Signup from './component/signup';
import Findinfo from './component/findinfo';
import Post from './component/post';
import HotPost from './component/hotPost';
import Footer from './component/footer';
import Enrolment from './component/Enrolment';
import Ai from './component/ai';
import MyPage from './component/myPage';

import Calculate from './component/calculate';
import Review from './component/review';
import TimeSchedule from './component/timeschedule';

import Interests from './component/interests';
import Message from './component/message';
import Notification from './component/notification';

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
        }/>\
        <Route path='/hotpost' element={
          <>
            <Navbar />
            <HotPost />
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
        <Route path='/message' element={
          <>
            <Navbar/>
            <Message/>
            <Footer/>
          </>
        }/>
        <Route path='/notification' element={
          <>
            <Navbar/>
            <Notification/>
            <Footer/>
          </>
        }/>
        <Route path='/myPage' element={
          <>
            <Navbar/>
            <MyPage/>
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
