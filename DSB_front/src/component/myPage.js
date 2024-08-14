import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../component_style/myPage.css';

const MyPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDepartment, setEditDepartment] = useState('');
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [interests, setInterests] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const authToken = localStorage.getItem('Authorization');
        if (!authToken) {
          throw new Error('Authorization token not found');
        }

        // 사용자 정보 가져오기
        const response = await fetch('api.daeseonbae.com:8080/api/user-info', {
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

        // 사용자 게시물 가져오기
        const postResponse = await fetch('api.daeseonbae.com:8080/user/board/list', {
          headers: {
            Authorization: authToken,
            'Content-Type': 'application/json'
          }
        });

        if (!postResponse.ok) {
          throw new Error('Failed to fetch user posts');
        }

        const userPosts = await postResponse.json();
        setPosts(userPosts);

        // 사용자 댓글 가져오기
        const commentResponse = await fetch('api.daeseonbae.com:8080/api/user/comment', {
          headers: {
            Authorization: authToken,
            'Content-Type': 'application/json'
          }
        });

        if (!commentResponse.ok) {
          throw new Error('Failed to fetch user comments');
        }

        const userComments = await commentResponse.json();
        setComments(userComments);

        // 사용자 좋아요 목록 가져오기
        const likeResponse = await fetch('api.daeseonbae.com:8080/api/user/like-board', {
          headers: {
            Authorization: authToken,
            'Content-Type': 'application/json'
          }
        });

        if (!likeResponse.ok) {
          throw new Error('Failed to fetch user likes');
        }

        const userLikes = await likeResponse.json();
        // 각 좋아요 게시글의 제목을 가져오기
        const likeWithTitles = await Promise.all(userLikes.map(async (like) => {
          const postResponse = await fetch(`api.daeseonbae.com:8080/api/posts/${like.boardnumber}`, {
            headers: {
              Authorization: authToken,
              'Content-Type': 'application/json'
            }
          });

          if (!postResponse.ok) {
            throw new Error(`Failed to fetch post with id: ${like.boardnumber}`);
          }

          const postData = await postResponse.json();
          return { ...like, title: postData.title };
        }));

        setLikes(likeWithTitles);

        // 사용자 관심사 가져오기
        const interestsResponse = await fetch('api.daeseonbae.com:8080/api/user-info', {
          headers: {
            Authorization: authToken,
            'Content-Type': 'application/json'
          }
        });

        if (!interestsResponse.ok) {
          throw new Error('Failed to fetch user interests');
        }

        const userInterests = await interestsResponse.json();
        setInterests({
          leisure: userInterests.leisure,
          study: userInterests.study,
          majorFields1: userInterests.majorFields1,
          majorFields2: userInterests.majorFields2,
        });

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
        return (
          <div className="content">
            {posts.map(post => (
              <div key={post.id} className="post-item">
                <div className="post-title">
                  <strong>제목:</strong> {post.title}
                </div>
                <div className="post-details">
                  <span><strong>좋아요 수:</strong> {post.favoriteCount}</span>
                  <span><strong>댓글 수:</strong> {post.commentCount}</span>
                </div>
              </div>
            ))}
          </div>
        );
      case '댓글':
        return (
          <div className="content">
            {comments.map(comment => (
              <div key={comment.id} className="post-item">
                <div className="post-content">
                  <strong>댓글 내용:</strong> {comment.content}
                </div>
              </div>
            ))}
          </div>
        );
      case '좋아요':
        return (
          <div className="content">
            {likes.map(like => (
              <div key={like.id} className="post-item">
                <div className="post-title">
                  <strong>좋아요 제목:</strong> {like.title}
                </div>
              </div>
            ))}
          </div>
        );
      case '관심사':
        return (
          <div className="content">
            <div className="interest-item">
              <div className="interest-title">
                <strong>선택한 관심사:</strong> {interests.leisure}
              </div>
            </div>
          </div>
        );
      default:
        return <div>카테고리를 선택하세요</div>;
    }
  };

  const getClassName = (category) => {
    return selectedCategory === category ? 'active' : '';
  };

  const handleDeleteAccount = async () => {
    try {
      const authToken = localStorage.getItem('Authorization');
      if (!authToken) {
        throw new Error('Authorization token not found');
      }

      const response = await fetch('api.daeseonbae.com:8080/users/sign-out', {
        method: 'DELETE',
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      // 로그아웃 처리
      localStorage.removeItem('Authorization');
      localStorage.removeItem('user');
      localStorage.removeItem('userInfo');
      navigate('/login');

    } catch (error) {
      console.error('Error deleting account:', error);
      // 예외 처리 필요 (예: 사용자에게 오류 메시지 보여주기)
    }
  };

  return (
    <div className='myPage-container'>
      <div className='card'>
        <div className='user-info'>
          <h1>내정보</h1>
        </div>
        <hr/>

        <div className='account-info'>
          <div className='info-group'>
            <h2>계정</h2>
            {isEditing ? (
              <button className='info'>저장</button>
            ) : (
              <button className='info'>정보 수정</button>
            )}
          </div>
          {userInfo && (
            <>
              {isEditing ? (
                <>
                  <div className='detail-item'>
                    <label>이름</label>
                    <input
                      type='text'
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </div>
                  <hr className='divider' />
                  <div className='detail-item'>
                    <label>학과</label>
                    <input
                      type='text'
                      value={editDepartment}
                      onChange={(e) => setEditDepartment(e.target.value)}
                    />
                  </div>
                  <hr className='divider' />
                </>
              ) : (
                <>
                  <div className='detail-item'>
                    <label>이름</label> <span>{userInfo.nickname}</span>
                  </div>
                  <hr className='divider' />
                  <div className='detail-item'>
                    <label>학과</label> <span>{userInfo.department}</span>
                  </div>
                  <hr className='divider' />
                  <div className='detail-item'>
                    <label>이메일</label> <span>{userInfo.email}</span>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <hr/>

        <div className='activity'>
          <h2>나의 활동</h2>
          <div className='activity-categories'>
            <div className={`activity-category ${getClassName('게시물')}`} onClick={() => handleClickCategory('게시물')}>게시물</div>
            <div className={`activity-category ${getClassName('좋아요')}`} onClick={() => handleClickCategory('좋아요')}>좋아요</div>
            <div className={`activity-category ${getClassName('댓글')}`} onClick={() => handleClickCategory('댓글')}>댓글</div>
            <div className={`activity-category ${getClassName('제재 내역')}`} onClick={() => handleClickCategory('제재 내역')}>제재 내역</div>
            <div className={`activity-category ${getClassName('관심사')}`} onClick={() => handleClickCategory('관심사')}>관심사</div>
            <div className={`activity-category ${getClassName('알림')}`} onClick={() => handleClickCategory('알림')}>알림</div>
          </div>
          <div className='activity-content'>
            {renderCategoryContent()}
          </div>
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
          <button className='secession' onClick={() => setShowConfirmation(true)}>회원 탈퇴</button>
          <button className='logout' onClick={() => {
            localStorage.removeItem('Authorization');
            localStorage.removeItem('user');
            localStorage.removeItem('userInfo');
            navigate('/login');
          }}>로그아웃</button>
        </div>
      </div>

      {showConfirmation && (
        <div className='confirmation-modal'>
          <div className='modal-content'>
            <p>정말 탈퇴하시겠습니까?</p>
            <button className='confirm-btn' onClick={handleDeleteAccount}>예</button>
            <button className='cancel-btn' onClick={() => setShowConfirmation(false)}>아니오</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
