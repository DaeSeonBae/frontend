import React from 'react';
import { Link } from 'react-router-dom';
import '../component_style/find_info.css';
import logoIcon from '../images/DSB_logo.png';

function Findinfo() {
  return (
    <div>
      <div class="container">
        <div class="card">
          <h2>
            <Link to='/' className='login_link'>
              <img className='DSB_logo' src={logoIcon} alt = 'logoIcon'/>
            </Link>
          </h2>
          <h2>아이디 찾기</h2>
          <form>
            <div class="input-group">
              <input type="text" id="username" name="username" placeholder='가입한 이메일을 입력하세요'/>
            </div>
            <div class="input-group">
              <input type="password" id="password" name="password" placeholder='이름을 입력하세요'/>
            </div>
              <button type="button">아이디 찾기</button>
          </form>
        </div>
        <div class="card">
          <h2>
            <Link to='/' className='login_link'><img className='DSB_logo' src={logoIcon} alt = 'logoIcon'/></Link>
            </h2>
          <h2>비밀번호 찾기</h2>
          <form>
            <div class="input-group">
              <input type="text" id="username" name="username" placeholder='아이디를 입력하세요'/>
            </div>
            <div class="input-group">
              <input type="password" id="password" name="password" placeholder='인증번호를 입력하세요'/>
            </div>
              <button type="button">비밀번호 찾기</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Findinfo;
