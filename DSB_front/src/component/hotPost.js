import React, { useState, useEffect, useCallback } from 'react';
import '../component_style/post.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import PostList from './PostList'; // Import the new component

const HotPost = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 수정 모달 상태
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [editTitle, setEditTitle] = useState(''); // 수정할 제목
  const [editContent, setEditContent] = useState(''); // 수정할 내용
  const [liked, setLiked] = useState([]); // 각 게시물이 좋아요 눌렸는지 여부를 저장
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);
  const [editComment, setEditComment] = useState('');
  


  // 이미지 업로드 핸들러
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imagePreviews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          imagePreviews.push(reader.result);
          if (imagePreviews.length === files.length) {
            setImagePreview(imagePreviews);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // 이미지 삭제 핸들러
  const handleImageDelete = (index) => {
    const newImagePreviews = [...imagePreview];
    newImagePreviews.splice(index, 1);
    setImagePreview(newImagePreviews);
  };

  // 날짜 형식 변환 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // 제한된 색상 목록에서 랜덤 색상 선택 함수
  const colors = ['#FFEEDD', '#FFFFDD', '#EEFFDD', '#DDFFFF', '#DDDDFF','#FFDDFF'];
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  // 게시글 리스트 API에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await fetch('/api/board/list/hot', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Authorization': token
          }
        });
        const data = await response.json();
  
        const postsWithComments = await Promise.all(data.map(async (post) => {
          const commentsResponse = await fetch(`/api/board/comment/${post.boardNumber}`, {
            method: 'GET',
            headers: {
              'Authorization': token
            },
            mode: 'cors'
          });
          const commentsData = await commentsResponse.json();
        
          return {
            boardNumber: post.boardNumber,
            title: { content: post.title },
            script: { content: post.content },
            date: { content: formatDate(post.writeDatetime) },
            likes: post.favoriteCount,
            comments: commentsData, // 여기에 댓글 데이터 확인
            writerEmail: post.writerEmail,
            imageKeys: post.imageKeys || []
          };
        }));
        
        console.log('hot success');

        setPosts(postsWithComments);
        setLikes(postsWithComments.map(post => post.likes));
        setLiked(postsWithComments.map(() => false));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  // 모달 열기
  const openModal = (index) => {
    setSelectedPost(index);
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

  // 수정 모달 열기
  const openEditModal = (index) => {
    setSelectedPost(index);
    setEditTitle(posts[index].title.content);
    setEditContent(posts[index].script.content);
    setIsEditModalOpen(true);
  };

  // 수정 모달 닫기
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

 // 댓글 작성 핸들러
  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    const commentInput = event.target.elements.commentInput;
    const commentText = commentInput.value.trim();

    if (commentText !== '' && selectedPost !== null) {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await fetch(`/api/board/comment/${posts[selectedPost].boardNumber}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({
            content: commentText
          }),
          mode: 'cors'
        });

        if (response.ok) {
          // 서버에서 성공적으로 처리되었을 때, 클라이언트 상태 업데이트
          const newPosts = [...posts];
          newPosts[selectedPost].comments.push(commentText);
          setPosts(newPosts);
          commentInput.value = ''; // 입력 필드 초기화
          console.log('success');
        } else {
          console.error('Failed to post comment:', response.statusText);
          // 실패 처리 로직 추가
        }
      } catch (error) {
        console.error('Error posting comment:', error);
        // 에러 처리 로직 추가
      }
    } else {
      console.error('No comment text or selected post');
    }
  };

  // 댓글 수정 핸들러
  const handleCommentEdit = (index) => {
    console.log('Edit comment at index:', index); // 인덱스를 콘솔에 출력
    // console.log(comments[selectedCommentIndex]);
    setSelectedCommentIndex(index);
    setEditComment(posts[selectedPost].comments[index].content);

  };
  

  // 댓글 수정 제출 핸들러
  const handleCommentEditSubmit = async (event) => {
    event.preventDefault();
    if (selectedCommentIndex === null || selectedPost === null) return;

    const comment = posts[selectedPost].comments[selectedCommentIndex];
    const commentId = comment.commentNumber;
    const boardId = posts[selectedPost].boardNumber;

    console.log('comment : ',comment)
    console.log('commentId : ',commentId)
    console.log('boardId : ',boardId)

    if (!commentId) return;

    try {
      const token = localStorage.getItem('Authorization');
      const response = await fetch(`/api/board/comment?commentId=${commentId}&boardId=${boardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ content: editComment }),
        mode: 'cors'
      });
      window.location.reload()
      if (response.ok) {
        const updatedComment = await response.json();
        const updatedPosts = [...posts];
        updatedPosts[selectedPost].comments[selectedCommentIndex] = updatedComment;
        setPosts(updatedPosts);
        setSelectedCommentIndex(null);
        console.log('success');
      } else {
        console.error('Failed to edit comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  // 댓글 삭제 핸들러
  const handleCommentDelete = async (index) => {
    if (selectedPost === null) {
      console.error('선택된 게시물이 없습니다.');
      return;
    }
  
    const comment = posts[selectedPost].comments[index];
    if (!comment) {
      console.error('선택한 댓글을 찾을 수 없습니다.');
      return;
    }
  
    const commentId = comment.commentNumber;
    const boardId = posts[selectedPost].boardNumber;
  
    if (!commentId || !boardId) {
      console.error('commentId 또는 boardId를 찾을 수 없습니다.');
      return;
    }
  
    try {
      const token = localStorage.getItem('Authorization');
      if (!token) {
        console.error('토큰을 찾을 수 없습니다.');
        return;
      }
  
      const response = await fetch(`/api/board/comment?commentId=${commentId}&boardId=${boardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        // body: JSON.stringify({ content: "" }),
        mode: 'cors'
      });
  
      if (response.ok) {
        const newPosts = [...posts];
        newPosts[selectedPost].comments.splice(index, 1);
        setPosts(newPosts);
        console.log('댓글이 성공적으로 삭제되었습니다.');
      } else {
        const errorText = await response.text(); // 상세 오류 메시지 확인
        console.error('Failed to delete comment:', response.status, response.statusText, errorText);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  
  
  // 게시물 작성 핸들러
  const handlePostSubmit = async (event) => {
    event.preventDefault();

    const titleInput = event.target.elements.titleInput;
    const contentInput = event.target.elements.contentInput;

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title === '' || content === '') {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    if (imagePreview.length > 0) {
      for (let i = 0; i < imagePreview.length; i++) {
        const imageKey = `image_${Date.now()}_${i}`;
        formData.append('images', imagePreview[i], imageKey);
      }
    }

    try {
      const token = localStorage.getItem('Authorization');

      if (!token) {
        alert('인증 토큰이 없습니다. 로그인 상태를 확인해주세요.');
        return;
      }

      const response = await fetch('/free-board', {
        method: 'POST',
        headers: {
          'Authorization': token
        },
        body: formData,
        mode: 'cors'
      });

      if (response.ok) {
        const newPost = {
          post_number: (posts.length + 1).toString(),
          title: { content: title },
          date: { content: formatDate(new Date()) },
          name: "User",
          script: { content: content },
          comments: [],
          imageKeys: [] // 서버에서 이미지를 저장한 후 반환된 키를 저장해야 합니다.
        };
        
        setPosts([...posts, newPost]);
        setLikes([...likes, 0]);
        closeModal2();
      } else {
        console.error('Failed to post data to server:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting data to server:', error);
    }
  };

  // 게시물 수정 핸들러
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    console.log(posts[selectedPost].boardNumber);

    if (editTitle === '' || editContent === '') {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('title', editTitle);
    formData.append('content', editContent);

    // 필요한 경우 이미지 데이터를 추가합니다.
    if (imagePreview.length > 0) {
      for (let i = 0; i < imagePreview.length; i++) {
        const imageKey = `image_${Date.now()}_${i}`;
        formData.append('images', imagePreview[i], imageKey);
      }
    }

    try {
      const token = localStorage.getItem('Authorization');

      if (!token) {
        alert('인증 토큰이 없습니다. 로그인 상태를 확인해주세요.');
        return;
      }

      const response = await fetch(`/api/board/${posts[selectedPost].boardNumber}`, {
        method: 'PUT',
        headers: {
          'Authorization': token
        },
        body: formData,
        mode: 'cors'
      });

      if (response.ok) {
        const updatedPosts = [...posts];
        updatedPosts[selectedPost] = {
          ...updatedPosts[selectedPost],
          title: { content: editTitle },
          script: { content: editContent },
          // 이미지 키도 업데이트 해야 할 수 있습니다.
        };
        setPosts(updatedPosts);
        closeEditModal();
      } else {
        console.error('Failed to update data on server:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating data on server:', error);
    }
  };

  // 게시물 삭제 핸들러
  const handleDelete = async (index) => {
    try {
      const token = localStorage.getItem('Authorization');

      if (!token) {
        alert('인증 토큰이 없습니다. 로그인 상태를 확인해주세요.');
        return;
      }

      const response = await fetch(`/api/board/${posts[index].boardNumber}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token
        },
        mode: 'cors'
      });

      if (response.ok) {
        const updatedPosts = [...posts];
        updatedPosts.splice(index, 1);
        setPosts(updatedPosts);
        setShowModal(false);
      } else {
        console.error('Failed to delete data on server:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting data on server:', error);
    }
  };

  const getImagesFromLocalStorage = (imageKeys) => {
    if (!imageKeys || !Array.isArray(imageKeys)) {
      return [];
    }

    const images = imageKeys.map(key => localStorage.getItem(key));

    // 이미지가 로컬 스토리지에 없는 경우 필터링
    return images.filter(image => image !== null);
  };

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = useCallback(async (index) => {
    try {
      const token = localStorage.getItem('Authorization');
      if (!token) {
        alert('인증 토큰이 없습니다. 로그인 상태를 확인해주세요.');
        return;
      }

      const method = liked[index] ? 'DELETE' : 'POST';
      const response = await fetch(`/api/board/favorite/${posts[index].boardNumber}`, {
        method: method,
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      });

      if (response.ok) {
        setLikes((prevLikes) => {
          const newLikes = [...prevLikes];
          newLikes[index] = liked[index] ? prevLikes[index] - 1 : prevLikes[index] + 1;
          return newLikes;
        });

        setLiked((prevLiked) => {
          const newLiked = [...prevLiked];
          newLiked[index] = !prevLiked[index];
          return newLiked;
        });

        // 상태 업데이트 후 페이지 새로고침
        window.location.reload();
      } else {
        const errorText = await response.text();
        console.error('Failed to like the post:', response.status, response.statusText, errorText);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  }, [liked, posts]);

  return (
    <div>
      <div className="main_body">
        <div className="middle">
          <div className="post_container">
            <div>
              <div className="sub_header">
                <h6 className="sub_name">Hot 게시판</h6>
                <div className='create_button'>
                  <button onClick={openModal2}> 글쓰기 </button>
                </div>
              </div>
              {isModalOpen && (
                <div className="modal">
                  <div className="modal_content">
                    <div className='choiceOption'>
                      <form className='modal_form' onSubmit={handlePostSubmit}>
                        <div className='postGroup'>
                          <div className='postSelect'>
                            <div className='postname'>
                              자유게시판
                            </div>
                            <button className='postWrite' type="submit">게시글 작성</button>
                            <span className="close" onClick={closeModal2}>&times;</span>
                          </div>
                          <div className='titleinput'>
                            <input type="text" placeholder="제목을 입력하세요" name="titleInput" required />                          
                          </div>
                        </div>
                        <div className='scriptBox'>
                          <textarea className="post_Content" rows="4" placeholder='내용을 작성하세요' name="contentInput" required></textarea>
                        </div>
                        <div className='img_input'>
                          <input 
                            type="file" 
                            accept="image/*" 
                            style={{ display: 'none' }} 
                            id="imgUpload" 
                            onChange={handleImageUpload} 
                            multiple
                          />
                          <label htmlFor="imgUpload" className='img_upload'>이미지</label>
                          <div className='img_Preview'>
                            {imagePreview && imagePreview.map((preview, index) => (
                              <div key={index} className="img_preview_item">
                                <img src={preview} alt={`preview-${index}`} className="img_preview_thumbnail" />
                                <button onClick={() => handleImageDelete(index)} className="img_delete_button">&times;</button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
              {isEditModalOpen && (
                <div className="modal">
                  <div className="modal_content">
                    <div className='choiceOption'>
                      <form className='modal_form' onSubmit={handleEditSubmit}>
                        <div className='postGroup'>
                          <div className='postSelect'>
                            <div className='postname'>
                              게시물 수정
                            </div>
                            <button type="submit">저장</button>
                            <span className="close" onClick={closeEditModal}>&times;</span>
                          </div>
                          <div className='titleinput'>
                            <input 
                              type="text" 
                              placeholder="제목을 입력하세요" 
                              name="editTitle" 
                              value={editTitle} 
                              onChange={(e) => setEditTitle(e.target.value)} 
                              required 
                            />                          
                          </div>
                        </div>
                        <div className='scriptBox'>
                          <textarea 
                            className="post_Content" 
                            rows="4" 
                            placeholder='내용을 작성하세요' 
                            name="editContent" 
                            value={editContent} 
                            onChange={(e) => setEditContent(e.target.value)} 
                            required
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
              {selectedCommentIndex !== null && (
                <div className="modal">
                  <div className="modal_content">
                    <span className="close" onClick={() => setSelectedCommentIndex(null)}>&times;</span>
                    <div className='choiceOption'>
                      <form className='modal_form' onSubmit={handleCommentEditSubmit}>
                        <div className='postGroup'>
                          <div className='postSelect'>
                            <div className='postname'>
                              댓글 수정
                            </div>
                            <button type="submit">저장</button>
                          </div>
                          <div className='titleinput'>
                            <textarea
                              value={editComment}
                              onChange={(e) => setEditComment(e.target.value)}
                              rows="4"
                              placeholder='내용을 수정하세요'
                              required
                            ></textarea>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
              <PostList
                posts={posts}
                openModal={openModal}
                handleLikeClick={handleLikeClick}
                likes={likes}
                getRandomColor={getRandomColor}
              />
            </div>
          </div>
          {showModal && selectedPost !== null && posts[selectedPost] && (
            <div className="modal">
              <div className="modal_content">
                <span className="close" onClick={closeModal}>&times;</span>
                <div className='main_post_box'>
                  <div className='post_box_top'>
                    <div className='postdata'>제목: {posts[selectedPost].title.content}</div>
                    <div className='postdata'>작성일: {posts[selectedPost].date.content}</div>
                  </div>
                  <div className='postdata'>내용: {posts[selectedPost].script.content}</div>
                  <div className='post_images'>
                    <Carousel>
                      {getImagesFromLocalStorage(posts[selectedPost].imageKeys).map((image, index) => (
                        <img key={index} src={image} alt='' className='post_image'/>
                      ))}
                    </Carousel>
                  </div>
                </div>
                <div className="comment-container">
                  <div className="comment-list" id="commentList">
                    {posts[selectedPost].comments.map((comment, index) => (
                      <div key={index} className="comment">
                        {comment.content}
                        <div className="comment-actions">
                          <button onClick={() => handleCommentEdit(index)}>수정</button>
                          <button onClick={() => handleCommentDelete(index)}>삭제</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form className="comment-form" onSubmit={handleCommentSubmit}>
                    <textarea name="commentInput" placeholder="댓글을 입력하세요"></textarea>
                    <button type="submit">작성</button>
                  </form>
                </div>

                <div className='post_actions'>
                  <button onClick={() => openEditModal(selectedPost)}>수정</button>
                  <button onClick={() => handleDelete(selectedPost)}>삭제</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotPost; 