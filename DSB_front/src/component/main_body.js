import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../component_style/main_body.css';

function MainBody() {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보를 확인하여 로그인 상태를 설정합니다.
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  // 모달 열기
  const openModal = () => {
    setShowModal(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    // 로그아웃 처리 (로컬 스토리지에서 토큰 및 사용자 정보 제거)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div>
      <div className="main_body">
        <div className="first">
          {isLoggedIn ? (
            <div>
              <div className="user_info">
                <p>환영합니다!</p>
                <button className="logout_button" onClick={handleLogout}>로그아웃</button>
              </div>
            </div>
          ) : (
            <div>
              <div className="login_box1">
                <div className="button_box">
                  <button className='login_button' onClick={() => navigate('/login')}>
                    대선배 로그인
                  </button>
                </div>
              </div>
              <div className="login_box2">
                <button className='join'><Link to='/signup' className='login_link'>회원가입</Link></button>
                <button className='findAccount'><Link to='/find_info' className='login_link'>아이디/비밀번호 찾기</Link></button>
              </div>
            </div>
          )}
        </div>
        <div className="middle">
          <div className="banner">
            <div className="banner_item">
              banner
            </div>
          </div>
          <div>
            <div className="sub_header">
              <h6 className="sub_name">HOT 게시판</h6>
            </div>
            <div className="list_box">
              {/* 클릭 이벤트 추가 */}
              {[...Array(10)].map((_, index) => (
                <div className="list_item" key={index} onClick={openModal}>
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
          {/* 모달 */}
          {showModal && (
            <div className="modal">
              <div className="modal_content">
                {/* 닫기 버튼 */}
                <span className="close" onClick={closeModal}>&times;</span>
                <div className='main_post_box'>
                  <div>제목</div>
                  <div>날짜</div>
                  <div>작성자</div>
                  <div>내용</div>
                </div>
                <div className='comment_box'>
                  <div className='best_comment'>best</div>
                  <div className='basic_comment'>basic</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="side">
          side
        </div>
      </div>
    </div>
  );
}

export default MainBody;