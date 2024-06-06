import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
      const response = await axios.post('http://3.36.127.187:8080/api/login', {
        email: formData.email,
        password: formData.password
      }, {
        withCredentials: true // 추가 설정
      });

      if (!response.data.success) {
        throw new Error(response.data.message || '로그인 실패');
      }

      console.log('API 응답 데이터:', response.data);

      // 로그인 성공 처리 (예: 토큰 저장, 홈 페이지로 리디렉션 등)
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
            
            {error && <div className="error">{error}</div>}
            <button type="button" onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
