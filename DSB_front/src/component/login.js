import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../component_style/login.css';
import logoIcon from '../images/DSB_logo.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://3.36.127.187:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // 로그인 성공 처리 (예: 토큰 저장, 홈 페이지로 리디렉션 등)
      console.log(data);
      // 예시로 홈 페이지로 리디렉션
      navigate('/');
    } catch (error) {
      setError('로그인 실패: ' + error.message);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="card">
          <h2>
            <Link to='/' className='login_link'>
              <img className='DSB_logo' src={logoIcon} alt='logoIcon' />
            </Link>
          </h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="text"
                id="username"
                name="username"
                placeholder='아이디를 입력하세요'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder='비밀번호를 입력하세요'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='check-box'>
              <input type='checkbox' id='checkbox1' />
              <label htmlFor='checkbox1'>아이디 유지</label>
            </div>
            <div className="sign_up">
              <div className="sign_up_member">
                <Link to='/signup' className='login_link'>회원가입</Link>
              </div>
              <div className="find_info">
                <Link to='/find_info' className='login_link'>아이디/비밀번호 찾기</Link>
              </div>
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
