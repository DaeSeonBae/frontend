import React from 'react';
import { FaSun, FaMoon, FaStar, FaHeart } from 'react-icons/fa';
import './navbar.css';

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
            <div className="nav-item">게시판</div>
            <div className="nav-item">시간표</div>
            <div className="nav-item">수강신청</div>
            <div className="nav-item">강의평가</div>
            <div className="nav-item">AI</div>
            <div className="nav-item">학점계산</div>
          </div>
        </div>
        <div className="container3">
          <div className="icon-box" onClick={this.toggleDarkMode}>
            {this.state.isDarkMode ? <FaSun /> : <FaMoon />}
          </div>
          <div className="icon-box" onClick={this.toggleFavorite}>
            <FaStar />
          </div>
          <div className="icon-box" onClick={this.toggleLike}>
            <FaHeart />
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
