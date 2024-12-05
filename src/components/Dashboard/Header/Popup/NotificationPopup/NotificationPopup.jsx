import './NotificationPopup.css';

export default function NotificationPopup({ isLoggedIn }) {
  const getNotifications = () => {
    if (isLoggedIn) {
      return <p>Tidak ada notifikasi baru.</p>;
    }
    else {
      return <p>Anda harus Masuk untuk melihat notifikasi.</p>
    }
  };
  return (
    <div className="notification">
      <div className="notification__container">
        <h2 className="notification__h2">Notifikasi</h2>
        {getNotifications()}
      </div>
    </div>
  )
}