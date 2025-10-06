import { useState, useEffect } from "react";
import "./VancouverClock.scss";

export default function VancouverClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const options = {
      timeZone: "America/Vancouver",
      weekday: "short",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const parts = formatter.formatToParts(date);

    const weekday = parts
      .find((p) => p.type === "weekday")
      ?.value.toUpperCase();
    const hour = parts.find((p) => p.type === "hour")?.value;
    const minute = parts.find((p) => p.type === "minute")?.value;
    const second = parts.find((p) => p.type === "second")?.value;
    const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value;

    return { weekday, hour, minute, second, dayPeriod };
  };

  const { weekday, hour, minute, second, dayPeriod } = formatTime(time);

  return (
    <div className="vancouver-clock">
      <div className="clock-container">
        <div className="vancouver-place-container">
          <span className="icon">
            <svg viewBox="0 0 90 123.75">
              <path d="M45 0C20.15 0 0 25.77 0 50.62s45 73.12 45 73.12 45-48.27 45-73.12S69.85 0 45 0m.56 68.26c-10.36 0-18.76-8.4-18.76-18.76s8.4-18.76 18.76-18.76 18.76 8.4 18.76 18.76-8.4 18.76-18.76 18.76" />
            </svg>
          </span>
          <div className="vancouver-place">
            <span className="location">Vancouver, </span>
            <span className="location"> BC</span>
          </div>
        </div>

        <span className="divider">{"|"}</span>

        <div className="vancouver-clock-container">
          <span className="time">{weekday}</span>
          <span className="time">
            {hour}:{minute}:{second} {dayPeriod}
          </span>
        </div>
      </div>
    </div>
  );
}
