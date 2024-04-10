import React from 'react';
import { Link } from 'react-router-dom';
import '../component_style/login.css';

function Login() {
  return (
    <div>
      <div class="container">
        <div class="card">
          <h2><Link to='/' className='login_link'>대선배</Link></h2>
          <form>
            <div class="input-group">
              {/* <label for="username">아이디</label> */}
              <input type="text" id="username" name="username" placeholder='아이디를 입력하세요'/>
            </div>
            <div class="input-group">
              {/* <label for="password">비밀번호</label> */}
              <input type="password" id="password" name="password" placeholder='비밀번호를 입력하세요'/>
            </div>
            <div className='check-box'>
              <input type='checkbox' id='checkbox1'/>
              <label htmlFor='checkbox1'>아이디 유지</label>
            </div>
            <div class="sign_up">
              <div class="sign_up_member">
                <Link to='/signup' className='login_link'>회원가입</Link>
              </div>
              <div class="find_info">
                <Link to='/find_info' className='login_link'>아이디/비밀번호 찾기</Link>
              </div>
            </div>
            <Link to="/">
              <button type="button">Login</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
