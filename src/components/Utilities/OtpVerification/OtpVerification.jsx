import './OtpVerification.css';
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { pinIcon } from "../../../assets/icons/index.js";
import { ErrorBlockQuote, ProtectedRoute } from "../index.js";
import { useErrorBlockQuote } from "../../../hooks/index.js";
import { generateOtp } from "../../../utils/index.js";
import { useUserStorage } from "../../../contexts/index.js";

export default function OtpVerification() {
  const
    { errorMessage, triggerError } = useErrorBlockQuote(),
    [otp] = useState(generateOtp()),
    [input, setInput] = useState(otp),
    { purpose } = useParams(),
    location = useLocation(),
    navigate = useNavigate(),
    { register, changePhoneNumber, deleteAccount } = useUserStorage();

  const handleOnChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === otp) {
      if (purpose === 'register') {
        const { name, phoneNumber, password } = location.state
        register(name, phoneNumber, password);
        if (history.length > 4)
          navigate(-3);
        else
          navigate('/topease/dashboard/home');
      }
      else if (purpose === 'forgot-password') {
        const { phoneNumber } = location.state;
        navigate('../change-password', { state: { phoneNumber, purpose } });
      }
      else if (purpose === 'change-number') {
        const { userId, newPhoneNumber } = location.state;
        changePhoneNumber(userId, newPhoneNumber);
        navigate('/topease/dashboard/setting');
      }
      else if (purpose === 'delete-account') {
        const { userId } = location.state;
        deleteAccount(userId);
        navigate('/topease/dashboard/home');
      }
    }
    else {
      triggerError('Kode verifikasi yang Anda masukkan salah.', 3000);
    }
  };

  return (
    <ProtectedRoute to={'/topease/dashboard/home'} condition={location.state === null}>
      <div className="otp">
        <div className="otp__container">
          <img src={pinIcon} alt="Ikon OTP" className="otp__icon" />
          <h2 className="otp__h2">Kode Verifikasi</h2>
          <p className="otp__p">Kami sudah mengirimkan kode verifikasi ke nomor yang Anda masukkan.</p>
          <ErrorBlockQuote message={errorMessage} />
          <form className="otp__form" onSubmit={handleSubmit}>
            <input
              name='otp'
              type="text"
              className="otp__input"
              pattern='^\w{6}$'
              placeholder='Kode verifikasi'
              value={input}
              onChange={handleOnChange}
              required
            />
            <button className="otp__button">Cek</button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  )
}