import React from 'react';
import '../component_style/footer.css';


const Footer = () => {

  return (
    <div className='footer-container'>
      <div className='footer-box'>
        {/* <div className='team'>팀 : 범부</div> */}
        <div className='announcement'>공지사항</div>
        <a className='inquiry' href="mailto:cksdid3357@gmail.com">문의하기</a>
        <div className='daeseonbae'>대선배</div>
      </div>
    </div>
  );
};

export default Footer;
