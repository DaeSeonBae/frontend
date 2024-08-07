import React from 'react';
import '../component_style/navbar.css';
// import DarkModeIcon from '../images/darkmode.svg';
// import LightModeIcon from '../images/lightmode.svg';
// import messageIcon from '../images/message.svg';
// import notificationIcon from '../images/notification.svg';

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
  // toggleDarkMode = () => {
  //   this.setState({ isDarkMode: !this.state.isDarkMode });
  //   document.body.classList.toggle('dark-mode');
  // };

  render() {
    return (
      <nav className="nav">
        <div className='container1'>
          <Link to='/' className=''>
            <img className='DSB_logo' src={logoIcon} alt = 'logoIcon'/>
          </Link>
        </div>
        <div className='container2'>
          <div className='nav-item'>
              게시판
            <div className='nav-sub-item'>
              <div className='sub-list'>
                <Link to='/hotpost' style={{textDecoration:'none', color: 'black'}} className=''>
                  hot 게시판
                </Link>
              </div>
              <div className='sub-list'>
                <Link
                  to='/post'
                  style={{ textDecoration: 'none', color: 'black' }} // 원하는 색상으로 변경
                  className=''
                >
                  자유 게시판
                </Link>
              </div>
              <div className='sub-list'>
                <Link to='/#' style={{textDecoration:'none', color: 'black'}} className=''>
                  교수님 게시판
                </Link>
              </div>
              <div className='sub-list'>
                <Link to='/#' style={{textDecoration:'none', color: 'black'}} className=''>
                  졸업생 게시판
                </Link>  
              </div>
              <div className='sub-list'>
                <Link to='/#' style={{textDecoration:'none', color: 'black'}} className=''>
                  재학생 게시판
                </Link>  
              </div>
            </div>
          </div>
          <div className='nav-item'>
            <Link to='/schedule' style={{textDecoration:'none', color:'black'}} className=''>
              시간표
            </Link>
          </div>
          <div className='nav-item'>
            <Link to='/enrolment' style={{textDecoration:'none', color:'black'}} className=''>
              수강 신청
            </Link>
          </div>
          <div className='nav-item'>
            <Link to='/review' style={{textDecoration:'none', color:'black'}} className=''>
              강의 평가
            </Link>
          </div>
          <div className='nav-item'>
            <Link to='/ai' style={{textDecoration:'none', color:'black'}} className=''>
              AI
            </Link>
          </div>
          <div className='nav-item'>
            <Link to='/calculate' style={{textDecoration:'none', color:'black'}} className=''>
              학점계산
            </Link>
          </div>
        </div>
        <div className="container3">
          <div className='note'>
            <div className="message" onClick={this.toggleFavorite}>
              <Link
                  to='/message'
                  style={{ textDecoration: 'none', color: 'black' }} // 원하는 색상으로 변경
                  className=''
                >
                  쪽지
              </Link>
            </div>
            <div className='note_list'>
              쪽지 리스트
            </div>
          </div>
          <div className='alarm'>
            <div className="notification" onClick={this.toggleLike}>
              <Link
                  to='/notification'
                  style={{ textDecoration: 'none', color: 'black' }} // 원하는 색상으로 변경
                  className=''
                >
                  알림
              </Link>
            </div>
            <div className='alarm_list'>
              알림 리스트
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
