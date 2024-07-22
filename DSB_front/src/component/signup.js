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

  const [emailSent, setEmailSent] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAuthCodeChange = (e) => {
    setAuthCode(e.target.value);
  };

  const handleSendEmail = async () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@vision\.hoseo\.edu$/;
    if (!emailPattern.test(formData.email)) {
      alert('유효하지 않은 이메일 형식입니다. 이메일은 @vision.hoseo.edu 형식이어야 합니다.');
      return;
    }

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email
        })
      });

      if (!response.ok) {
        alert(`이메일 전송 실패: ${response.statusText}`);
        return;
      }

      setEmailSent(true);
      alert('인증 코드가 이메일로 전송되었습니다.');
    } catch (e) {
      console.error('이메일 전송 중 오류 발생:', e);
      alert('이메일 전송 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await fetch('/api/pwd/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          code: authCode
        })
      });

      if (!response.ok) {
        alert(`인증 실패: ${response.statusText}`);
        return;
      }

      setIsEmailVerified(true);
      alert('이메일 인증이 완료되었습니다.');
    } catch (e) {
      console.error('인증 중 오류 발생:', e);
      alert('인증 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  const handleSignupClick = async () => {
    if (!isEmailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }

    try {
      const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
      };

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
        alert(`회원가입 실패: ${response.statusText}`);
        return;
      }

      alert('회원가입이 완료되었습니다.');
      navigate('/interests');
    } catch (e) {
      console.error('회원가입 중 오류 발생:', e);
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
          <div className="input-group">
            <input
              type="text"
              id="email"
              name="email"
              placeholder='이메일 입력하세요'
              value={formData.email}
              onChange={handleInputChange}
              disabled={isEmailVerified}
            />
            {!isEmailVerified && (
              <button type="button" onClick={handleSendEmail}>이메일 인증하기</button>
            )}
          </div>
          {emailSent && !isEmailVerified && (
            <div className="input-group">
              <input
                type="text"
                id="authCode"
                name="authCode"
                placeholder='인증 코드를 입력하세요'
                value={authCode}
                onChange={handleAuthCodeChange}
              />
              <button type="button" onClick={handleVerifyCode}>인증 확인</button>
            </div>
          )}
          {isEmailVerified && (
            <form>
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
              <button type="button" className='signupBtn' onClick={handleSignupClick}>회원가입</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
