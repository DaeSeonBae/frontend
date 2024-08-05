import React, { useState } from 'react';
import '../component_style/postMessage.css';

const PostMessage = () => {
  const [selectedNote, setSelectedNote] = useState(null);

  const notes = [
    { id: 1, title: '게시글 제목 1', nickname: '사용자1' },
    { id: 2, title: '게시글 제목 2', nickname: '사용자2' },
    // Add more notes here
  ];

  const noteContent = {
    1: [
      { time: '16:14', text: '안녕하세요!' },
      { time: '16:15', text: '안녕하세요, 잘 지내셨나요?' }
    ],
    2: [
      { time: '17:00', text: '오늘 날씨가 좋네요.' },
      { time: '17:05', text: '네, 정말 좋아요!' }
    ]
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleDeleteNote = (id) => {
    // 삭제 로직을 여기에 추가하세요
    alert(`쪽지 ${id} 삭제됨`);
  };

  return (
    <div className="notes-container">
      <div className="notes-sidebar">
        {notes.map(note => (
          <div key={note.id} className="note-item">
            <span onClick={() => handleNoteClick(note)}>{note.title}</span>
            <button onClick={() => handleDeleteNote(note.id)}>삭제</button>
          </div>
        ))}
      </div>
      <div className="notes-content">
        {selectedNote ? (
          <>
            <div className="note-header">
              <h2>{selectedNote.nickname}</h2>
              <h3>{selectedNote.title}</h3>
            </div>
            <div className="chat">
              {noteContent[selectedNote.id]?.map((message, index) => (
                <div key={index} className="message">
                  <div className="message-time">{message.time}</div>
                  <div className="message-text">{message.text}</div>
                </div>
              ))}
            </div>
            <input type="text" className="message-input" placeholder="쪽지를 입력해주세요" />
          </>
        ) : (
          <div className="no-selection">쪽지를 선택해주세요</div>
        )}
      </div>
    </div>
  );
};

export default PostMessage;
