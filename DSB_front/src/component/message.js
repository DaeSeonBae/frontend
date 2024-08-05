import React, { useState } from 'react';
import '../component_style/message.css';

const Message = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleItemClick = (message) => {
    setSelectedMessage(message);
    setMessages([]); // Reset messages when a new chat is selected
  };

  const handleCloseClick = () => {
    setSelectedMessage(null);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, type: 'sent' }]);
      setInputValue('');
    }
  };

  const handleReceiveMessage = (text) => {
    setMessages([...messages, { text, type: 'received' }]);
  };

  return (
    <div className='message_container'>
      <div className='message_box'>
        <h3> 쪽지함 </h3>
        <p> 쪽지 리스트 </p>
        <div onClick={() => handleItemClick('message item1')}> message item1 </div>
        <div onClick={() => handleItemClick('message item2')}> message item2 </div>
        <div onClick={() => handleItemClick('message item3')}> message item3 </div>
      </div>
      {selectedMessage && (
        <div className='message_detail'>
          <div className='detail_header'>
            <div className='header_title'> 채팅방 </div>
            <span className='close_button' onClick={handleCloseClick}>X</span>
          </div>
          <div className='chat_window'>
            {messages.map((msg, index) => (
              <div key={index} className={`chat_message ${msg.type}`}>{msg.text}</div>
            ))}
          </div>
          <div className='chat_input_container'>
            <input 
              type='text' 
              value={inputValue} 
              onChange={handleInputChange} 
              className='chat_input' 
              placeholder='Type a message...' 
            />
            <button onClick={handleSendMessage} className='send_button'>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
