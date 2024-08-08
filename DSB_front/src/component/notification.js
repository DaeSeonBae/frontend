import React, { useState, useEffect, useRef } from 'react';
import '../component_style/notification.css';

const Notification = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState({
    '공지사항1': [{ text: '주요 정보\n\n난이도 : ★★★★★\n탑승인원 : 26인승\n운행시간 : 9시~17시 30분 사이 현장 방송 알림\n운행시기 : 5월~9월 수상레저 시즌\n이용가능 권종 : 무제한 이용권, 올인원 패키지\n단품 이용권 : 20,000원(인당 1회) 현장에서 구매가능', type: 'received', author: '관리자', time: '2023-08-01 10:00' }],
    '공지사항2': [{ text: '두 번째 공지사항 내용입니다.', type: 'received', author: '관리자', time: '2023-08-02 11:00' }],
    '공지사항3': [{ text: '세 번째 공지사항 내용입니다.', type: 'received', author: '관리자', time: '2023-08-03 12:00' }]
  });

  const notificationWindowRef = useRef(null);

  useEffect(() => {
    if (selectedNotification) {
      notificationWindowRef.current.scrollTop = notificationWindowRef.current.scrollHeight;
    }
  }, [notifications, selectedNotification]);

  const handleItemClick = (notification) => {
    setSelectedNotification(notification);
  };

  const handleCloseClick = () => {
    setSelectedNotification(null);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className='notification_container'>
      <div className='notification_box'>
        <h3> 알림함 </h3>
        {Object.keys(notifications).map((notification) => (
          <div
            key={notification}
            className='notification_list'
            onClick={() => handleItemClick(notification)}
          >
            {notification}
            <div className='notif_receive'>
              {truncateText(notifications[notification][0].text, 50)} {/* Adjust maxLength as needed */}
            </div>
          </div>
        ))}
      </div>
      {selectedNotification && (
        <div className='notification_detail'>
          <div className='detail_header'>
            <div className='header_title'> {selectedNotification} </div>
            <span className='close_button' onClick={handleCloseClick}>X</span>
          </div>
          <div className='notif_window' ref={notificationWindowRef}>
            {notifications[selectedNotification].map((notif, index) => (
              <div key={index} className={`notif_message_container ${notif.type}`}>
                <div className='notif_author'>{notif.author} - {notif.time}</div>
                <div className={`notif_message ${notif.type}`}>
                  <div className='notif_title'>제목 : {selectedNotification}</div>
                  <div className='notif_text'>{notif.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
