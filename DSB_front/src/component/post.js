import React, { useState } from 'react';
import '../component_style/post.css';
import { Link, useNavigate } from 'react-router-dom';

const Post = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시물 데이터
  // const [commentText, setCommentText] = useState(''); // 댓글 내용
  const [comments] = useState([]); // 댓글 목록
  const navigate = useNavigate();

  // 모달 열기
  const openModal = (index) => {
    setSelectedPost(index); // 클릭한 list_item의 인덱스 저장
    setShowModal(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    // 버튼을 클릭하면 '/login' 경로로 이동합니다.
    navigate('/login');
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 제출 동작 방지
  
    const commentInput = event.target.elements.commentInput;
    const commentText = commentInput.value.trim(); // 입력된 댓글 내용
  
    if (commentText !== '') { // 빈 댓글인지 확인
      const commentList = document.querySelector('.comment-list');
      const newComment = document.createElement('div');
      newComment.classList.add('comment');
      newComment.textContent = commentText;
  
      // 새 댓글을 마지막에 추가
      commentList.appendChild(newComment);
  
      // 입력란 초기화
      commentInput.value = '';
    }
  };
  

  const postData = [
    {
      "post_number": {
        "content": "1"
      },
      "title": {
        "content": "Post Title 1"
      },
      "date": {
        "content": "2024-04-12"
      },
      "name": {
        "content": "John Doe"
      },
      "script": {
        "content": "This is a sample script 1."
      }
    },
    {
      "post_number": {
        "content": "2"
      },
      "title": {
        "content": "Post Title 2"
      },
      "date": {
        "content": "2024-04-12"
      },
      "name": {
        "content": "John Doe"
      },
      "script": {
        "content": "This is a sample script 2."
      }
    },
    {
      "post_number": {
        "content": "3"
      },
      "title": {
        "content": "Post Title 2"
      },
      "date": {
        "content": "2024-04-12"
      },
      "name": {
        "content": "John Doe"
      },
      "script": {
        "content": "This is a sample script 2."
      }
    }
  ];

  return (
    <div>
      <div className="main_body">
        <div className="first">
          <div>
            <div className="login_box1">
              <div className="button_box">
                <button className='login_button' onClick={handleClick}>
                  로그인
                </button>
              </div>
            </div>
            <div className="login_box2">
              <button><Link to='/signup' className='login_link'>회원가입</Link></button>
              <button><Link to='/find_info' className='login_link'>아이디/비밀번호 찾기</Link></button>
            </div>
          </div>
        </div>
        <div className="middle">
          <div className="post_container">
            <div>
              <div className="sub_header">
                <h6 className="sub_name">게시판</h6>
              </div>
              <div className="list_box">
                {/* 클릭 이벤트 추가 */}
                {postData.map((post, index) => (
                  <div className="list_item" key={index} onClick={() => openModal(index)}>
                    {post.post_number.content}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* 모달 */}
          {showModal && selectedPost !== null && (
            <div className="modal">
              <div className="modal_content">
                {/* 닫기 버튼 */}
                <span className="close" onClick={closeModal}>&times;</span>
                <div className='main_post_box'>
                  <div className='postdata'>Title: {postData[selectedPost].title.content}</div>
                  <div className='postdata'>Date: {postData[selectedPost].date.content}</div>
                  <div className='postdata'>Name: {postData[selectedPost].name.content}</div>
                  <div className='postdata'>Script: {postData[selectedPost].script.content}</div>
                </div>
                <div className="comment-container">
                  {/* <h2>댓글</h2> */}
                  <div className="comment-list" id="commentList">
                    {/* 댓글 목록 출력 */}
                    {comments.map((comment, index) => (
                      <div key={index} className="comment">
                        {comment}
                      </div>
                    ))}
                  </div>
                  <form className="comment-form" onSubmit={handleSubmit}>
                    <textarea name="commentInput" placeholder="댓글을 입력하세요"></textarea>
                    <button type="submit">작성</button>
                  </form>
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
};

export default Post;
