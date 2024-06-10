import React, { useState, useEffect } from 'react';
import '../component_style/post.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Post = () => {
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시물 인덱스
  const [isModalOpen, setIsModalOpen] = useState(false); // 글쓰기 모달 상태
  const [posts, setPosts] = useState([]); // 게시물 목록
  const [likes, setLikes] = useState([]); // 좋아요 목록

  // 날짜 형식 변환 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // API에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await fetch('/api/board/view/1', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Authorization': token
          }
        });
        const data = await response.json();
  
        // 게시물 객체 생성
        const newPost = {
          boardNumber: data.boardNumber,
          title: { content: data.title },
          script: { content: data.content },
          date: { content: formatDate(data.writeDatetime) }, // 날짜 형식 변환
          likes: data.favoriteCount,
          comments: [], // 댓글 목록 초기화
          writerEmail: data.writerEmail
        };
  
        // 기존의 게시물 목록에 새로운 게시물 추가
        setPosts([newPost]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  // 모달 열기
  const openModal = (index) => {
    setSelectedPost(index); // 클릭한 list_item의 인덱스 저장
    setShowModal(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
  };

  // 글쓰기 모달 열기
  const openModal2 = () => {
    setIsModalOpen(true);
  };

  // 글쓰기 모달 닫기
  const closeModal2 = () => {
    setIsModalOpen(false);
  };

  // 댓글 작성 핸들러
  const handleCommentSubmit = (event) => {
    event.preventDefault(); // 기본 제출 동작 방지

    const commentInput = event.target.elements.commentInput;
    const commentText = commentInput.value.trim(); // 입력된 댓글 내용

    if (commentText !== '' && selectedPost !== null) { // 빈 댓글인지 확인 및 선택된 게시물이 있는지 확인
      const newPosts = [...posts];
      newPosts[selectedPost].comments.push(commentText); // 선택된 게시물에 댓글 추가

      setPosts(newPosts); // 상태 업데이트
      commentInput.value = ''; // 입력란 초기화
    }
  };

  // 게시물 작성 핸들러
  const handlePostSubmit = (event) => {
    event.preventDefault();

    const titleInput = event.target.elements.titleInput;
    const contentInput = event.target.elements.contentInput;

    const newPost = {
      post_number: (posts.length + 1).toString(),
      title: { content: titleInput.value.trim() },
      date: { content: formatDate(new Date()) }, // 날짜 형식 변환
      name: "User",
      script: { content: contentInput.value.trim() },
      comments: [] // 댓글 목록 초기화
    };

    setPosts([...posts, newPost]);
    setLikes([...likes, 0]); // 새로운 게시물에 대한 좋아요 초기값 설정
    closeModal2(); // 모달 닫기
  };

  const handleLikeClick = (index) => {
    const newLikes = [...likes];
    newLikes[index] += newLikes[index] === 0 ? 1 : -1; // 좋아요/좋아요 취소 토글
    if (newLikes[index] < 0) newLikes[index] = 0; // 최소값 0 확인
    setLikes(newLikes);
  };

  return (
    <div>
      <div className="main_body">
        <div className="middle">
          <div className="post_container">
            <div>
              <div className="sub_header">
                <h6 className="sub_name">게시판</h6>
                <button onClick={openModal2}> 글쓰기 </button>
              </div>
              {/* 글쓰기 모달 */}
              {isModalOpen && (
                <div id="myModal" className="modal">
                  <div className="modal-content">
                    <div className="modal">
                      <div className="modal_content">
                        <div className='choiceOption'>
                          <form className='modal_form' onSubmit={handlePostSubmit}>
                            <div className='postGroup'>
                              <div className='postSelect'>
                                <div className='postname'>
                                  자유게시판
                                </div>
                                <span className="close" onClick={closeModal2}>&times;</span>
                              </div>
                              <div className='titleinput'>
                                <input type="text" placeholder="제목을 입력하세요" name="titleInput" required />
                              </div>
                            </div>
                            <div className='scriptBox'>
                              <textarea id="postContent" rows="4" placeholder='내용을 작성하세요' name="contentInput" required></textarea>
                              <button type="submit">게시글 작성</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="list_box">
                {/* 게시물 리스트 */}
                {posts.map((post, index) => (
                  <div className="list_item" key={index} onClick={() => openModal(index)}>
                    <div className='list_item_content'>
                      {post.title.content}
                    </div>
                    <div className='like'>
                      <i className="fas fa-heart" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => {
                        e.stopPropagation(); // 부모 요소로의 이벤트 전파(stopPropagation)를 막음
                        handleLikeClick(index);
                      }}>{likes[index]}
                      </i>
                      <i className="fas fa-comment">
                        {post.comments.length}
                      </i> {/* 댓글 아이콘 */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* 게시물 모달 */}
          {showModal && selectedPost !== null && posts[selectedPost] && (
            <div className="modal">
              <div className="modal_content">
                {/* 닫기 버튼 */}
                <span className="close" onClick={closeModal}>&times;</span>
                <div className='main_post_box'>
                  <div className='post_box_top'>
                    <div className='postdata'>제목: {posts[selectedPost].title.content}</div>
                    <div className='postdata'>작성일: {posts[selectedPost].date.content}</div>
                  </div>
                  <div className='postdata'>내용: {posts[selectedPost].script.content}</div>
                </div>
                <div className="comment-container">
                  <div className="comment-list" id="commentList">
                    {/* 댓글 목록 출력 */}
                    {posts[selectedPost].comments.map((comment, index) => (
                      <div key={index} className="comment">
                        {comment}
                      </div>
                    ))}
                  </div>
                  <form className="comment-form" onSubmit={handleCommentSubmit}>
                    <textarea name="commentInput" placeholder="댓글을 입력하세요"></textarea>
                    <button type="submit">작성</button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
