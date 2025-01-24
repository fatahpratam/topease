import './AccountPopup.css';
import { Link } from "react-router-dom";

export default function AccountPopup({ username, imgUrl, onLogoutClicked }) {
  return (
    <div className="account">
      <div className="account__container">
        <h2 className="account__h2">
          <img src={imgUrl} alt="Profile picture" className="account__img" />
          {username}
        </h2>
        <Link className='account__link' to='/dashboard/history'>Riwayat</Link>
        <Link className='account__link' to='#'>Pengaturan</Link>
        <button
          className="account__button"
          onClick={onLogoutClicked}
        >Keluar</button>
      </div>
    </div>
  )
}