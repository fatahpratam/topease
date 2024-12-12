import './Register.css';
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStorage } from "../../contexts/index.js";
import { ErrorBlockQuote } from "../Utilities/index.js";
import { useErrorBlockQuote } from "../../hooks/index.js";

export default function Register() {
  const formRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  const { isAccountExist } = useStorage();
  const { errorMessage, triggerError } = useErrorBlockQuote();

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    const { name, phoneNumber, password } = Object.fromEntries(data);
    if (isAccountExist(name, phoneNumber)) {
      triggerError('Nama atau Nomor WhatsApp sudah terpakai.');
    } else {
      navigate('/otp/register', { state: { name, phoneNumber, password } });
    }
  };

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

  return (
    <div className="register">
      <div className="register__container">
        <h1 className="register__h1">Daftar</h1>
        <p className="register__p">Isilah data berikut untuk membuat akun<Link className='register__link' to='../dashboard/home'>TopEase</Link>baru.</p>
        <form
          onSubmit={handleSubmit}
          className='register__form'
          ref={formRef}
        >
          <ErrorBlockQuote message={errorMessage} />
          <p>
            <label htmlFor="name" className="register__label">Nama*</label>
            <input
              type="text"
              className="register__input-text"
              id="name"
              name='name'
              placeholder='Nama'
              autoFocus
              required
            />
          </p>
          <p>
            <label htmlFor="phoneNumber" className="register__label">Nomor WhatsApp*</label>
            <input
              type="tel"
              className="register__input-text"
              id="phoneNumber"
              name='phoneNumber'
              placeholder='Nomor WhatsApp'
              pattern='^(\+62|62|0)8[1-9][0-9]{6,11}$'
              required
            />
          </p>
          <p>
            <label htmlFor="password" className="register__label">Kata sandi*</label>
            <input
              type="password"
              className="register__input-text"
              id="password"
              name='password'
              placeholder='Kata sandi'
              ref={passwordRef}
              onChange={handlePasswordValidity}
              required
            />
          </p>
          <p>
            <label htmlFor="confirm-password" className="register__label">Konfirmasi kata sandi*</label>
            <input
              type="password"
              className="register__input-text"
              id="confirm-password"
              placeholder='Konfirmasi kata sandi'
              ref={confirmPasswordRef}
              onChange={handlePasswordValidity}
              required
            />
          </p>
          <p>
            <input
              type="checkbox"
              id="tos"
              className="register__input-checkbox"
              required
            />
            <label htmlFor="tos" className="register__label">
              Saya setuju dengan
              <Link to='#' className="register__link">Kebijakan Privasi</Link>
              dan memahami bagaimana data saya akan digunakan.*
            </label>
          </p>
          <p>
            <input
              type="checkbox"
              id="sk"
              className="register__input-checkbox"
              required
            />
            <label htmlFor="sk" className="register__label">
              Saya telah membaca dan setuju dengan
              <Link to='#' className="register__link">Syarat dan Ketentuan</Link>.*
            </label>
          </p>
          <button
            className="register__button"
            type="submit"
          >Daftar</button>
          <hr />
          <p className="register__p">
            Sudah punya akun?
            <Link to='/login' className="register__link">Login!</Link>
          </p>
        </form>
      </div>
    </div>
  )
}