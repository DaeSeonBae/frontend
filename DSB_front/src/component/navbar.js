import React from 'react';
import './navbar.css';
import DarkModeIcon from '../images/darkmode.svg';
import LightModeIcon from '../images/lightmode.svg';
import messageIcon from '../images/message.svg';
import notificationIcon from '../images/notification.svg';
import postlistIcon from '../images/post.svg';
import timeIcon from '../images/time.svg';
import sugangIcon from '../images/sugang.svg';
import starIcon from '../images/star.svg';
import aiIcon from '../images/AI.svg';
import aplusIcon from '../images/Aplus.svg';
import logoIcon from '../images/logo.png';

import hotIcon from '../images/hot.svg';
import flyIcon from '../images/fly.svg';
import professorIcon from '../images/professor.svg';
import gradeIcon from '../images/grade.svg';
import studentIcon from '../images/student.svg';



class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false
    };
  }

  // 다크 모드 토글 함수
  toggleDarkMode = () => {
    this.setState({ isDarkMode: !this.state.isDarkMode });
    document.body.classList.toggle('dark-mode');
  };

  render() {
    return (
      <nav className="nav">
        <div className="nav_container">
        <div className="container1">
          <div className="Logo">
            <img src={logoIcon} alt='aplusIcon' className="logoImage" /> 대선배
          </div>
        </div>
          <div className="container2">
            <div className="nav-box">
              <div class="nav-item">
                <img src={postlistIcon} alt='postIcon'/>
                <div>게시판</div>
                <div class="hover-content">
                  <p><img src={hotIcon} alt='hotIcon'/></p>
                  <p><img src={flyIcon} alt='flyIcon'/></p>
                  <p><img src={professorIcon} alt='professorIcon'/></p>
                  <p><img src={gradeIcon} alt='gradeIcon'/></p>
                  <p><img src={studentIcon} alt='studdentIcon'/></p>
                </div>  
              </div>
              <div className="nav-item">
                <img src={timeIcon} alt='timeIcon'/>
                <div>시간표</div>
              </div>
              <div className="nav-item">
                <img src={sugangIcon} alt='sugangIcon'/>
                <div>수강신청</div>
              </div>
              <div className="nav-item">
                <img src={starIcon} alt='starIcon'/>
                <div>강의평가</div>
              </div>
              <div className="nav-item">
                <img src={aiIcon} alt='aiIcon'/>
                <div>AI</div>
              </div>
              <div className="nav-item">
                <img src={aplusIcon} alt='aplusIcon'/>
                <div>학점계산</div>
              </div>
            </div>
          </div>
          <div className="container3">
            <div className="icon-box" onClick={this.toggleDarkMode}>
              {this.state.isDarkMode ?  <img src={LightModeIcon} alt='Light Mode' />:<img src={DarkModeIcon} alt="Dark Mode" />}
            </div>
            <div className="icon-box" onClick={this.toggleFavorite}>
              <img src={messageIcon} alt='messageIcon'/>
            </div>
            <div className="icon-box" onClick={this.toggleLike}>
              <img src={notificationIcon} alt = 'notificationIcon'/>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
