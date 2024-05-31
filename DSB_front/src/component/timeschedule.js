import React, { useState } from 'react';
import '../component_style/timeschedule.css';

const TimeSchedule = () => {

  const [friendList, setFriendList] = useState(['친구']);

  const handleAddFriendButtonClick = () => {
    setFriendList([...friendList, `친구 ${friendList.length + 1}`]);
  };
  // JSON 데이터 배열
  const scheduleDataArray = [
    {
      name: "게임 컨셉 디자인",
      classroom: "아) 1공 123",
      day: "월",
      time: "12:30-15:30",
      timeSlots: {
        time1: "12:30-13:30",
        time2: "13:30-14:30",
        time3: "14:30-15:30"
      }
    },
    {
      name: "데이터 구조",
      classroom: "아) 1공 124",
      day: "화",
      time: "9:30-12:30",
      timeSlots: {
        time1: "9:30-10:30",
        time2: "10:30-11:30",
        time3: "14:30-15:30"
      }
    },
    {
      name: "데이터 이해",
      classroom: "아) 1공 124",
      day: "화",
      time: "9:30-12:30",
      timeSlots: {
        time1: "11:30-12:30",
        time2: "12:30-13:30"
      }
    },
    {
      name: "웹 프로그래밍",
      classroom: "아) 1공 125",
      day: "수",
      time: "13:30-16:30",
      timeSlots: {
        time1: "13:30-14:30",
        time2: "14:30-15:30",
        time3: "15:30-16:30"
      }
    },
    {
      name: "알고리즘",
      classroom: "아) 1공 126",
      day: "목",
      time: "10:30-13:30",
      timeSlots: {
        time1: "10:30-11:30",
        time2: "11:30-12:30",
        time3: "12:30-13:30"
      }
    },
    {
      name: "네트워크",
      classroom: "아) 1공 127",
      day: "금",
      time: "14:30-17:30",
      timeSlots: {
        time1: "14:30-15:30",
        time2: "15:30-16:30",
        time3: "16:30-17:30"
      }
    }
  ];

  // 요일 배열
  const daysOfWeek = ['월', '화', '수', '목', '금'];

  // 랜덤 색상 배열
  const randomColors = ['#FFB6C1', '#87CEFA', '#98FB98', '#FFD700', '#FFA07A','#ffffdd']; // 여기에 원하는 색상 추가 가능

  // 추가된 수업 정보를 저장하는 상태
  const [addedSchedules, setAddedSchedules] = useState([]);

  // 특정 셀에 색칠할 클래스와 텍스트 반환 함수
  const getHighlightClassAndText = (day, time) => {
    const schedule = addedSchedules.find(schedule => schedule.day === day && (schedule.timeSlots.time1 === time || schedule.timeSlots.time2 === time || schedule.timeSlots.time3 === time));
    if (schedule) {
      return { className: 'highlight', text: schedule.name, color: schedule.color };
    }
    return { className: '', text: '', color: '' };
  };

  // 추가 버튼 클릭 핸들러
  const handleAddButtonClick = (rowData) => {
    // 랜덤한 색상 선택
    const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    // 새로운 과목 정보에 랜덤한 색상 추가
    const newSchedule = { ...rowData, color: randomColor };
    setAddedSchedules([...addedSchedules, newSchedule]);
  };

  // 삭제 버튼 클릭 핸들러
  const handleDeleteButtonClick = (rowData) => {
    setAddedSchedules(addedSchedules.filter(schedule => schedule.name !== rowData.name));
  };

  return (
    <div className='main_body'>
      <div className='schedule_container'>
      <div className='sc_first'>
          <div className='friend_box'>
            <h2>친구 목록</h2>
            {/* 친구 테이블 추가 */}
            <div className='friend_table'>
              <table>
                <tbody>
                  {friendList.map((friend, index) => (
                    <tr key={index}>
                      <td>{friend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={handleAddFriendButtonClick}>친구 추가</button>
          </div>
        </div>
        <div className='sc_middle'>
          <h2>시간표</h2>
          {/* 시간표 테이블 추가 */}
          <div className='sc_table'>
            <table>
              <thead>
                <tr>
                  <th>시간</th>
                  {daysOfWeek.map((day, index) => (
                    <th key={index}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* 각 시간대 및 요일에 해당하는 셀 생성 */}
                {[...Array(9)].map((_, rowIndex) => {
                  const startHour = 9 + rowIndex;
                  const startMinute = 30;
                  const endHour = startHour + 1;
                  const endMinute = '30';
                  const timeSlot = `${startHour}:${startMinute}-${endHour}:${endMinute}`;

                  return (
                    <tr key={rowIndex}>
                      <td>{timeSlot}</td>
                      {daysOfWeek.map((day, index) => {
                        const { className, text, color } = getHighlightClassAndText(day, timeSlot);
                        return <td key={index} className={className} style={{ backgroundColor: color }}>{text}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className='sc_end'>
          <input type='text' placeholder='과목을 입력해주세요'></input>
          <div className='class_table'>
            <p>과목 종류</p>
            <table>
              <thead>
                <tr>
                  <th>과목명</th>
                  <th>시간</th>
                  <th>요일</th>
                  <th>장소</th>
                  <th>추가</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {scheduleDataArray.map((schedule, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{schedule.name}</td>
                    <td>{schedule.time}</td>
                    <td>{schedule.day}</td>
                    <td>{schedule.classroom}</td>
                    {/* 추가 버튼 */}
                    <td>
                      <button onClick={() => handleAddButtonClick(schedule)}>추가</button>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteButtonClick(schedule)}>삭제</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSchedule;