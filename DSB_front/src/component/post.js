import React, { useState } from 'react';
import '../component_style/post.css';
import { Link, useNavigate } from 'react-router-dom';

const Post = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시물 데이터
  const [commentText, setCommentText] = useState(''); // 댓글 내용
  const [comments, setComments] = useState([]); // 댓글 목록
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

  const handleCommentChange = (event) => {
    // 댓글 입력란의 내용 변경 시 호출됩니다.
    setCommentText(event.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    if (commentText.trim() === '') {
      alert('댓글을 입력하세요!');
      return;
    }
    // 댓글 추가
    setComments([...comments, commentText]);
    // 댓글 입력란 비우기
    setCommentText('');
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
              <div>Title: {postData[selectedPost].title.content}</div>
              <div>Date: {postData[selectedPost].date.content}</div>
              <div>Name: {postData[selectedPost].name.content}</div>
              <div>Script: {postData[selectedPost].script.content}</div>
            </div>
            <div className='comment_box'>
              {/* 댓글 목록 */}
              <div className='comment_list'>
                {comments.map((comment, index) => (
                  <div className='basic_comment' key={index}>{comment}</div>
                ))}
              </div>
              <div className='comment_input_box'>
                {/* 댓글 입력 폼 */}
                <form onSubmit={handleSubmitComment} className='comment_form'>
                  <textarea value={commentText} onChange={handleCommentChange} placeholder="댓글을 입력하세요"></textarea>
                  <button type="submit">전송</button>
                </form>
              </div>
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
