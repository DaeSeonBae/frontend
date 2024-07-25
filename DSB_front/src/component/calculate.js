import React, { useState, useEffect } from 'react';
import '../component_style/calculate.css';
import ReactApexChart from 'react-apexcharts';

const Calculate = () => {
  const [grades] = useState({
    '1-1': '',
    '1-2': '',
    '2-1': '',
    '2-2': '',
    '3-1': '',
    '3-2': '',
    '4-1': '',
    '4-2': ''
  });

  const [currentSemester, setCurrentSemester] = useState('1-1');
  const [tableData, setTableData] = useState([['', '', '', false]]);
  const [averageGrades, setAverageGrades] = useState({
    '1-1': 0,
    '1-2': 0,
    '2-1': 0,
    '2-2': 0,
    '3-1': 0,
    '3-2': 0,
    '4-1': 0,
    '4-2': 0
  });

  const handleInputChange = (value, rowIndex, colIndex) => {
    setTableData(prevData => {
      const newData = [...prevData];
      newData[rowIndex][colIndex] = value;
      if (colIndex === 2) {
        updateAverage(newData);
      }
      return newData;
    });
  };

  const handleAddRow = () => {
    const newRow = ['', '', '', false];
    setTableData(prevData => [...prevData, newRow]);
  };

  const updateAverage = (data) => {
    let sum = 0;
    let count = 0;
    data.forEach(row => {
      const grade = parseFloat(row[2]);
      if (!isNaN(grade)) {
        sum += grade;
        count++;
      }
    });
    const average = count > 0 ? (sum / count) : 0;
    setAverageGrades(prevGrades => ({
      ...prevGrades,
      [currentSemester]: average
    }));
  };

  const handleDeleteRow = (index) => {
    setTableData(prevData => {
      const newData = prevData.filter((_, i) => i !== index);
      updateAverage(newData);
      return newData;
    });
  };

  const handleCheckboxChange = (checked, rowIndex) => {
    setTableData(prevData => {
      const newData = [...prevData];
      newData[rowIndex][3] = checked;
      return newData;
    });
  };

  useEffect(() => {
    const inputBox = document.querySelector('.input_box');
    if (inputBox.scrollHeight > 450) {
      inputBox.style.overflowY = 'auto';
    } else {
      inputBox.style.overflowY = 'visible';
    }
  }, [tableData]);

  const handleSemesterChange = (event) => {
    const newSemester = event.target.value;
    setCurrentSemester(newSemester);
    setTableData([['', '', '', false]]);
  };

  const chartState = {
    series: [{
      name: "Average Grades",
      data: Object.values(averageGrades)
    }],
    options: {
      chart: {
        height: 350,
        type: 'line'
      },
      xaxis: {
        categories: Object.keys(averageGrades)
      }
    }
  };

  return (
    <div className='main_body_c'>
      <div className='inputscore'>
        <div className='inputscore_box'>
          <div className='top'>
            <h2>학점 계산기</h2>
            <select className='grade' onChange={handleSemesterChange} value={currentSemester}>
              <option value="1-1">1-1</option>
              <option value="1-2">1-2</option>
              <option value="2-1">2-1</option>
              <option value="2-2">2-2</option>
              <option value="3-1">3-1</option>
              <option value="3-2">3-2</option>
              <option value="4-1">4-1</option>
              <option value="4-2">4-2</option>
            </select>
          </div>
          <div className='mid'>
            <div className='input_box'>
              <table className='cal_info'>
                <thead>
                  <tr>
                    <th>과목명</th>
                    <th>학점</th>
                    <th>성적</th>
                    <th>전공</th> 
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td>
                        <input
                          type='text'
                          value={row[0]}
                          onChange={(e) => handleInputChange(e.target.value, rowIndex, 0)}
                          style={{ width: '100px', height: '30px' }} // 원하는 크기로 설정
                        />
                      </td>
                      <td>
                        <input
                          type='number'
                          value={row[1]}
                          onChange={(e) => handleInputChange(e.target.value, rowIndex, 1)}
                          style={{ width: '100px', height: '30px' }}
                        />
                      </td>
                      <td>
                        <input
                          type='number'
                          value={row[2]}
                          onChange={(e) => handleInputChange(e.target.value, rowIndex, 2)}
                          style={{ width: '100px', height: '30px' }}
                        />
                      </td>
                      <td>
                        <input
                          type='checkbox'
                          checked={row[3]}
                          onChange={(e) => handleCheckboxChange(e.target.checked, rowIndex)}
                          style={{ transform: 'scale(0.8)' }} // 체크박스 크기 조정
                        />
                      </td>
                      <td>
                        <button className='deleteBtn' onClick={() => handleDeleteRow(rowIndex)}>x</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className='plusBtn' onClick={handleAddRow}>항목 추가</button>
            </div>
          </div>
          <div className='bottom'>
            <input
              type='text'
              value={averageGrades[currentSemester].toFixed(2)}
              disabled
            />
          </div>
        </div>
      </div>
      <div className='outscore'>
        <div className='outscore_box'>
          <div>
            <div id="chart">
              <ReactApexChart options={chartState.options} series={chartState.series} type="line" height={350} />
            </div>
            <div className="average_box">
              <div className='grade_box'>
                총 수강한 학기: {Object.keys(grades).length}, 평균 학점 :
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculate;
