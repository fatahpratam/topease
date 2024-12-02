import './Register.css';
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStorage } from "../../hooks/index.js";

export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { setLoginInfo, isLoginInfoExist } = useStorage();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    setLoginInfo(
      nameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    )
    navigate('/dashboard/home')
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
        <p className="register__p">Isilah data berikut untuk membuat akun TopEase baru.</p>
        <form onSubmit={handleSubmit} className='register__form'>
          <p>
            <label htmlFor="name" className="register__label">Nama*</label>
            <input
              type="text"
              className="register__input-text"
              id="name"
              placeholder='Nama'
              ref={nameRef}
              autoFocus
              required
            />
          </p>
          <p>
            <label htmlFor="email" className="register__label">Email*</label>
            <input
              type="email"
              className="register__input-text"
              id="email"
              placeholder='Email'
              ref={emailRef}
              required
            />
          </p>
          <p>
            <label htmlFor="password" className="register__label">Kata sandi*</label>
            <input
              type="password"
              className="register__input-text"
              id="password"
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
          <button className="register__button" type="submit">Daftar</button>
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