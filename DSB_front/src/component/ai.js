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
        const token = localStorage.getItem('Authorization');

        const response = await fetch('/api/ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({ query: userMessage }),
          mode: 'cors'
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();

        if (responseData.response.includes('error')) {
          // 응답 메시지에 'error'가 포함된 경우, 다시 질문하도록 처리
          setChatMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: 'ai',
              message: "죄송합니다. 질문을 이해하지 못했습니다. 다시 질문해주시겠습니까?",
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        } else {
          const parsedData = JSON.parse(responseData.response);
          setChatMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'ai', message: formatResponse(parsedData), timestamp: new Date().toLocaleTimeString() },
          ]);
        }
      } catch (error) {
        console.error('Error:', error);
        handleErrorMessage();
      }
    }
  };

  const handleErrorMessage = () => {
    const timestamp = new Date().toLocaleTimeString();
    setChatMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: 'ai',
        message: "죄송합니다. 질문을 이해하지 못했습니다. 다시 질문해주시겠습니까?",
        timestamp: timestamp,
      },
    ]);
  };

  const fetchStoredMessages = useCallback(async () => {
    try {
      const token = localStorage.getItem('Authorization');
  
      const response = await fetch('/api/ai', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        mode: 'cors'
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
  
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
  
      setChatMessages(newMessages);
  
    } catch (error) {
      console.error('Error fetching stored messages:', error);
      handleErrorMessage(); // 네트워크 에러 발생 시 메시지를 보여주는 함수 호출
    }
  }, []);

  useEffect(() => {
    fetchStoredMessages();
  }, [fetchStoredMessages]);

  return (
    <div className='main_body'>
      <div className='ai_container'>
        <h1>대선배 AI</h1>
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
