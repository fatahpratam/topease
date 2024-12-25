import { useState, useEffect } from "react";
import dayjs from "dayjs";

export function useCountdown(dateFormat) {
  const [countdown, setCountdown] = useState(
    getCountdown(dateFormat)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(getCountdown(dateFormat));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [dateFormat]);

  return countdown;
}

function getCountdown(dateFormat) {
  const now = dayjs();
  const secondDifference = Math.max(dayjs(dateFormat).diff(now, 's'), 0);
  const hours = Math.floor(secondDifference / 3600);
  const minutes = Math.floor((secondDifference % 3600) / 60);
  const seconds = secondDifference % 60;

  return `${hours}j ${minutes}m ${seconds}s`;
}