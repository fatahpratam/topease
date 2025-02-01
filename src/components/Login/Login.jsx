import './Login.css';
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStorage } from "../../contexts/index.js";
import { ErrorBlockQuote, ProtectedRoute } from "../Utilities/index.js";
import { useErrorBlockQuote } from "../../hooks/index.js";

export default function Login() {
  const formRef = useRef();
  const navigate = useNavigate();
  const { remember, toggleRemember, login, isLoggedIn } = useUserStorage();

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    const { phoneNumber, password } = Object.fromEntries(data);
    if (login(phoneNumber, password))
      navigate('/topease/dashboard/home');
    else
      triggerError('Nomor WhatsApp atau kata sandi Anda salah.');
  };

  const { errorMessage, triggerError } = useErrorBlockQuote();

  return (
    <ProtectedRoute to={'/topease/dashboard/home'} condition={isLoggedIn()}>
      <div className="login">
        <div className="login__container">
          <h1 className="login__h1">Masuk</h1>
          <p className="login__p">
            Selamat datang di <Link className='login__link' to='../dashboard/home'>TopEase</Link>!
          </p>
          <form
            onSubmit={handleSubmit}
            className='login__form'
            ref={formRef}
          >
            <ErrorBlockQuote message={errorMessage} />
            <p>
              <label htmlFor="phoneNumber" className="login__label">Nomor WhatsApp*</label>
              <input
                type="tel"
                className="login__input-text"
                id="phoneNumber"
                name='phoneNumber'
                placeholder='Nomor WhatsApp'
                pattern='^(\+62|62|0)8[1-9][0-9]{6,11}$'
                required
                autoFocus
              />
            </p>
            <p>
              <label htmlFor="password" className="login__label">Kata sandi*</label>
              <input
                type="password"
                className="login__input-text"
                id="password"
                name='password'
                placeholder='Kata sandi'
                required
              />
            </p>
            <div className="login__div">
              <p>
                <input
                  type="checkbox"
                  id="remember"
                  className="login__input-checkbox"
                  checked={remember}
                  onChange={toggleRemember}
                />
                <label htmlFor="remember" className="login__label">Remember me</label>
              </p>
              <Link to='/topease/forget-password' className="login__link">Lupa kata sandi?</Link>
            </div>
            <button className="login__button" type="submit">Masuk</button>
            <hr />
            <p className="login__p">
              Belum punya akun?&nbsp;
              <Link to='/topease/register' className="login__link">Register</Link>!
            </p>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  )
}