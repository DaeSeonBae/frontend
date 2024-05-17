import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../component_style/interests.css';
import logoIcon from '../images/DSB_logo.png';


const Interests = () => {

  //각 버튼 클릭 상태를 관리할 state 설정
  const [selectedFirstBtn, setSelectedFirstBtn] = useState(null);
  const [selectedSecondtBtn, setSelectedSecondBtn] = useState(null);
  const [selectedThirdBtn, setSelectedThirdBtn] = useState(null);

  //훅 사용
  const navigate = useNavigate();

  //버튼 클릭 시 실행되는 함수
  const handleFirstBtnClick = (buttonName) => {
    setSelectedFirstBtn(buttonName);
  }

  const handleSecondBtnClick = (buttonName) => {
    setSelectedSecondBtn(buttonName);
  }

  const handleThirdBtnClick = (buttonName) => {
    setSelectedThirdBtn(buttonName);
  }

  const handleNextBtnClick = () => {
    navigate('/'); //메인페이지로 이동
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
            <button type="button" name='song' className={selectedFirstBtn === 'song' ? 'selected' : ''} onClick={()=> handleFirstBtnClick('song')}>노래</button>
            <button type="button" name='movie' className={selectedFirstBtn === 'movie' ? 'selected' : ''} onClick={()=> handleFirstBtnClick('movie')}>영화</button>
            <button type="button" name='workOut' className={selectedFirstBtn === 'workOut' ? 'selected' : ''} onClick={()=> handleFirstBtnClick('workOut')}>운동</button>
            <button type="button" name='game' className={selectedFirstBtn === 'game' ? 'selected' : ''} onClick={()=> handleFirstBtnClick('game')}>게임</button>
          </div>
        </div>
        <div class="select-group">
          <h4>노래</h4>
          <div class="buttons">
            <button type="button" name='k-pop' className={selectedSecondtBtn === 'k-pop' ? 'selected' : ''} onClick={()=> handleSecondBtnClick('k-pop')}>k-pop</button>
            <button type="button" name='j-pop' className={selectedSecondtBtn === 'j-pop' ? 'selected' : ''} onClick={()=> handleSecondBtnClick('j-pop')}>j-pop</button>
            <button type="button" name='pop' className={selectedSecondtBtn === 'pop' ? 'selected' : ''} onClick={()=> handleSecondBtnClick('pop')}>팝송</button>
            <button type="button" name='ballade' className={selectedSecondtBtn === 'ballade' ? 'selected' : ''} onClick={()=> handleSecondBtnClick('ballade')}>발라드</button>
          </div>
        </div>
        <div class="select-group">
          <h4>주요 관심 분야</h4>
          <div class="buttons">
            <button type="button" name='opposite-sex' className={selectedThirdBtn === 'opposite-sex' ? 'selected' : ''} onClick={()=> handleThirdBtnClick('opposite-sex')}>이성</button>
            <button type="button" name='friend' className={selectedThirdBtn === 'friend' ? 'selected' : ''} onClick={()=> handleThirdBtnClick('friend')}>친구</button>
            <button type="button" name='freshman' className={selectedThirdBtn === 'freshman' ? 'selected' : ''} onClick={()=> handleThirdBtnClick('freshman')}>신입생</button>
            <button type="button" name='returning-student' className={selectedThirdBtn === 'returning-student' ? 'selected' : ''} onClick={()=> handleThirdBtnClick('returning-student')}>복학생</button>
          </div>
        </div>
        <div class="moveBtn">
          <button type="button" className='nextBtn' onClick={handleNextBtnClick}>다음</button>
          <button type="button" className='skipBtn'>skip</button>
        </div>
      </div>
    </div>
  );
};

export default Interests;