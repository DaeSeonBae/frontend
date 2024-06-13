import React, {useEffect, useState} from 'react';
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

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleClick = () => {
    window.location.href = 'https://sugang.hsu.ac.kr/';
  };

  const formatTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초`;
  };

  return (
    <div>
      <b>{formatTime(currentTime)}</b>
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
      <hr/>
    </div>
  );
};

export default Enrolment;
