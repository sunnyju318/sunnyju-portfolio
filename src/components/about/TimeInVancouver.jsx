import "./TimeInVancouver.scss";
import { useEffect, useState } from "react";

function TimeInVancouver() {
  const [timeElapsed, setTimeElapsed] = useState("");

  useEffect(() => {
    // 밴쿠버 도착 날짜
    const startDate = new Date("2024-08-27T11:00:00-07:00"); // PDT 타임존

    const updateTime = () => {
      const now = new Date();
      const diff = now - startDate;

      const pad = (num) => String(num).padStart(2, "0");

      const days = pad(Math.floor(diff / (1000 * 60 * 60 * 24)));
      const hours = pad(Math.floor((diff / (1000 * 60 * 60)) % 24));
      const minutes = pad(Math.floor((diff / (1000 * 60)) % 60));
      const seconds = pad(Math.floor((diff / 1000) % 60));

      setTimeElapsed(
        <>
          <span className="time-vancouver__number">{days}</span>
          <span className="time-vancouver__unit">days</span>
          <span className="time-vancouver__separator"> {"|"} </span>
          <span className="time-vancouver__number">{hours}</span>
          <span className="time-vancouver__separator"> : </span>
          <span className="time-vancouver__number">{minutes}</span>
          <span className="time-vancouver__separator"> : </span>
          <span className="time-vancouver__number">{seconds}</span>
        </>
      );
    };

    updateTime(); // 초기 실행
    const timer = setInterval(updateTime, 1000); // 1초마다 업데이트

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="time-vancouver">
      <p className="time-vancouver__text">{timeElapsed}</p>
    </div>
  );
}

export default TimeInVancouver;
