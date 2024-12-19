import './NotificationPopup.css';

export default function NotificationPopup({ isLoggedIn }) {
  return (
    <div className="notification">
      <div className="notification__container">
        <h2 className="notification__h2">Notifikasi</h2>
        {
          isLoggedIn
            ? <p>Tidak ada notifikasi baru.</p>
            : <p>Anda harus Masuk untuk melihat notifikasi.</p>
        }
      </div>
    </div>
  )
}