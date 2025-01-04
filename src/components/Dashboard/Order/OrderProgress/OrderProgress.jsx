import dayjs from 'dayjs';
import './OrderProgress.css';
import { scheduleIcon, downloadIcon } from "../../../../assets/icons/index.js";
import { useOrder } from "../../../../hooks/index.js";

export default function OrderProgress({ order }) {

  return (
    <div className="order-progress">
      <WaitingPayment order={order} />
      <ProcessedOrder />
      <FinishTransaction />
    </div>
  )
}

function WaitingPayment({ order }) {
  const
    localizedFormat = dayjs(order.expiredDate).locale('id').format('D MMMM YYYY [pukul] HH:mm'),
    { startCountdown, countdown } = useOrder();

  startCountdown(order.orderId);
  return (
    <div className="waiting-payment">
      <h2 className="order-progress__h2">Menunggu Pembayaran</h2>
      <p className="waiting-payment__p">
        {localizedFormat}
        <span className="waiting-payment__span">
          <img src={scheduleIcon} alt="Ikon waktu" className="order-progress__icon" />
          {countdown}
        </span>
      </p>
      <div className="waiting-payment__container">
        <p>Scan QR kode dengan aplikasi pembayaranmu</p>
        <img
          src="https://via.placeholder.com/150?text=QR+Code"
          alt="Kode QR"
          className="waiting-payment__img"
        />
        <a href="https://via.placeholder.com/150?text=QR+Code" className="waiting-payment__link" download>
          <img src={downloadIcon} alt="Ikon unduh" className="order-progress__icon" />
          Unduh kode QR
        </a>
        <button className="waiting-payment__button">Cek pembayaran</button>
      </div>
    </div>
  )
}

function ProcessedOrder({ }) {
  return (
    <>
      <h2 className="order-progress__h2">Pesanan diproses</h2>
    </>
  )
}

function FinishTransaction({ }) {
  return (
    <>
      <h2 className="order-progress__h2">Transaksi selesai</h2>
    </>
  )
}