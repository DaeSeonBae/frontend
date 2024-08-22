import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // jsonwebtoken 라이브러리 import
import '../component_style/login.css';
import logoIcon from '../images/DSB_logo.png';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
  
      const response = await fetch('/api/login', {
        method: 'POST',
        body: formDataToSend,
        mode: 'cors'
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }
  
      // 응답 헤더에서 토큰 추출
      const authToken = response.headers.get('Authorization');
      if (authToken) {
        console.log('토큰:', authToken);
        localStorage.setItem('Authorization', authToken);

        // JWT를 해석하여 사용자 정보 추출
        const decodedToken = jwtDecode(authToken);
        console.log('해석된 JWT:', decodedToken);

        // 사용자 정보를 로컬 스토리지에 저장
        localStorage.setItem('user', JSON.stringify(decodedToken));

        // 로그인 성공 처리
        alert('로그인 완료!!');
        navigate('/');
      } else {
        throw new Error('Authorization header not found');
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      setError('로그인 실패: ' + error.message);
    }
  };
  
  
  return (
    <div>
      <div className="container">
        <div className="login_card">
          <h2>
            <Link to='/' className='login_link'>
              <img className='DSB_logo' src={logoIcon} alt='logoIcon' />
            </Link>
          </h2>
          <form>
            <div className="input-group">
              <input
                type="text"
                id="email"
                name="email"
                placeholder='이메일을 입력하세요'
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder='비밀번호를 입력하세요'
                value={formData.password}
                onChange={handleInputChange}
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
            
            {error && <div className="error">{error}</div>} {/* 오류 메시지 표시 */}
            <button type="button" className='loginBtn' onClick={handleLogin}>로그인</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
