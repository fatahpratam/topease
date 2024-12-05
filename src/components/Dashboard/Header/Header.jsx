import './Header.css';
import { Link, useNavigate } from "react-router-dom";
import { searchIcon, notificationIcon, accountCircleIcon } from "../../../assets/icons/index.js";
import { AccountPopup, NotificationPopup } from "./Popup/index.js";
import { useStorage } from "../../../contexts/index.js";

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, loginInfo, logout } = useStorage();

  const clearPopup = ({ target }) => {
    const whiteList = !target?.closest('.header__button')
      && !target?.closest('.account')
      && !target?.closest('.notification')
    if (whiteList) {
      const showList = [...document.querySelectorAll('.show')];
      showList?.forEach(element => element.classList.remove('show'));
    }
  };
  document.removeEventListener('click', clearPopup);
  document.addEventListener('click', clearPopup);

  const handleNotificationPopup = () => {
    const showList = [...document.querySelectorAll('.show:not(.notification)')];
    showList?.forEach(element => element.classList.remove('show'));
    const element = document.querySelector('.notification');
    element.classList.toggle('show');
  }

  const handleAccountPopup = () => {
    if (isLoggedIn()) {
      const showList = [...document.querySelectorAll('.show:not(.account)')];
      showList?.forEach(element => element.classList.remove('show'));
      const element = document.querySelector('.account');
      element.classList.toggle('show');
    } else {
      navigate('../login');
    }
  };

  return (
    <div className="header">
      <h1 className="header__h1">
        <Link to='./home' className='header__link'>TopEase</Link>
      </h1>
      <div className="header__container">
        <form className="header__form" onSubmit={event => event.preventDefault()}>
          <input
            type="text"
            placeholder='Cari di sini!'
            className='header__input-text'
          />
          <button className="header__button">
            <img
              src={searchIcon}
              alt="Search icon"
              className='header__button-icon'
            />
          </button>
        </form>
        <button
          className="header__button"
          onClick={handleNotificationPopup}
        >
          <img
            src={notificationIcon}
            alt="Account circle"
            className='header__button-icon'
          />
          <p className='header__button-text'>Notifikasi</p>
        </button>
        <NotificationPopup isLoggedIn={isLoggedIn()} />
        <button
          className="header__button"
          onClick={handleAccountPopup}
        >
          <img
            src={accountCircleIcon}
            alt="Account circle"
            className='header__button-icon'
          />
          <p className='header__button-text'>
            {isLoggedIn() ? 'Akun' : 'Masuk'}
          </p>
        </button>
        <AccountPopup
          username={loginInfo.name}
          imgUrl={accountCircleIcon}
          onLogoutClicked={() => {
            clearPopup({});
            logout();
          }}
        />
      </div>
    </div>
  )
}