import './Login.css';
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStorage } from "../../contexts/index.js";
import { ErrorBlockQuote } from "../Error/index.js";
import { useErrorBlockQuote } from "../../hooks/index.js";

export default function Login() {
  const formRef = useRef();
  const navigate = useNavigate();
  const { remember, toggleRemember, login } = useStorage();

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(formRef.current);
    const { email, password } = Object.fromEntries(data);
    if (login(email, password)) {
      navigate(-1);
    } else {
      triggerError('Email atau kata sandi Anda salah.');
    }
  };

  const { errorMessage, triggerError } = useErrorBlockQuote();

  return (
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
            <label htmlFor="email" className="login__label">Email*</label>
            <input
              type="email"
              className="login__input-text"
              id="email"
              name='email'
              placeholder='Email'
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
            <Link to='#' className="login__link">Lupa password?</Link>
          </div>
          <button className="login__button" type="submit">Masuk</button>
          <hr />
          <p className="login__p">
            Belum punya akun?&nbsp;
            <Link to='/register' className="login__link">Register</Link>!
          </p>
        </form>
      </div>
    </div>
  )
}