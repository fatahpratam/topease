import './ForgetPassword.css';
import { useNavigate } from "react-router-dom";
import { smartphoneVariantIcon } from "../../assets/icons/index.js";
import { ErrorBlockQuote } from "../Utilities/index.js";
import { useErrorBlockQuote } from "../../hooks/index.js";
import { useStorage } from "../../contexts/index.js";

export default function ForgetPassword() {
  const { errorMessage, triggerError } = useErrorBlockQuote(),
    { isNumberExist } = useStorage(),
    navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const { phoneNumber } = Object.fromEntries(data);
    if (isNumberExist(phoneNumber)) {
      navigate('/otp/forgot-password', { state: { phoneNumber } });
    }
    else {
      triggerError('Nomor yang Anda masukkan tidak terdaftar di dalam sistem.', 3000);
    }
  };
  return (
    <div className="forget">
      <div className="forget__container">
        <img src={smartphoneVariantIcon} alt="Smartphone Icon" className="forget__icon" />
        <h2 className="forget__h2">Lupa Kata Sandi</h2>
        <p className="forget__p">Masukkan nomor WhatsApp yang terkait dengan akun Anda.</p>
        <ErrorBlockQuote message={errorMessage} />
        <form className="forget__form" onSubmit={handleSubmit}>
          <input
            name='phoneNumber'
            type="text"
            className="forget__input"
            pattern='^(\+62|62|0)8[1-9][0-9]{6,11}$'
            placeholder='Nomor WhatsApp'
            required
          />
          <button className="forget__button">Cek</button>
        </form>
      </div>
    </div>
  )
}