import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../component_style/find_info.css';
import logoIcon from '../images/DSB_logo.png';

function Findinfo() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = async () => {
    if (!email || !newPassword) {
      alert('이메일과 새로운 비밀번호를 입력하세요');
      return;
    }

    try {
      const response = await fetch('/user/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          newPassword: newPassword
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('비밀번호가 성공적으로 재설정되었습니다.');
      } else {
        alert('비밀번호 재설정에 실패했습니다. 다시 시도하세요.');
      }
    } catch (error) {
      alert('비밀번호 재설정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <div className="container">
        <div className="card">
          <h2>
            <Link to='/' className='login_link'><img className='DSB_logo' src={logoIcon} alt='logoIcon' /></Link>
          </h2>
          <h2>비밀번호 재설정</h2>
          <form>
            <div className="input-group">
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder='이메일을 입력하세요' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input 
                type="password" 
                id="newPassword" 
                name="newPassword" 
                placeholder='새로운 비밀번호를 입력하세요' 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button type="button" onClick={handleResetPassword}>비밀번호 재설정</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Findinfo;
