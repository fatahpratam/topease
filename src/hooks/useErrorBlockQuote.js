import { useState } from "react";

export function useErrorBlockQuote() {
  const [errorMessage, setErrorMessage] = useState('');

  const triggerError = (message, timeout = 5000) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, timeout);
  };

  return { errorMessage, triggerError };
}