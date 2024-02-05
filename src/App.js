import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [startTime, setStartTime] = useState("");

  useEffect(() => {
    let sampleTimestamp = Date.now(); //현재시간 타임스탬프 13자리 예)1599891939914
    let date = new Date(sampleTimestamp); //타임스탬프를 인자로 받아 Date 객체 생성 
    console.log(date);
    var year = date.getFullYear().toString().slice(-4); //년도 뒤에 4자리
    var month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
    var day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
    var hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
    var minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
    var second = ("0" + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)
    setStartTime(year);
  
  }, [])
  
  return (
    <div className="timer">
      <div>Hello timer</div>
      <div className="startTime">{startTime}</div>
    </div>
    
  );
}

export default App;
