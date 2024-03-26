import React from 'react';
import './main_body.css';

class MainBody extends React.Component {

  render() {
    return (
      <mainbody className='banner-box'>
        <div class="main_body">
          <div class="first">
            <div>
              <div class="login_box">
                <div class="input_box">
                  <input type="text"/>
                  <input type="password"/>
                </div>
                  <div class="button_box">
                    <button className='login_button'>
                      로그인
                    </button>
                  </div>
                </div>
              <div class="login_box">
                <button onclick="signup()">회원가입</button>
                <button onclick="find_ID_PW()">아이디/비번 찾기</button>
              </div>
            </div>
          </div>
            <div class="middle">
                <div class="banner">
                    <div class="banner_item">
                        banner
                    </div>
                </div>
                <div>
                    <div class="sub_header">
                        <h6 class="sub_name">HOT 게시판</h6>
                    </div>
                    <div class="list_box">
                        <div class="list_item">1</div>
                        <div class="list_item">2</div>
                        <div class="list_item">3</div>
                        <div class="list_item">4</div>
                        <div class="list_item">5</div>
                        <div class="list_item">6</div>
                        <div class="list_item">7</div>
                        <div class="list_item">8</div>
                        <div class="list_item">9</div>
                        <div class="list_item">10</div>
                    </div>
                </div>
                
                <div class='footer-container'>
                  <div class='footer-box'>
                    <div className='team'>팀 : 범부</div>
                    <div className='rule'>이용약관, 개인정보처리방침, 청소년보호정책, 커뮤니티이용규칙, 공지사항, 문의하기, @대선배</div>
                  </div>
                </div>
            </div>
          <div class="three">
            side
          </div>
        </div>
        
      </mainbody>
    );
  }
}

export default MainBody;
