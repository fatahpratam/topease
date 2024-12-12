import './ErrorPopup.css';
import { useRef } from "react";

export default function ErrorPopup({
  message = 'This is an error.',
  title = 'Error',
}) {
  const containerRef = useRef();
  setTimeout(() => {
    containerRef.current.remove();
  }, 3000);

  return (
    <div className="error-popup" ref={containerRef}>
      <h2 className="error-popup__h2">{title}</h2>
      <p className="error-popup__p">{message}</p>
    </div>
  )
}