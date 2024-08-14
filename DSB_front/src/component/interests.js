import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../component_style/interests.css';
import '../component_style/common.css';
import logoIcon from '../images/DSB_logo.png';

const Interests = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleInterestButtonClick = (interest) => {
    const isAlreadySelected = selectedInterests.includes(interest);

    if (isAlreadySelected) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleNextBtnClick = () => {
    navigate('/');
  };

  const handleSkipBtnClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmSkip = () => {
    navigate('/');
    setIsModalOpen(false);
  };

  const handleCancelSkip = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='container'>
      <div className="logo">
        <h2>
          <Link to='/' className='login_link'>
            <img className='DSB_logo' src={logoIcon} alt='logoIcon' />
          </Link>
        </h2>
      </div>
      <div className="interest_card">
        <h3>관심사 설정하기</h3>
        <div className="buttons">
          {['IT', '글쓰기', '연극', '디자인', '운동', '광고/마케팅', '창업', '기획/아이디어', '해외', '장학금', '음악', '봉사', '캐릭터/만화/게임', '사진/영상/UCC', '방송'].map(interest => (
            <button
              key={interest}
              className={selectedInterests.includes(interest) ? 'selected' : ''}
              onClick={() => handleInterestButtonClick(interest)}
            >
              {interest}
            </button>
          ))}
        </div>
        <div className="moveBtn">
          <button type="button" className='nextBtn' onClick={handleNextBtnClick}>다음</button>
          <button type="button" className='skipBtn' onClick={handleSkipBtnClick}>SKIP</button>
        </div>
        {isModalOpen && (
          <div className="interest_modal">
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
