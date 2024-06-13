import React, { useState, useEffect, useCallback } from 'react';
import '../component_style/ai.css';
import send from '../images/send.png';

const Ai = () => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const formatResponse = (data) => {
    return (
      <div>
        <div>과목명: {data.과목명}</div>
        <div>학수번호: {data.학수번호}</div>
        <div>분반: {data.분반}</div>
        <div>학점: {data.학점}</div>
        <div>담당교수: {data.담당교수}</div>
        <div>강의시간: {data.강의시간}</div>
        <div>종류: {data.종류}</div>
      </div>
    );
  };

  const handleSendButtonClick = async () => {
    if (userInput.trim() !== '') {
      const userMessage = userInput;
      const timestamp = new Date().toLocaleTimeString();
      setChatMessages([...chatMessages, { sender: 'user', message: userMessage, timestamp }]);
      setUserInput('');

      try {
        const token = localStorage.getItem('Authorization'); // 인증 토큰을 로컬 스토리지에서 가져옴

        const response = await fetch('/api/ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token // 토큰을 헤더에 추가
          },
          body: JSON.stringify({ 
            query: userMessage 
          }), // query로 요청
          mode: 'cors'
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        const parsedData = JSON.parse(responseData.response); // JSON 문자열을 파싱하여 JavaScript 객체로 변환

        setChatMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'ai', message: formatResponse(parsedData), timestamp: new Date().toLocaleTimeString() },
        ]);
      } catch (error) {
        console.error('Error:', error);
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'ai', message: 'Error: Unable to fetch response from server.', timestamp: new Date().toLocaleTimeString() },
        ]);
      }
    }
  };

  const fetchStoredMessages = useCallback(async () => {
    try {
      const token = localStorage.getItem('Authorization');
  
      const response = await fetch('/api/ai', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log(responseData);
  
      const newMessages = responseData.map((msg) => {
        try {
          const parsedResponse = JSON.parse(msg.response.replace(/'/g, '"'));
          return [
            {
              sender: 'user',
              message: msg.query,
              timestamp: new Date().toLocaleTimeString()
            },
            {
              sender: 'ai',
              message: formatResponse(parsedResponse),
              timestamp: new Date().toLocaleTimeString()
            }
          ];
        } catch (error) {
          console.error('Error parsing JSON:', error);
          return []; // 예외 처리: 오류 발생 시 빈 배열 반환 또는 다른 처리 가능
        }
      }).flat();
  
      setChatMessages(newMessages); // 기존 메시지 대신에 새로운 메시지 배열로 설정
  
    } catch (error) {
      console.error('Error fetching stored messages:', error);
    }
  }, []);
  
  useEffect(() => {
    fetchStoredMessages();
  }, [fetchStoredMessages]);  

  return (
    <div className='main_body'>
      <div className='ai_container'>
        <h3>대선배 AI</h3>
        <div className='ai_chatcontainer'>
          <div className='ai_chatbox'>
            <div className='ai_output'>
              <div className='ai_name'>대선배 AI</div>
              <div className='ai_message'>
                안녕하세요 방문자님 궁금한 사항있으시면 편하게 물어봐주세요
              </div>
            </div>
            {chatMessages.map((chat, index) => (
              <div key={index} className={`${chat.sender}_output`}>
                <div className={chat.sender}>
                  {chat.sender === 'user' ? '사용자' : '대선배 AI'} <span className='timestamp'>{chat.timestamp}</span>
                </div>
                <div className={`${chat.sender}_message`}>{chat.message}</div>
              </div>
            ))}
          </div>
          <div className='user_chatInput'>
            <input
              placeholder='Message 대선배 AI'
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendButtonClick();
                }
              }}
            />
            <img src={send} alt='send' onClick={handleSendButtonClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ai;
