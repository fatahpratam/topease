import './ChangePassword.css';
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { passwordIcon } from "../../assets/icons/index.js";
import { ErrorBlockQuote, ProtectedRoute } from "../Utilities/index.js";
import { useErrorBlockQuote } from "../../hooks/index.js";
import { useUserStorage } from "../../contexts/index.js";

export default function ChangePassword() {
  const { errorMessage, triggerError } = useErrorBlockQuote(),
    { changePassword, isLoggedIn, logout } = useUserStorage(),
    location = useLocation(),
    navigate = useNavigate(),
    passwordRef = useRef(),
    confirmPasswordRef = useRef()

  const handlePasswordValidity = e => {
    const passwordValue = passwordRef.current.value;
    const confirmPasswordValue = confirmPasswordRef.current.value;
    passwordRef.current.setCustomValidity('');
    confirmPasswordRef.current.setCustomValidity('');
    if (passwordValue !== confirmPasswordValue && confirmPasswordValue !== '') {
      e.target.setCustomValidity('Kata sandi dan konfirmasi kata sandi belum sama.');
      e.target.reportValidity();
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const { phoneNumber } = location.state,
      newPassword = passwordRef.current.value;
    if (changePassword(phoneNumber, newPassword)) {
      isLoggedIn() && logout();
      navigate('/login');
    }
    else {
      triggerError('Anda tidak boleh menggunakan password lama.', 3000);
    }
  };

  const isStateNotExist = () => {
    return location.state === null;
  }

  return (
    <ProtectedRoute to={'/dashboard/home'} condition={isLoggedIn() || isStateNotExist()}>
      <div className="password">
        <div className="password__container">
          <img src={passwordIcon} alt="Ikon password" className="password__icon" />
          <h2 className="password__h2">Ganti Kata Sandi</h2>
          <p className="password__p">Masukkan password baru untuk akun Anda.</p>
          <ErrorBlockQuote message={errorMessage} />
          <form className="password__form" onSubmit={handleSubmit}>
            <p>
              <label htmlFor="password" className="password__label">Kata sandi baru*</label>
              <input
                id='password'
                name='password'
                type="password"
                className="password__input"
                placeholder='Kata sandi'
                onChange={handlePasswordValidity}
                ref={passwordRef}
                required
              />
            </p>
            <p>
              <label htmlFor="confirm-password" className="password__label">Konfirmasi kata sandi baru*</label>
              <input
                id='confirm-password'
                name='confirmPassword'
                type="password"
                className="password__input"
                placeholder='Konfirmasi kata sandi'
                onChange={handlePasswordValidity}
                ref={confirmPasswordRef}
                required
              />
            </p>
            <button className="password__button">Ganti kata sandi</button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  )
}