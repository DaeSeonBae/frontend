import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../component_style/interests.css';
import logoIcon from '../images/DSB_logo.png';


const Interests = () => {

  //각 버튼 클릭 상태를 관리할 state 설정
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); //모달 오픈 여부

  //훅 사용
  const nextNavigate = useNavigate();
  const skipNavigate = useNavigate();

  //버튼 클릭 시 버튼의 이름이 저장됨
  const handleInterestButtonClick = (interest) => {
    // 이미 선택된 관심사인지 확인
    const isAlreadySelected = selectedInterests.includes(interest);

    if (isAlreadySelected) {
      // 이미 선택된 관심사인 경우, 배열에서 제거
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      // 선택되지 않은 관심사인 경우, 배열에 추가
      setSelectedInterests([...selectedInterests, interest]);
    }
  }

  const handleNextBtnClick = () => {
    nextNavigate('/'); //메인페이지로 이동
  }

  //SKIP을 눌렀을 때 모달 오픈
  const handleSkipBtnClick = () => {
    setIsModalOpen(true);
  }

  //예를 눌렀을 때 모달 닫기 및 메인페이지로 이동
  const handleConfirmSkip = () => {
    skipNavigate('/');
    setIsModalOpen(false);
  }

  //아니오를 눌렀을 때 모달 닫기
  const handleCancelSkip = () => {
    setIsModalOpen(false);
  }

  return (
    <div>
      <div class="logo">
        <h2>
          <Link to='/' className='login_link'>
            <img className='DSB_logo' src={logoIcon} alt = 'logoIcon'/>
          </Link>
        </h2>
      </div>
      <div class="card">
        <h3>관심사 설정하기</h3>
        <div class="select-group">
          <h4>여가활동 및 취미생활</h4>
          <div class="buttons">
            <button type="button" name="music" className={selectedInterests.includes('music') ? 'selected' : ''} onClick={() => handleInterestButtonClick('music')}>음악</button>
            <button type="button" name='movie' className={selectedInterests.includes('movie') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('movie')}>영화</button>
            <button type="button" name='sports' className={selectedInterests.includes('sports') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('sports')}>운동</button>
            <button type="button" name='travel' className={selectedInterests.includes('travel') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('travel')}>여행</button>
            <button type="button" name='art' className={selectedInterests.includes('art') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('art')}>미술</button>
            <button type="button" name='drama' className={selectedInterests.includes('drama') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('drama')}>드라마</button>
            <button type="button" name='game' className={selectedInterests.includes('game') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('game')}>게임</button>
          </div>
        </div>
        <div class="select-group">
          <h4>학업</h4>
          <div class="buttons">
            <button type="button" name='humanities' className={selectedInterests.includes('humanities') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('humanities')}>인문</button>
            <button type="button" name='Engineering' className={selectedInterests.includes('Engineering') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('Engineering')}>공학</button>
            <button type="button" name='lifeNhealth' className={selectedInterests.includes('lifeNhealth') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('lifeNhealth')}>생명보건</button>
            <button type="button" name='ai' className={selectedInterests.includes('ai') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('ai')}>ai융합</button>
            <button type="button" name='Art' className={selectedInterests.includes('Art') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('Art')}>예술</button>
            <button type="button" name='kinesiology' className={selectedInterests.includes('kinesiology') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('kinesiology')}>체육</button>
            <button type="button" name='management' className={selectedInterests.includes('management') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('management')}>경영</button>
          </div>
        </div>
        <div class="select-group">
          <h4>주요 관심 분야</h4>
          <div class="buttons">
            <button type="button" name='opposite-sex' className={selectedInterests.includes('opposite-sex') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('opposite-sex')}>이성</button>
            <button type="button" name='friend' className={selectedInterests.includes('friend') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('friend')}>친구</button>
            <button type="button" name='freshman' className={selectedInterests.includes('freshman') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('freshman')}>신입생</button>
            <button type="button" name='returning-student' className={selectedInterests.includes('returning-student') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('returning-student')}>복학생</button>
            <button type="button" name='graduateSchool' className={selectedInterests.includes('graduateSchool') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('graduateSchool')}>대학원</button>
          </div>
        </div>
        <div class="select-group">
          <h4>주요 관심 분야</h4>
          <div class="buttons">
            <button type="button" name='employment' className={selectedInterests.includes('employment') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('employment')}>취업</button>
            <button type="button" name='startups' className={selectedInterests.includes('startups') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('startups')}>친구</button>
            <button type="button" name='careerExploration' className={selectedInterests.includes('careerExploration') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('careerExploration')}>진로탐색</button>
            <button type="button" name='socialActivities' className={selectedInterests.includes('socialActivities') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('socialActivities')}>사회활동</button>
            <button type="button" name='service' className={selectedInterests.includes('service') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('service')}>봉사</button>
            <button type="button" name='internship' className={selectedInterests.includes('internship') ? 'selected' : ''} onClick={()=> handleInterestButtonClick('internship')}>인턴십</button>
          </div>
        </div>
        <div class="moveBtn">
          <button type="button" className='nextBtn' onClick={handleNextBtnClick}>다음</button>
          <button type="button" className='skipBtn' onClick={handleSkipBtnClick}>SKIP</button>
        </div>
        {isModalOpen && (
          <div class="interest_modal">
            <p>관심사 설정을 하지 않고 넘어가시겠습니까?(마이페이지에서 수정할 수 있습니다.)</p>
            <div class="confirmBtn">
              <button className='confirm' onClick={handleConfirmSkip}>예</button>
              <button className='cancel' onClick={handleCancelSkip}>아니오</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interests;