import React from 'react';
import { Link } from 'react-router-dom';
import '../component_style/signup.css';
import logoIcon from '../images/DSB_logo.png';

function Signup() {
  return (
    <div>
      <div class="container">
        <div class="card">
          <h2><Link to='/' className='login_link'><img className='DSB_logo' src={logoIcon} alt = 'logoIcon'/></Link></h2>
          <h2>회원가입</h2>
          <form>
            <div class="input-group">
              <input type="text" id="username" name="username" placeholder='학교'/>
            </div>
            <div class="input-group">
              <input type="text" id="school_email" name="password" placeholder='학교 이메일 인증하기'/>
            </div>
            <div class="input-group">
              <input type="text" id="department" name="password" placeholder='학과'/>
            </div>
            <div class="input-group">
              <input type="text" id="name" name="password" placeholder='이름'/>
            </div>
            <div class="input-group">
              <input type="text" id="id" name="password" placeholder='아이디'/>
            </div>
            <div class="input-group">
              <input type="text" id="password" name="password" placeholder='비밀번호를 입력하세요'/>
            </div>
            <div class="input-group">
              <input type="text" id="email_address" name="password" placeholder='이메일주소'/>
            </div>
            <Link to="/">
              <button type="button">회원가입</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
