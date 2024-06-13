import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../component_style/signup.css';
import logoIcon from '../images/DSB_logo.png';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    department: '',
    nickName: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSignupClick = async () => {
    try {
      // 이메일 유효성 검사 함수
      const validateEmail = (email) => {
        // 이메일 정규 표현식
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
      };
  
      // 비밀번호 유효성 검사 함수
      const validatePassword = (password) => {
        // 최소 8자리 이상, 특수문자 포함 여부 검사
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
      };
  
      // 이메일 유효성 검사
      if (!validateEmail(formData.email)) {
        alert('올바른 이메일 주소를 입력해주세요.');
        return;
      }
  
      // 비밀번호 유효성 검사
      if (!validatePassword(formData.password)) {
        alert('비밀번호는 최소 8자리 이상이어야 하며, 최소 하나의 문자와 하나의 숫자 또는 특수문자를 포함해야 합니다.');
        return;
      }
  
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('department', formData.department);
      formDataToSend.append('nickName', formData.nickName);
  
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: formDataToSend
      });
  
      if (!response.ok) {
        // 에러 처리
        alert(`회원가입 실패: ${response.statusText}`);
        return;
      }
  
      console.log('API 응답 데이터:', response);
  
      // 회원가입 완료 알림
      alert('회원가입이 완료되었습니다');
      // 회원가입 성공 시 interests 페이지로 이동
      navigate('/interests');
    } catch (e) {
      console.error('API 호출 중 오류 발생:', e);
      alert('회원가입 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
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
              <input
                type="text"
                id="email"
                name="email"
                placeholder='이메일 입력하세요'
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
            <div className="input-group">
              <input
                type="text"
                id="department"
                name="department"
                placeholder='학과'
                value={formData.department}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                id="nickName"
                name="nickName"
                placeholder='이름'
                value={formData.nickName}
                onChange={handleInputChange}
              />
            </div>
            <button type="button" onClick={handleSignupClick}>회원가입</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;