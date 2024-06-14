import React from 'react';

const PostList = ({ posts, openModal, handleLikeClick, likes, getRandomColor }) => {
  return (
    <div className="list_box">
      {posts.map((post, index) => (
        <div className="list_item" key={index} onClick={() => openModal(index)} style={{ backgroundColor: getRandomColor() }}>
          <div className='list_item_content'>
            {post.title.content}
          </div>
          <div className='like'>
            <i className="fas fa-heart" style={{ color: 'red', cursor:'pointer' }} onClick={(e) => {
              e.stopPropagation();
              handleLikeClick(index);
            }}>{likes[index]}
            </i>
            <i className="fas fa-comment">
              {post.comments.length}
            </i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
