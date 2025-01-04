import './ErrorBlockQuote.css';
import { infoErrorVariant } from "../../../../assets/icons/index.js";

export default function ErrorBlockQuote({ message }) {
  if (!message)
    return null;
  return (
    <blockquote className="error-blockquote">
      <img
        src={infoErrorVariant}
        alt="Ikon info"
        className='error-blockquote__img'
      />
      {message}
    </blockquote>
  )
}