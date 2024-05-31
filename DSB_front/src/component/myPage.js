import React, { useState } from 'react';
import '../component_style/myPage.css';

const MyPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  //카테고리 선택 호출 함수
  const handleClickCategory = (category) => {
    setSelectedCategory(category);
  };

  //선택 값에 따른 내용 반환 함수
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

  //카테고리에 따른 클래스 이름 반환 함수(카테고리 강조)
  const getClassName = (category) => {
    return selectedCategory === category ? 'active' : '';
  };

  return (
    <div className='myPage-container'>
      <div className='card'>
        <div className='user-info'>
          <h1>내정보</h1>
          <div className='profile-picture'></div>
          <div className='user-details'>
            <div className='name'>주찬양 / gravity</div>
            <div className='university'>호서대학교</div>
          </div>
        </div>
        <hr/>

        <div className='account-info'>
          <div className='info-group'>
            <h2>계정</h2>
            <button className='info'>정보 수정</button>
          </div>
          <div>
            <label>아이디</label>
          </div>
          <div>
            <label>닉네임</label>
          </div>
          <div>
            <label>학과</label>
          </div>
          <div>
            <label>이메일</label>
          </div>
          <div>
            <label>비밀번호 변경</label>
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
            <p onClick={() => window.location.href = ''}>문의하기</p>
            <p onClick={() => window.location.href = ''}>공지사항</p>
          </div>
        </div>

        <div className='myPage-footer'>
          <button className='secession'>회원 탈퇴</button>
          <button className='logout'>로그아웃</button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
