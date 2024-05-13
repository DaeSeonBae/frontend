import React, { useState, useEffect } from 'react';
import '../component_style/calculate.css';
import ReactApexChart from 'react-apexcharts';

const Calculate = () => {
  // 각 학기별 성적을 담을 상태
  const [grades, setGrades] = useState({
    '1-1': '',
    '1-2': '',
    '2-1': '',
    '2-2': '',
    '3-1': '',
    '3-2': '',
    '4-1': '',
    '4-2': ''
  });

  // 시리즈 데이터 업데이트
  const seriesData = Object.keys(grades).map(semester => grades[semester] === '' ? 0 : parseFloat(grades[semester]));

  // 입력된 성적을 업데이트하는 함수
  const handleGradeChange = (semester, value) => {
    setGrades(prevGrades => ({
      ...prevGrades,
      [semester]: value === '0' ? '' : value // 값이 '0'인 경우 빈 문자열로 변경
    }));
  };

  // 그래프의 상태
  const chartState = {
    series: [{
      name: "Desktops",
      data: seriesData
    }],
    options: {
      // 그래프 옵션 설정
    }
  };
// 초기 테이블 데이터
const initialTableData = [
  ['', '', '', false]
];

// 테이블 데이터와 사용자가 입력한 값을 상태로 관리
const [tableData, setTableData] = useState(initialTableData);

// 항목 추가 버튼을 클릭했을 때 실행되는 함수
const handleAddRow = () => {
  const newRow = ['', '', '', false]; // 초기 체크박스 상태는 false로 설정
  setTableData(prevData => [...prevData, newRow]);
};

// 항목 삭제 버튼을 클릭했을 때 실행되는 함수
const handleDeleteRow = (index) => {
  setTableData(prevData => prevData.filter((_, i) => i !== index));
};

// 입력값 변경 시 실행되는 함수
const handleInputChange = (value, rowIndex, colIndex) => {
  setTableData(prevData => {
    const newData = [...prevData];
    newData[rowIndex][colIndex] = value;
    return newData;
  });
};

// 체크박스 상태 변경 시 실행되는 함수
const handleCheckboxChange = (checked, rowIndex) => {
  setTableData(prevData => {
    const newData = [...prevData];
    newData[rowIndex][3] = checked;
    return newData;
  });
};

// 스크롤이 필요한지 확인하고 스타일을 업데이트하는 효과
useEffect(() => {
  const inputBox = document.querySelector('.input_box');
  if (inputBox.scrollHeight > 450) {
    inputBox.style.overflowY = 'auto';
  } else {
    inputBox.style.overflowY = 'visible';
  }
}, [tableData]); // tableData가 변경될 때마다 실행됨

  return (
    <div className='main_body'>
      <div className='inputscore'>
        <div className='inputscore_box'>
          <div className='top'>
            <h2>학점 계산기</h2>
            <select className='grade'>
              <option value={1-1}>1-1</option>
              <option value={1-2}>1-2</option>
              <option value={2-1}>2-1</option>
              <option value={2-2}>2-2</option>
              <option value={3-1}>3-1</option>
              <option value={3-2}>3-2</option>
              <option value={4-1}>4-1</option>
              <option value={4-2}>4-2</option>
            </select>
          </div>
          <div className='mid'>
            <div className='input_box'>
              <table>
                <thead>
                  <tr>
                    <th>과목명</th>
                    <th>학점</th>
                    <th>성적</th>
                    <th>전공</th>
                  </tr>
                </thead>
                <tbody style={{ verticalAlign: 'middle' }}>
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex} style={{ textAlign: 'center' }}>
                      {row.map((item, colIndex) => (
                        <td key={colIndex} style={{ padding: '10px' }}>
                          {colIndex === 3 ? ( // 마지막 열일 때
                            <input
                              type="checkbox"
                              checked={item}
                              onChange={(e) => handleCheckboxChange(e.target.checked, rowIndex)}
                            />
                          ) : (
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => handleInputChange(e.target.value, rowIndex, colIndex)}
                            />
                          )}
                        </td>
                      ))}
                      <td>
                      <button onClick={() => handleDeleteRow(rowIndex)} style={{width: '20px', height: '20px',textAlign:'center'}}>X</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={handleAddRow}>항목 추가</button>
            </div>
          </div>
          <div className='bottom'>
            <div>
              {/* 각 학기별 성적을 입력하는 input 필드 */}
              {Object.keys(grades).map(semester => (
                <input
                  key={semester}
                  type='number'
                  step='0.1'
                  value={grades[semester]}
                  onChange={(e) => handleGradeChange(semester, e.target.value)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='outscore'>
        <div className='outscore_box'>
          <div>
            <div id="chart">
              {/* 그래프 표시 */}
              <ReactApexChart options={chartState.options} series={chartState.series} type="line" height={350} />
            </div>
          <div id="html-dist"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculate;
