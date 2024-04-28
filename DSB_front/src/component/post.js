import React, { useState, useEffect } from 'react';
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

  const [fontSize, setFontSize] = useState('16px'); // 기본값: 16px
  const [fontColor, setFontColor] = useState('#000000'); // 기본값: 검정색
  const [fontFamily, setFontFamily] = useState('Arial, sans-serif'); // 기본값: Arial
  const [fontStyle, setFontStyle] = useState('normal'); // 기본값: 일반
  const [fontWeight, setFontWeight] = useState('normal'); // 기본값: 보통

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleFontColorChange = (event) => {
    setFontColor(event.target.value);
  };

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };

  const handleFontStyleChange = (event) => {
    setFontStyle(event.target.value);
  };

  const handleFontWeightChange = (event) => {
    setFontWeight(event.target.value);
  };

  const handleClick = () => {
    // 버튼을 클릭하면 '/login' 경로로 이동합니다.
    navigate('/login');
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달의 상태를 관리하는 변수

  // 모달을 열기 위한 이벤트 핸들러
  const openModal2 = () => {
    setIsModalOpen(true);
  };

  // 모달을 닫기 위한 이벤트 핸들러
  const closeModal2 = () => {
    setIsModalOpen(false);
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
  
  const [currentTime, setCurrentTime] = useState(new Date());

    // 페이지가 로드되거나 currentTime이 변경될 때마다 실행됨
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // 컴포넌트가 언마운트되면 setInterval을 정리
        return () => clearInterval(intervalId);
    }, [currentTime]);
  

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
                <button onClick={openModal2}> 글쓰기 </button>
              </div>
              {isModalOpen && (
                <div id="myModal" className="modal">
                  <div className="modal-content">
                    <div className="modal">
                    
                      <div className="modal_content">
                        <div className='choiceOption'>

                          <div className='postGroup'>
                            <div className='postSelect'>
                              <div className='postname'>
                                자유게시판
                              </div>
                              {/* <form className='postForm'>
                                <select>
                                  <option value="" disabled selected>게시판을 고르세요</option>
                                  <option value="HOT">HOT 게시판</option>
                                  <option value="자유">자유 게시판</option>
                                  <option value="교수님">교수님 게시판</option>
                                  <option value="졸업생">졸업생 게시판</option>
                                  <option value="재학생">재학생 게시판</option>
                                </select>
                              </form> */}
                              {/* <div>{currentTime.toLocaleTimeString()}</div> */}
                              {/* <button>Upload</button> */}
                              <div className='helpBox'>
                                <div>
                                  {/* <span>글씨 크기: </span> */}
                                  <select value={fontSize} onChange={handleFontSizeChange}>
                                    <option value="12px">12px</option>
                                    <option value="16px">16px</option>
                                    <option value="20px">20px</option>
                                  </select>
                                </div>
                                <div>
                                  {/* <span>글씨 색깔: </span> */}
                                  <input type="color" value={fontColor} onChange={handleFontColorChange} />
                                </div>
                                <div>
                                  {/* <span>글씨 스타일: </span> */}
                                  <select value={fontStyle} onChange={handleFontStyleChange}>
                                    <option value="normal">보통</option>
                                    <option value="italic">기울임</option>
                                  </select>
                                </div>
                                <div>
                                  {/* <span>글씨 두께: </span> */}
                                  <select value={fontWeight} onChange={handleFontWeightChange}>
                                    <option value="normal">보통</option>
                                    <option value="bold">굵게</option>
                                  </select>
                                </div>
                                <div>
                                  {/* <span>글꼴: </span> */}
                                  <select value={fontFamily} onChange={handleFontFamilyChange}>
                                    <option value="Arial, sans-serif">Arial</option>
                                    <option value="Helvetica, sans-serif">Helvetica</option>
                                    <option value="Times New Roman, serif">Times New Roman</option>
                                    <option value="Georgia, serif">Georgia</option>
                                    <option value="Courier New, monospace">Courier New</option>
                                  </select>
                                </div>
                              </div>
                              <span className="close" onClick={closeModal2}>&times;</span>
                            </div>
                            <div className='titleinput'>
                              <input type="text" placeholder="제목을 입력하세요" />
                            </div>

                          </div>

                          <div className='scriptBox'>
                            {/* <label for="postContent">게시글 내용</label> */}
                            <textarea id="postContent" rows="4" 
                            style={{
                              fontSize: fontSize,
                              color: fontColor,
                              fontFamily: fontFamily,
                              fontStyle: fontStyle,
                              fontWeight: fontWeight
                            }}placeholder=' 내용을 작성하세요'>
                              
                            </textarea>
                            <button type="submit">게시글 작성</button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
