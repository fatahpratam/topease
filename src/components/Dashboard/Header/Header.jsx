import './Header.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchIcon, notificationIcon, accountCircleIcon, shoppingCartVariantIcon } from "../../../assets/icons/index.js";
import { AccountPopup, NotificationPopup, SearchPopup } from "./Popup/index.js";
import { useUserStorage } from "../../../contexts/index.js";

export default function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { isLoggedIn, loginInfo, logout } = useUserStorage();

  const clearPopup = ({ target }) => {
    const whiteList = !target?.closest('.header__button')
      && !target?.closest('.search')
      && !target?.closest('.account')
      && !target?.closest('.notification');
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

  const handleSearchPopup = () => {
    const showList = [...document.querySelectorAll('.show:not(.search)')];
    showList?.forEach(element => element.classList.remove('show'));
    const element = document.querySelector('.search');
    element.classList.toggle('show');
    document.querySelector('.search__input').focus();
  };

  const handleSearchInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="header">
      <h1 className="header__h1">
        <Link to='./home' className='header__link'>TopEase</Link>
      </h1>
      <div className="header__container">
        <form className="header__form" onSubmit={event => event.preventDefault()}>
          <SearchPopup query={query} onInputChange={handleSearchInputChange} />
          <button className="header__button" onClick={handleSearchPopup}>
            <img
              src={searchIcon}
              alt="Search icon"
              className='header__button-icon'
            />
            <p className='header__button-text'>Cari</p>
          </button>
        </form>
        <button
          className="header__button"
        >
          <img
            src={shoppingCartVariantIcon}
            alt="Shopping cart icon"
            className='header__button-icon'
          />
          <p className='header__button-text'>Keranjang</p>
        </button>
        <button
          className="header__button"
          onClick={handleNotificationPopup}
        >
          <img
            src={notificationIcon}
            alt="Notification icon"
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