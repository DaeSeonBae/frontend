import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../component_style/signup.css';
import logoIcon from '../images/DSB_logo.png';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    school_email: '',
    department: '',
    name: '',
    id: '',
    password: '',
    email_address: ''
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
      const response = await fetch('http://3.36.127.187:8080/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        // 에러 처리
        const errorData = await response.json();
        alert(`회원가입 실패: ${errorData.message}`);
        return;
      }

      const responseData = await response.json();
      console.log('API 응답 데이터:', responseData);

      // 회원가입 완료 알림
      alert('회원가입이 완료되었습니다');
      // 회원가입 성공 시 interests 페이지로 이동
      navigate('/interests');
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      
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
            {/* <div className="input-group">
              <input
                type="text"
                id="username"
                name="username"
                placeholder='학교'
                value={formData.username}
                onChange={handleInputChange}
              />
            </div> */}
            <div className="input-group">
              <input
                type="text"
                id="email"
                name="email"
                placeholder='학교 이메일 인증하기'
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            {/* <div className="input-group">
              <input
                type="text"
                id="id"
                name="id"
                placeholder='아이디'
                value={formData.id}
                onChange={handleInputChange}
              />
            </div> */}
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
            {/* <div className="input-group">
              <input
                type="text"
                id="email_address"
                name="email_address"
                placeholder='이메일주소'
                value={formData.email_address}
                onChange={handleInputChange}
              />
            </div> */}
            <button type="button" onClick={handleSignupClick}>회원가입</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
