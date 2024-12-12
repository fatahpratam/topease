import { useState } from "react";

export function useErrorBlockQuote() {
  const [errorMessage, setErrorMessage] = useState('');
  const [timeoutId, setTimeoutId] = useState();

  const triggerError = (message, timeout = 3000) => {
    setErrorMessage(message);
    timeoutId && clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => {
      setErrorMessage('');
    }, timeout);
    setTimeoutId(newTimeoutId);
  };

  return { errorMessage, triggerError };
}