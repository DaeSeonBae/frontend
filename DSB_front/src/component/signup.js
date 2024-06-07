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
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('department', formData.department);
      formDataToSend.append('nickName', formData.nickName);

      const response = await fetch('/api/signup', {
        method: 'POST',
        body: formDataToSend
      });

      const responseData = await response;

      console.log(responseData)
      // if (!response.ok) {
      //   // 에러 처리
      //   alert(`회원가입 실패: ${responseData.message}`);
      //   return;
      // }

      console.log('API 응답 데이터:', responseData);

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