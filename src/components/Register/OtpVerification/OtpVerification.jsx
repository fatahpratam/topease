import './OtpVerification.css';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { smartphoneIcon } from "../../../assets/icons/index.js";
import { ErrorBlockQuote } from "../../Error/index.js";
import { useErrorBlockQuote } from "../../../hooks/useErrorBlockQuote.js";
import { generateOtp } from "../../../utils/generateOtp.js";

export default function OtpVerification() {
  const { errorMessage, triggerError } = useErrorBlockQuote();
  const [otpCode] = useState(generateOtp());
  const location = useLocation();
  const navigate = useNavigate();

  console.log(otpCode);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const { otp } = Object.fromEntries(data);
    if (otp === otpCode) {
      console.log('Success');
      // navigate('success', { state: location.state || {} });
    }
    else {
      triggerError('Kode verifikasi yang Anda masukkan salah.', 3000);
    }
  };

  return (
    <div className="otp">
      <div className="otp__container">
        <img src={smartphoneIcon} alt="Smartphone Icon" className="otp__icon" />
        <h2 className="otp__h2">Kode Verifikasi</h2>
        <p className="otp__p">Kami sudah mengirimkan kode verifikasi ke nomor yang Anda masukkan.</p>
        <ErrorBlockQuote message={errorMessage} />
        <form className="otp__form" onSubmit={handleOnSubmit}>
          <input
            id='otp'
            name='otp'
            type="text"
            className="otp__input"
            pattern='^\w{6}$'
            placeholder='Kode verifikasi'
            required
          />
          <button className="otp__button">Cek</button>
        </form>
      </div>
    </div>
  )
}