import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../component_style/myPage.css';

const MyPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const authToken = localStorage.getItem('Authorization');
        if (!authToken) {
          throw new Error('Authorization token not found');
        }

        const response = await fetch('/api/user-info', {
          headers: {
            Authorization: authToken,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const userData = await response.json();
        setUserInfo(userData);
      } catch (error) {
        console.error('Error fetching user info:', error);
        // 예외 처리 필요 (예: 사용자에게 오류 메시지 보여주기)
      }
    };

    fetchUserInfo();
  }, []);

  const handleClickCategory = (category) => {
    setSelectedCategory(category);
  };

  const renderCategoryContent = () => {
    switch (selectedCategory) {
      case '게시물':
        return <div>내가 올린 게시물 내용</div>;
      case '좋아요':
        return <div>좋아요 받은 게시물 내용</div>;
      case '댓글':
        return <div>댓글 쓴 게시물 및 댓글 내용</div>;
      case '제재 내역':
        return <div>제재 내역 내용</div>;
      case '관심사':
        return <div>내가 설정한 관심사 내용</div>;
      case '알림':
        return <div>알림 내용</div>;
      default:
        return <div>카테고리를 선택하세요</div>;
    }
  };

  const getClassName = (category) => {
    return selectedCategory === category ? 'active' : '';
  };

  return (
    <div className='myPage-container'>
      <div className='card'>
        <div className='user-info'>
          <h1>내정보</h1>
          <div className='profile-picture'></div>
          {userInfo && (
            <div className='user-details'>
              <div className='name'>{userInfo.name} / {userInfo.nickname}</div>
              <div className='university'>{userInfo.university}</div>
            </div>
          )}
        </div>
        <hr/>

        <div className='account-info'>
          <div className='info-group'>
            <h2>계정</h2>
            <button className='info'>정보 수정</button>
          </div>
          {userInfo && (
            <>
              <div>
                <label>이름</label> {userInfo.nickname}
              </div>
              <div>
                <label>학과</label> {userInfo.department}
              </div>
              <div>
                <label>이메일</label> {userInfo.email}
              </div>
            </>
          )}
          <div>
            <button className='change-password'>비밀번호 변경</button>
          </div>
        </div>
        <hr/>

        <div className='activity'>
          <h2>나의 활동</h2>
          <table>
            <thead>
              <tr>
                <th className={getClassName('게시물')} onClick={() => handleClickCategory('게시물')}>게시물</th>
                <th className={getClassName('좋아요')} onClick={() => handleClickCategory('좋아요')}>좋아요</th>
                <th className={getClassName('댓글')} onClick={() => handleClickCategory('댓글')}>댓글</th>
                <th className={getClassName('제재 내역')} onClick={() => handleClickCategory('제재 내역')}>제재 내역</th>
                <th className={getClassName('관심사')} onClick={() => handleClickCategory('관심사')}>관심사</th>
                <th className={getClassName('알림')} onClick={() => handleClickCategory('알림')}>알림</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6">{renderCategoryContent()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr/>

        <div className='etc'>
          <h2>기타</h2>
          <div className='etc-links'>
            <p onClick={() => window.location.href = ''}>웹사이트 정보</p>
            <a className='inquiry' href="mailto:cksdid3357@gmail.com">문의하기</a>
            <p onClick={() => window.location.href = ''}>공지사항</p>
          </div>
        </div>

        <div className='myPage-footer'>
          <button className='secession'>회원 탈퇴</button>
          <button className='logout' onClick={() => {
            localStorage.removeItem('Authorization');
            localStorage.removeItem('user');
            localStorage.removeItem('userInfo');
            navigate('/login');
          }}>로그아웃</button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
