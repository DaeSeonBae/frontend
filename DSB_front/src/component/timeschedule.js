import React, { useState } from 'react';
import '../component_style/timeschedule.css';

const TimeSchedule = () => {
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
        time3: "11:30-12:30"
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

  // 특정 셀에 색칠할 클래스와 텍스트 반환 함수
  const getHighlightClassAndText = (day, time) => {
    const schedule = scheduleDataArray.find(schedule => schedule.day === day && (schedule.timeSlots.time1 === time || schedule.timeSlots.time2 === time || schedule.timeSlots.time3 === time));
    if (schedule) {
      return { className: 'highlight', text: schedule.name };
    }
    return { className: '', text: '' };
  };

  // 각 셀의 색상을 나타내기 위한 상태
  const [highlightedCells, setHighlightedCells] = useState({});

  // 추가 버튼 클릭 핸들러
  const handleAddButtonClick = (rowData) => {
    // 클릭한 행의 요일과 time1, time2, time3 데이터 가져오기
    const { day, timeSlots } = rowData;
    const { time1, time2, time3 } = timeSlots;

    // 새로운 셀 색상 상태 객체 생성
    const newHighlightedCells = { ...highlightedCells };

    // 각 요일과 해당하는 시간대의 셀을 색칠
    daysOfWeek.forEach(dayOfWeek => {
      if (dayOfWeek === day) {
        newHighlightedCells[time1] = true;
        newHighlightedCells[time2] = true;
        newHighlightedCells[time3] = true;
      }
    });

    // 상태 업데이트
    setHighlightedCells(newHighlightedCells);
  };

  return (
    <div className='main_body'>
      <div className='schedule_container'>
        <div className='sc_first'>
          <p> 친구 </p>
          {/* 친구 테이블 추가 */}
          <div className='friend_table'>
            <table>
              <tbody>
                {[...Array(10)].map((_, index) => (
                  <tr key={index}>
                    <td>친구</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='sc_middle'>
          <p> 시간표 </p>
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
                {[...Array(8)].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {/* 시간대 표시 */}
                    <td>{`${9 + Math.floor(rowIndex / 2)}:${(rowIndex % 2 === 0) ? '00' : '30'}-${10 + Math.floor(rowIndex / 2)}:${(rowIndex % 2 === 0) ? '30' : '00'}`}</td>
                    {daysOfWeek.map((day, index) => {
                      const time = `${9 + Math.floor(rowIndex / 2)}:${(rowIndex % 2 === 0) ? '00' : '30'}-${10 + Math.floor(rowIndex / 2)}:${(rowIndex % 2 === 0) ? '30' : '00'}`;
                      const { className, text } = getHighlightClassAndText(day, time);
                      return <td key={index} className={highlightedCells[time] ? 'highlight' : ''}>{text}</td>;
                      // eslint-disable-next-line no-unused-vars
                    })}
                  </tr>
                ))}
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
                      <button>삭제</button>
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
