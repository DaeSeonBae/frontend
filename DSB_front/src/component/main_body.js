import React from 'react';
import { useNavigate } from 'react-router-dom';
import './main_body.css';

function MainBody() {
  const navigate = useNavigate();

  const handleClick = () => {
    // 버튼을 클릭하면 '/login' 경로로 이동합니다.
    navigate('/login');
  };

  return (
    <mainbody className='banner-box'>
      <div className="main_body">
        <div className="first">
          <div>
            <div className="login_box">
              <div className="input_box">
                <input type="text"/>
                <input type="password"/>
              </div>
              <div className="button_box">
                <button className='login_button' onClick={handleClick}>
                  로그인
                </button>
              </div>
            </div>
            <div className="login_box">
              <button>회원가입</button>
              <button>아이디/비번 찾기</button>
            </div>
          </div>
        </div>
        <div className="middle">
          <div className="banner">
            <div className="banner_item">
              banner
            </div>
          </div>
          <div>
            <div className="sub_header">
              <h6 className="sub_name">HOT 게시판</h6>
            </div>
            <div className="list_box">
              <div className="list_item">1</div>
              <div className="list_item">2</div>
              <div className="list_item">3</div>
              <div className="list_item">4</div>
              <div className="list_item">5</div>
              <div className="list_item">6</div>
              <div className="list_item">7</div>
              <div className="list_item">8</div>
              <div className="list_item">9</div>
              <div className="list_item">10</div>
            </div>
          </div>

          <div className='footer-container'>
            <div className='footer-box'>
              <div className='team'>팀 : 범부</div>
              <div className='rule'>이용약관, 개인정보처리방침, 청소년보호정책, 커뮤니티이용규칙, 공지사항, 문의하기, @대선배</div>
            </div>
          </div>
        </div>
        <div className="three">
          side
        </div>
      </div>
    </mainbody>
  );
}

export default MainBody;
