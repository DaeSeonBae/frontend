import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        mode: 'cors'
      });

      if (!response.ok) {
        const responseData = await response.json(); // JSON 응답 파싱
        throw new Error(responseData.message || 'Network response was not ok');
      }

      const responseData = await response; // JSON 응답 파싱
      console.log('API 응답 데이터:', responseData);

      // 로그인 성공 처리 (예: 토큰 저장, 홈 페이지로 리디렉션 등)
      const { token, user } = responseData;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      alert('로그인 완료!!');
      navigate('/');
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
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
