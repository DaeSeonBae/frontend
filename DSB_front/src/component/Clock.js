import React, { useState, useEffect } from 'react';
import '../component_style/clock.css';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 컴포넌트가 언마운트될 때 인터벌 정리
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="clock">
      <h2>{time.toLocaleTimeString()}</h2>
    </div>
  );
}

export default Clock;
