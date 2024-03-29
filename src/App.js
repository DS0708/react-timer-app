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
  const applyTime = () => {
    let set_hour = parseInt(document.getElementById('set_hour').value);
    let set_minute = parseInt(document.getElementById('set_minute').value);

    // hour, minute NaN값 입력 시 예외처리
    set_hour = isNaN(set_hour) ? allTime.hour : set_hour;
    set_minute = isNaN(set_minute) ? allTime.minute : set_minute;
    
    // minute 60이상 입력 예외처리
    if (set_minute >= 60){
      set_hour += Math.floor(set_minute/60);
      set_minute = set_minute % 60;
    }
    setAllTime({hour: set_hour, minute: set_minute});
    closeModal();
  }

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
    let sumAllTime = allTime.hour*60 + allTime.minute + parseInt(subtractTime.hour)*60 + parseInt(subtractTime.minute);
    let change_hour = Math.floor(sumAllTime / 60);
    let change_minute = sumAllTime % 60;
    setAllTime({hour: change_hour, minute: change_minute});
    resetBtnClickListener();
  }

  const resetAllTimeBtnClickListener = () =>{
    setAllTime({hour:0,minute:0});
  }
  
  return (
    <div className="timer">
      <div className="timer__title">DS's Timer</div>
      <div className="timer__nowTime">
        <div className="buttons">
          <button type="button" className="btn__start" onClick={startBtnClickListener}>Start</button>
          <button type="button" className="btn__stop" onClick={stopBtnClickListener}>Stop</button>
          <button type="button" className="btn__reset" onClick={resetBtnClickListener}>Reset</button>
          <button type="button" className="btn__add" onClick={addBtnClickListener}>Add</button>
        </div>
        <div className="time_info">
          <div className="startTime">
            Start Time : 
            <span>{startTime.hour}</span>h 
            <span>{startTime.minute}</span>m
          </div>
          <div className="endTime">
            End Time : 
            <span>{endTime.hour}</span>h <span>{endTime.minute}</span>m
          </div>
          <div className="subtractTime">
            Difference Time : 
            <span>{subtractTime.hour}</span>h <span>{subtractTime.minute}</span>m
            </div>
        </div>
      </div>
      <div className="timer__allTime">
        {!isModalOpen && (
          <div className="modal_close">
            ALL
          <span>{allTime.hour}</span>h
          <span>{allTime.minute}</span>m
          <div className="allTime__btns">
            <button type="button" className="btn__setting" onClick={openModal}>Setting</button>
            <button 
              type="button" 
              className="btn__reset_allTime"
              onClick={resetAllTimeBtnClickListener}>Reset</button>
          </div>
          </div>
        )}
        {isModalOpen && (
          <div className="modal_open">
            <div className="modal__content">
              <span>Time Setting</span>
              <form>
                <label htmlFor="hour">Hour:</label>
                <input type="text" id="set_hour" maxLength="2" placeholder={allTime.hour}/>

                <label htmlFor="minute">Minute:</label>
                <input type="text" id="set_minute" maxLength="2" placeholder={allTime.minute}/>
                
                <div className="buttons">
                  <button type="button" onClick={applyTime}>
                    Set
                  </button>
                  <button type="button" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
    
  );
}

export default App;
