import React from 'react';
// import { FaStar, FaHeart } from 'react-icons/fa';
import './navbar.css';
import DarkModeIcon from '../images/darkmode.svg'; // 이미지 경로에 맞게 수정
import LightModeIcon from '../images/lightmode.svg';
import messageIcon from '../images/message.svg';
import notificationIcon from '../images/notification.svg';
import postlistIcon from '../images/post.svg';

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
    // 여기서는 간단하게 body 요소에 클래스를 추가/제거하여 다크 모드를 구현합니다.
    document.body.classList.toggle('dark-mode');
  };

  render() {
    return (
      <nav className="nav">
        <div className="container1">
          <div className="Logo">대선배</div>
        </div>
        <div className="container2">
          <div className="nav-box">
            <div className="nav-item">
              <img src={postlistIcon} alt='postIcon'/>
            </div>
            <div className="nav-item">시간표</div>
            <div className="nav-item">수강신청</div>
            <div className="nav-item">강의평가</div>
            <div className="nav-item">AI</div>
            <div className="nav-item">학점계산</div>
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
      </nav>
    );
  }
}

export default Navbar;
