import { useEffect, useState } from "react";
import "./TimeInVancouver.scss";

function TimeInVancouver() {
  const [timeElapsed, setTimeElapsed] = useState("");

  useEffect(() => {
    // 밴쿠버 도착 날짜 (실제 날짜로 수정하세요)
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
          <span className="number">{days}</span>
          <span className="unit">days</span>
          <span className="separator"> : </span>
          <span className="number">{hours}</span>
          {/* <span className="unit">h</span> */}
          <span className="separator"> : </span>
          <span className="number">{minutes}</span>
          {/* <span className="unit">m</span> */}
          <span className="separator"> : </span>
          <span className="number">{seconds}</span>
          {/* <span className="unit">s</span> */}
        </>
      );
    };

    updateTime(); // 초기 실행
    const timer = setInterval(updateTime, 1000); // 1초마다 업데이트

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="time-in-vancouver">
      <p className="counter-text">{timeElapsed}</p>
    </div>
  );
}

export default TimeInVancouver;
