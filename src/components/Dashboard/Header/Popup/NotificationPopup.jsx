import './NotificationPopup.css';

export default function NotificationPopup(notifications) {
  return (
    <div className="notification">
      <div className="notification__container">
        <h2 className="notification__h2">Notifikasi</h2>
        <p>Tidak ada notifikasi baru.</p>
      </div>
    </div>
  )
}