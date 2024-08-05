import React from 'react';
import '../component_style/navbar.css';
import logoIcon from '../images/DSB_logo.png';
import { Link } from 'react-router-dom';
// import DarkModeIcon from '../images/darkmode.svg';
// import LightModeIcon from '../images/lightmode.svg';
// import messageIcon from '../images/message.svg';
// import notificationIcon from '../images/notification.svg';

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
  // toggleDarkMode = () => {
  //   this.setState({ isDarkMode: !this.state.isDarkMode });
  //   document.body.classList.toggle('dark-mode');
  // };

  render() {
    return (
      <nav className="nav">
        <div className='container1'>
          <Link to='/'>
            <img className='DSB_logo' src={logoIcon} alt='logoIcon' />
          </Link>
        </div>
        <div className='container2'>
          <div className='nav-item'>
            게시판
            <div className='nav-sub-item'>
              <div className='sub-list'>
                <Link to='/hotpost' style={{ textDecoration: 'none', color: 'black' }}>
                  hot 게시판
                </Link>
              </div>
              <div className='sub-list'>
                <Link to='/post' style={{ textDecoration: 'none', color: 'black' }}>
                  자유 게시판
                </Link>
              </div>
              <div className='sub-list'>
                <Link to='/#' style={{ textDecoration: 'none', color: 'black' }}>
                  교수님 게시판
                </Link>
              </div>
              <div className='sub-list'>
                <Link to='/#' style={{ textDecoration: 'none', color: 'black' }}>
                  졸업생 게시판
                </Link>
              </div>
              <div className='sub-list'>
                <Link to='/#' style={{ textDecoration: 'none', color: 'black' }}>
                  재학생 게시판
                </Link>
              </div>
            </div>
          </div>
          <div className='nav-item'>
            <Link to='/schedule' style={{ textDecoration: 'none', color: 'black' }}>
              시간표
            </Link>
          </div>
          <div className='nav-item'>
            <Link to='/enrolment' style={{ textDecoration: 'none', color: 'black' }}>
              수강 신청
            </Link>
          </div>
          <div className='nav-item'>
            <Link to='/review' style={{ textDecoration: 'none', color: 'black' }}>
              강의 평가
            </Link>
          </div>
          <div className='nav-item'>
            <Link to='/ai' style={{ textDecoration: 'none', color: 'black' }}>
              AI
            </Link>
          </div>
          <div className='nav-item'>
            <Link to='/calculate' style={{ textDecoration: 'none', color: 'black' }}>
              학점계산
            </Link>
          </div>
        </div>
        <div className="container3">
          <div className='note'>
            <Link to='/postMessage' style={{ textDecoration: 'none', color: 'black' }}>
              쪽지
            </Link>
            <div className='note_list'>
              {/* 쪽지 리스트 관련 UI */}
            </div>
          </div>
          <div className='alarm'>
            <div className="notification" onClick={this.toggleLike}>
              알림
            </div>
            <div className='alarm_list'>
              {/* 알림 리스트 관련 UI */}
            </div>
          </div>
          <div className="profile" onClick={this.toggleProfile}>
            프로필
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
