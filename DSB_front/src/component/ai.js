import React, { useState } from 'react';
import '../component_style/ai.css';
import send from '../images/send.png';

const Ai = () => {
  // 사용자의 입력을 관리하기 위한 상태 설정
  const [userInput, setUserInput] = useState('');
  // 채팅 메시지를 관리하기 위한 상태 설정
  const [chatMessages, setChatMessages] = useState([]);

  // 이미지를 클릭할 때 호출되는 함수
  const handleSendButtonClick = () => {
    // 사용자 입력이 비어있지 않은 경우에만 채팅 메시지로 추가
    if (userInput.trim() !== '') {
      setChatMessages([...chatMessages, userInput]); // 이전 메시지들에 새로운 메시지를 추가
      setUserInput(''); // 입력 필드를 비움
    }
  };

  return (
    <div className='main_body'>
      <div className='ai_container'>
        <h3>대선배 AI</h3>
        <div className='ai_chatcontainer'>
          <div className='ai_chatbox'>
            <div className='ai_output'>
              <div className='ai_name'>
                대선배 AI
              </div>
              <div className='ai_message'>
                안녕하세요 방문자님 궁금한 사항있으시면 편하게 물어봐주세요
              </div>
            </div>
            {/* 채팅 메시지를 화면에 표시 */}
            {chatMessages.map((message, index) => (
              <div className='user_output'>
                <div key={index} className='user'>
                  사용자
                </div>
                <div className='user_message'>
                  {message}
                </div>
              </div>
            ))}
          </div>
          <div className='user_chatInput'>
            {/* 사용자 입력을 받는 입력 필드 */}
            <input
              placeholder='Message 대선배 AI'
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendButtonClick(); // handleSendButtonClick 함수 호출
                }
              }}
            />
            {/* 이미지를 클릭할 때 handleSendButtonClick 함수 호출 */}
            <img src={send} alt='send' onClick={handleSendButtonClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ai;
