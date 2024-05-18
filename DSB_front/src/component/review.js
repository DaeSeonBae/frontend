import React, { useState } from 'react';
import '../component_style/review.css';
import StarRating from './StarRating';

// 샘플 JSON 데이터
const reviews = [
  {
    "title": "수학의 이해",
    "star": 4,
    "professor": "홍길동",
    "script": "내용....................."
  },
  {
    "title": "물리학의 기초",
    "star": 3,
    "professor": "이순신",
    "script": "기초적인 물리학 내용..."
  },
  // 필요한 만큼 객체 추가
];

const Review = () => {
  const [reviewList, setReviewList] = useState(reviews); // 리뷰 데이터 상태 관리
  const [selectedReview, setSelectedReview] = useState(null); // 선택된 리뷰 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 표시 상태 관리
  const [newReview, setNewReview] = useState({ title: '', star: 0, professor: '', script: '' });
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 관리
  const [sortOption, setSortOption] = useState('별점순'); // 정렬 옵션 상태 관리

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleStarChange = (rating) => {
    setNewReview({ ...newReview, star: rating });
  };

  const handleAddReview = () => {
    setReviewList([...reviewList, newReview]);
    setNewReview({ title: '', star: 0, professor: '', script: '' });
    handleCloseModal();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // 필터링된 리뷰를 검색어에 따라 필터링
  const filteredReviews = reviewList.filter(review =>
    review.title.includes(searchQuery) ||
    review.professor.includes(searchQuery) ||
    review.script.includes(searchQuery)
  );

  // 정렬 옵션에 따라 필터링된 리뷰를 정렬
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortOption === '글자순') {
      return a.title.localeCompare(b.title, 'ko', { sensitivity: 'base' });
    } else if (sortOption === '별점순') {
      return b.star - a.star;
    }
    return 0;
  });

  return (
    <div className='main_body'>
      <div className={`review_container ${selectedReview ? 'shrink' : ''}`}>
        <div className='review_top'>
          <div className='title'>
            <h2>강의평가</h2>
          </div>
          <div className='option'>
            <div className='search'>
              <input
                type='text'
                placeholder='검색어를 입력하세요'
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className='sort'>
              <select value={sortOption} onChange={handleSortChange}>
                <option value='별점순'>별점순</option>
                <option value='글자순'>글자순</option>
              </select>
            </div>
            <button onClick={handleOpenModal}>작성하기</button>
          </div>
        </div>
        <div className='review_main'>
          {sortedReviews.map((review, index) => (
            <div
              className='review_item'
              key={index}
              onClick={() => setSelectedReview(review)}
            >
              <div className='item_top'>
                <div className='item_title'>
                  <h3>{review.title}</h3>
                </div>
                <div className='star'>
                  {'★'.repeat(review.star) + '☆'.repeat(5 - review.star)}
                </div>
              </div>
              <div className='item_middle'>
                교수: {review.professor}
              </div>
              <div className='item_bottom'>
                {review.script}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedReview && (
        <div className='review_detail'>
          <div className='detail_top'>
            <h3>{selectedReview.title}</h3>
            <button onClick={() => setSelectedReview(null)}>X</button>
          </div>
          <div className='detail_middle'>
            교수: {selectedReview.professor}
          </div>
          <div className='detail_bottom'>
            {selectedReview.script}
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className='modal'>
          <div className='review_modal_content'>
            <h3>강의평가 작성</h3>
            <input
              type='text'
              name='title'
              placeholder='제목'
              value={newReview.title}
              onChange={handleInputChange}
            />
            <StarRating
              rating={newReview.star}
              onRatingChange={handleStarChange}
            />
            <input
              type='text'
              name='professor'
              placeholder='교수명'
              value={newReview.professor}
              onChange={handleInputChange}
            />
            <textarea
              name='script'
              placeholder='내용'
              value={newReview.script}
              onChange={handleInputChange}
            />
            <button onClick={handleAddReview}>저장</button>
            <button onClick={handleCloseModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
