import React from 'react';
import '../component_style/review.css';


const Footer = () => {

  return (
    <div className='main_body'>
      <div className='review_container'>
        <div className='review_top'>
          <div className='title'>
            <h2>강의평가</h2>
          </div>
          <div className='option'>
            <div className='search'>
              <input type='text' placeholder='검색어를 입력하세요'></input>
            </div>
            <div className='sort'>
              <select>
                <option>별점순</option>
                <option>글자순</option>
              </select>
            </div>
          </div>
        </div>
        <div className='review_main'>
          <div className='review_item'>
            <div className='item_top'>
              <div className='item_title'>
                <h3>수학의 이해</h3>
              </div>
              <div className='star'>
                별점
              </div>
            </div>
            <div className='item_middle'>
              교수: 홍길동
            </div>
            <div className='item_bottom'>
              내용.....................
            </div>
          </div>
          <div className='review_item'></div>
          <div className='review_item'></div>
          <div className='review_item'></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

