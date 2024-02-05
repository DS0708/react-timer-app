import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [startTime, setStartTime] = useState({hour: "00", minute: "00"});
  const [endTime, setEndTime] = useState({hour: "00", minute: "00"});
  const [subtractTime, setSubtractTime] = useState({hour: "00", minute: "00"});

  useEffect(() => {
    calculateSubtractTime();
  }, [endTime])
  

  const getNowDate = () =>{
    let sampleTimestamp = Date.now(); //현재시간 타임스탬프 13자리 예)1599891939914
    let date = new Date(sampleTimestamp); //타임스탬프를 인자로 받아 Date 객체 생성 
    var year = date.getFullYear().toString().slice(-4); //년도 뒤에 4자리
    var month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
    var day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
    var hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
    var minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
    var second = ("0" + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)
    return {year:year, month:month, day:day, hour:hour, minute:minute, second:second};
  }

  const startBtnClickListener = () => {
    setStartTime(getNowDate());
  }

  const stopBtnClickListener = () => {
    setEndTime(getNowDate());
  }

  const calculateSubtractTime = () => {
    if (endTime.year - startTime.year > 0 || endTime.month - startTime.month > 0 || endTime.day - startTime.day > 0){
      setSubtractTime({hour: endTime.hour-startTime.hour+24, minute: endTime.minute-startTime.minute});
    }else {
      setSubtractTime({hour: endTime.hour-startTime.hour, minute: endTime.minute-startTime.minute});
    }
  }

  const resetBtnClickListener = () =>{
    setStartTime({hour: "00", minute: "00"});
    setEndTime({hour: "00", minute: "00"});
    setSubtractTime({hour: "00", minute: "00"});
  }
  
  return (
    <div className="timer">
      <div className="timer__nowTime">
        <div className="buttons">
          <button type="button" className="btn__start" onClick={startBtnClickListener}>Start</button>
          <button type="button" className="btn__stop" onClick={stopBtnClickListener}>Stop</button>
          <button type="button" className="btn__reset" onClick={resetBtnClickListener}>Reset</button>
          <button type="button" className="btn__add">Add</button>
        </div>
        <div className="time_info">
          <div className="startTime">시작 시각 : {startTime.hour}시 {startTime.minute}분</div>
          <div className="endTime">종료 시각 : {endTime.hour}시 {endTime.minute}분</div>
          <div className="subtractTime">차이 시간 : {subtractTime.hour}시간 {subtractTime.minute}분</div>
        </div>
      </div>
      <div className="timer__allTime">timer__allTime</div>
    </div>
    
  );
}

export default App;
