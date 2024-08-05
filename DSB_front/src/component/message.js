import React, { useState, useEffect, useRef } from 'react';
import '../component_style/message.css';

const Message = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState({
    'message item1': [{ text: '바보야', type: 'received' }],
    'message item2': [{ text: '바보야', type: 'received' }],
    'message item3': [{ text: '바보야', type: 'received' }]
  });
  const [inputValue, setInputValue] = useState('');
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (selectedMessage) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, selectedMessage]);

  const handleItemClick = (message) => {
    setSelectedMessage(message);
  };

  const handleCloseClick = () => {
    setSelectedMessage(null);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedMessage]: [
          ...prevMessages[selectedMessage],
          { text: inputValue, type: 'sent' },
        ],
      }));
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default action of the Enter key (e.g., form submission)
      handleSendMessage();
    }
  };

  return (
    <div className='message_container'>
      <div className='message_box'>
        <h3> 쪽지함 </h3>
        <div className='message_list' onClick={() => handleItemClick('message item1')}> message item1 
          <div className='msg_receive'> 바보야</div>
        </div>
        <div className='message_list' onClick={() => handleItemClick('message item2')}> message item2 
          <div className='msg_receive' > 바보야</div>
        </div>
        <div className='message_list' onClick={() => handleItemClick('message item3')}> message item3 
          <div className='msg_receive' > 바보야</div>
        </div>
      </div>
      {selectedMessage && (
        <div className='message_detail'>
          <div className='detail_header'>
            <div className='header_title'> 채팅방 - {selectedMessage} </div>
            <span className='close_button' onClick={handleCloseClick}>X</span>
          </div>
          <div className='chat_window' ref={chatWindowRef}>
            {messages[selectedMessage].map((msg, index) => (
              <div key={index} className={`chat_message ${msg.type}`}>{msg.text}</div>
            ))}
          </div>
          <div className='chat_input_container'>
            <textarea
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className='chat_input'
              placeholder='Type a message...'
              rows='3' /* Initial number of rows */
            />
            <button onClick={handleSendMessage} className='send_button'>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
