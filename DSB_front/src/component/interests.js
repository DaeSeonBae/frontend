import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../component_style/interests.css';
import logoIcon from '../images/DSB_logo.png';

const Interests = () => {
  //각 버튼 클릭 상태를 관리할 state 설정
  const [selectedFirstBtn, setSelectedFirstBtn] = useState(null);
  const [selectedSecondtBtn, setSelectedSecondBtn] = useState(null);
  const [selectedThirdBtn, setSelectedThirdBtn] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); //모달 오픈 여부

  //훅 사용
  const nextNavigate = useNavigate();
  const skipNavigate = useNavigate();

  //버튼 클릭 시 버튼의 이름이 저장됨
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
      <div className="logo">
        <h2>
          <Link to='/' className='login_link'>
            <img className='DSB_logo' src={logoIcon} alt='logoIcon' />
          </Link>
        </h2>
      </div>
      <div className="card">
        <h3>관심사 설정하기</h3>
        <div className="select-group">
          <h4>여가활동 및 취미생활</h4>
          <div className="buttons">
            <button type="button" name='song' className={selectedFirstBtn === 'song' ? 'selected' : ''} onClick={() => handleFirstBtnClick('song')}>노래</button>
            <button type="button" name='movie' className={selectedFirstBtn === 'movie' ? 'selected' : ''} onClick={() => handleFirstBtnClick('movie')}>영화</button>
            <button type="button" name='workOut' className={selectedFirstBtn === 'workOut' ? 'selected' : ''} onClick={() => handleFirstBtnClick('workOut')}>운동</button>
            <button type="button" name='game' className={selectedFirstBtn === 'game' ? 'selected' : ''} onClick={() => handleFirstBtnClick('game')}>게임</button>
          </div>
        </div>
        <div className="select-group">
          <h4>노래</h4>
          <div className="buttons">
            <button type="button" name='k-pop' className={selectedSecondtBtn === 'k-pop' ? 'selected' : ''} onClick={() => handleSecondBtnClick('k-pop')}>k-pop</button>
            <button type="button" name='j-pop' className={selectedSecondtBtn === 'j-pop' ? 'selected' : ''} onClick={() => handleSecondBtnClick('j-pop')}>j-pop</button>
            <button type="button" name='pop' className={selectedSecondtBtn === 'pop' ? 'selected' : ''} onClick={() => handleSecondBtnClick('pop')}>팝송</button>
            <button type="button" name='ballade' className={selectedSecondtBtn === 'ballade' ? 'selected' : ''} onClick={() => handleSecondBtnClick('ballade')}>발라드</button>
          </div>
        </div>
        <div className="select-group">
          <h4>주요 관심 분야</h4>
          <div className="buttons">
            <button type="button" name='opposite-sex' className={selectedThirdBtn === 'opposite-sex' ? 'selected' : ''} onClick={() => handleThirdBtnClick('opposite-sex')}>이성</button>
            <button type="button" name='friend' className={selectedThirdBtn === 'friend' ? 'selected' : ''} onClick={() => handleThirdBtnClick('friend')}>친구</button>
            <button type="button" name='freshman' className={selectedThirdBtn === 'freshman' ? 'selected' : ''} onClick={() => handleThirdBtnClick('freshman')}>신입생</button>
            <button type="button" name='returning-student' className={selectedThirdBtn === 'returning-student' ? 'selected' : ''} onClick={() => handleThirdBtnClick('returning-student')}>복학생</button>
          </div>
        </div>
        <div className="moveBtn">
          <button type="button" className='nextBtn' onClick={handleNextBtnClick}>다음</button>
          <button type="button" className='skipBtn' onClick={handleSkipBtnClick}>SKIP</button>
        </div>
        {isModalOpen && (
          <div className="modal">
            <p>관심사 설정을 하지 않고 넘어가시겠습니까?(마이페이지에서 수정할 수 있습니다.)</p>
            <div className="confirmBtn">
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
