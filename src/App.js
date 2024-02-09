import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [startTime, setStartTime] = useState({hour: "00", minute: "00"});
  const [endTime, setEndTime] = useState({hour: "00", minute: "00"});
  const [subtractTime, setSubtractTime] = useState({hour: "00", minute: "00"});
  const [allTime, setAllTime] = useState({hour: 0, minute: 0});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    calculateSubtractTime();
    // eslint-disable-next-line
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
    let sum_startTime = parseInt(startTime.hour) * 60 + parseInt(startTime.minute);
    let sum_endTime = parseInt(endTime.hour) * 60 + parseInt(endTime.minute);
    let sum_subTime = sum_endTime - sum_startTime;
  
    if (endTime.year - startTime.year > 0 || endTime.month - startTime.month > 0 || endTime.day - startTime.day > 0) {
      sum_subTime += 24 * 60;
      setSubtractTime({ hour: Math.floor(sum_subTime / 60), minute: sum_subTime % 60 });
    } else {
      setSubtractTime({ hour: Math.floor(sum_subTime / 60), minute: sum_subTime % 60 });
    }
  }

  const resetBtnClickListener = () =>{
    setStartTime({hour: "00", minute: "00"});
    setEndTime({hour: "00", minute: "00"});
    setSubtractTime({hour: "00", minute: "00"});
  }

  const addBtnClickListener = () =>{
    let sumAllTime = allTime.hour*24 + allTime.minute + parseInt(subtractTime.hour*24) + parseInt(subtractTime.minute);
    setAllTime({hour: Math.floor(sumAllTime / 60), minute: sumAllTime % 60});
    resetBtnClickListener();
  }

  const resetAllTimeBtnClickListener = () =>{
    setAllTime({hour:0,minute:0});
  }
  
  return (
    <div className="timer">
      <div className="timer__title">Timer</div>
      <div className="timer__nowTime">
        <div className="buttons">
          <button type="button" className="btn__start" onClick={startBtnClickListener}>Start</button>
          <button type="button" className="btn__stop" onClick={stopBtnClickListener}>Stop</button>
          <button type="button" className="btn__reset" onClick={resetBtnClickListener}>Reset</button>
          <button type="button" className="btn__add" onClick={addBtnClickListener}>Add</button>
        </div>
        <div className="time_info">
          <div className="startTime">시작 시각 : {startTime.hour}시 {startTime.minute}분</div>
          <div className="endTime">종료 시각 : {endTime.hour}시 {endTime.minute}분</div>
          <div className="subtractTime">차이 시간 : {subtractTime.hour}시간 {subtractTime.minute}분</div>
        </div>
      </div>
      <div className="timer__allTime">
        총
        <span>{allTime.hour}</span>시간
        <span>{allTime.minute}</span>분
        <div className="allTime__btns">
          <button type="button" className="btn__setting" onClick={openModal}>Setting</button>
          <button 
            type="button" 
            className="btn__reset_allTime"
            onClick={resetAllTimeBtnClickListener}>Reset</button>
        </div>
        {isModalOpen && (
        <div className="modal">
          <div className="modal__content">
            <span>모달 내용 및 입력 폼</span>
            <button type="button" >
              설정 적용
            </button>
            <button type="button" onClick={closeModal}>
              닫기
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
    
  );
}

export default App;
