import React from 'react';
import '../component_style/navbar.css';
import DarkModeIcon from '../images/darkmode.svg';
import LightModeIcon from '../images/lightmode.svg';
import messageIcon from '../images/message.svg';
import notificationIcon from '../images/notification.svg';

import logoIcon from '../images/DSB_logo.png';

import { Link } from 'react-router-dom';

class Navbar extends React.Component {

  refreshPage = () => {
    window.location.reload();
  }

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
        <div className='container1'>
        <img className='DSB_logo' src={logoIcon} alt = 'logoIcon'/>
        </div>
        <div className='container2'>
          <div className='nav-item'>
            <p>
              게시판
            </p>
            <div className='nav-sub-item'>
              <div className='sub-list'><p>HOT 게시판</p></div>
              <div className='sub-list'>
                <Link to='/post' className='s'>
                  자유 게시판
                </Link>
              </div>
              <div className='sub-list'><p>교수님 게시판</p></div>
              <div className='sub-list'><p>졸업생 게시판</p></div>
              <div className='sub-list'><p>재학생 게시판</p></div>
            </div>
          </div>
          <div className='nav-item'><p>시간표</p></div>
          <div className='nav-item'><p>수강신청</p></div>
          <div className='nav-item'><p>강의평가</p></div>
          <div className='nav-item'><p>AI</p></div>
          <div className='nav-item'><p>학점계산</p></div>
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

      </nav>
    );
  }
}

export default Navbar;
