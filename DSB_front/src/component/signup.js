import React from 'react';
import { Link } from 'react-router-dom';
import '../component_style/signup.css';
import logoIcon from '../images/DSB_logo.png';

function Signup() {
  const handleSignupClick = () => {
    // 회원가입 로직 수행 (예: API 호출)
    // ...

    // 회원가입 완료 알림
    alert('회원가입이 완료되었습니다');
  };

  return (
    <div>
      <div className="container">
        <div className="card">
          <h2>
            <Link to='/' className='login_link'>
              <img className='DSB_logo' src={logoIcon} alt='logoIcon'/>
            </Link>
          </h2>
          <h2>회원가입</h2>
          <form>
            <div className="input-group">
              <input type="text" id="username" name="username" placeholder='학교'/>
            </div>
            <div className="input-group">
              <input type="text" id="school_email" name="school_email" placeholder='학교 이메일 인증하기'/>
            </div>
            <div className="input-group">
              <input type="text" id="department" name="department" placeholder='학과'/>
            </div>
            <div className="input-group">
              <input type="text" id="name" name="name" placeholder='이름'/>
            </div>
            <div className="input-group">
              <input type="text" id="id" name="id" placeholder='아이디'/>
            </div>
            <div className="input-group">
              <input type="password" id="password" name="password" placeholder='비밀번호를 입력하세요'/>
            </div>
            <div className="input-group">
              <input type="text" id="email_address" name="email_address" placeholder='이메일주소'/>
            </div>
            <Link to="/interests">
              <button type="button" onClick={handleSignupClick}>회원가입</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
