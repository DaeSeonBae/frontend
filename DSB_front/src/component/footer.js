import React from 'react';
import './footer.css';

class Footer extends React.Component{
  render(){
    return(
      <footer>
        <div class='footer-container'>
          <div class='footer-box'>
            <div className='team'>팀 : 범부</div>
            <div className='rule'>이용약관, 개인정보처리방침, 청소년보호정책, 커뮤니티이용규칙, 공지사항, 문의하기, @대선배</div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;