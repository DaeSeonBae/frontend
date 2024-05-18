import React from 'react';
import '../component_style/Enrolment.css';
import image1 from '../images/1.jpg';
import image2 from '../images/2.jpg';
import image3 from '../images/3.jpg';
import image4 from '../images/4.jpg';
import image5 from '../images/5.jpg';
import image6 from '../images/6.jpg';
import image7 from '../images/7.jpg';
import image8 from '../images/8.jpg';


const Enrolment = () => {

  const handleClick = () => {
    window.location.href = 'https://sugang.hsu.ac.kr/';
  };

  return (
    <div>
      <b>2024년 05월 10일 17시 10분 22초</b>
      <button className='enrolment_btn' onClick={handleClick}>수강 신청 하러 가기</button>
      <div className="image-container">
        <img src={image1} alt=''/>
        <img src={image2} alt=''/>
        <img src={image3} alt=''/>
        <img src={image4} alt=''/>
        <img src={image5} alt=''/>
        <img src={image6} alt=''/>
        <img src={image7} alt=''/>
        <img src={image8} alt=''/>
      </div>
    </div>
  );
};

export default Enrolment;
