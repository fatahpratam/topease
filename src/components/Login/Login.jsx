import './Login.css';
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useStorage } from "../../contexts/StorageProvider.jsx";

export default function Login() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const { remember, toggleRemember } = useStorage();

  console.log(remember);

  const handleSubmit = event => {
    event.preventDefault();
  };

  const handleRemember = () => { };
  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__h1">Masuk</h1>
        <p className="login__p">Selamat datang di TopEase!</p>
        <form onSubmit={handleSubmit} className='login__form'>
          <p>
            <label htmlFor="email" className="login__label">Email*</label>
            <input
              type="email"
              className="login__input-text"
              id="email"
              placeholder='Email'
              required
              autoFocus
              ref={emailInputRef}
            />
          </p>
          <p>
            <label htmlFor="password" className="login__label">Kata sandi*</label>
            <input
              type="password"
              className="login__input-text"
              id="password"
              placeholder='Kata sandi'
              required
              ref={passwordInputRef}
            />
          </p>
          <div className="login__div">
            <p>
              <input
                type="checkbox"
                id="remember"
                className="login__input-checkbox"
                checked={remember}
                onChange={() => {
                  console.log(remember);
                  toggleRemember();
                }}
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