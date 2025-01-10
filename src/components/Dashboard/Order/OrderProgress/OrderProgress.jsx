import './OrderProgress.css';
import dayjs from 'dayjs';
import { scheduleIcon, downloadIcon } from "../../../../assets/icons/index.js";
import { useOrder } from "../../../../hooks/index.js";
import { products } from "../../../../data/index.js";
import { findBy } from "../../../../utils/index.js";

export default function OrderProgress({ order }) {

  return (
    <div className="order-progress">
      <WaitingPayment order={order} />
      <ProcessingOrder order={order} />
      <FinishTransaction order={order} />
    </div>
  )
}

function WaitingPayment({ order }) {
  const
    localizedFormat = dayjs(order.expiredDate).locale('id').format('D MMMM YYYY [pukul] HH:mm'),
    { startCountdown, countdown, checkPaymentStatus, simulateAction } = useOrder();


  const handleOnClick = () => {
    checkPaymentStatus(order.orderId);
    simulateAction(order.orderId, 'order');
  };
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
        <button
          className="waiting-payment__button"
          onClick={handleOnClick}
          disabled={order.paymentStatus !== 'Menunggu pembayaran'}
        >
          Cek pembayaran
        </button>
      </div>
    </div>
  )
}

function ProcessingOrder({ order }) {
  const isDisabled = order.paymentStatus === 'Menunggu pembayaran';

  return (
    <>
      <div className={`processing-order ${isDisabled && 'disabled'}`}>
        <h2 className="order-progress__h2">Pesanan diproses</h2>
        {
          !isDisabled &&
          <>
            <p>Berikut adalah kemajuan dari pesanan Anda:</p>
            <CartList cart={order.cart} />
          </>
        }
      </div>
    </>
  )
}

function CartList({ cart }) {
  return (
    <ul className="processing-order__ul">
      {cart.map(cartItem =>
        <CartItem cartItem={cartItem} key={cartItem.productId} />
      )}
    </ul>
  )
}

function CartItem({ cartItem }) {
  const
    { productId, nominalOptionId, orderStatus, ...extraFields } = cartItem,
    product = findBy(products, 'id', productId),
    nominalOption = findBy(product.nominalOptions, 'id', nominalOptionId);

  return (
    <li className="processing-order__li">
      <details className="processing-order__details">
        <summary className="processing-order__summary">
          <img src={product.imgUrl} alt={product.name} className="processing-order__img" />
          <div className="processing-order__sub-container">
            <p>{product.name}</p>
            <p>{nominalOption.name}</p>
          </div>
          <span className="processing-order__span">{orderStatus}</span>
        </summary>
        <div className="processing-order__container">
          <h3 className="processing-order__h3">Informasi Tambahan</h3>
          {
            Object.keys(extraFields).map(field => {
              const labelId = `${product.name}-${field}`;
              return (
                <p className="processing-order__p" key={labelId}>
                  <label
                    htmlFor={labelId}
                    className="processing-order__label"
                  >
                    {field.toLowerCase()}:
                  </label>
                  <input
                    id={labelId}
                    type="text"
                    className="processing-order__input"
                    value={extraFields[field]}
                    readOnly
                  />
                </p>
              )
            })
          }
        </div>
      </details>
    </li>
  )
}

function FinishTransaction({ order }) {
  const isDisabled = order.paymentStatus === 'Menunggu pembayaran';

  return (
    <div className={`finish-transaction ${isDisabled && 'disabled'}`}>
      <h2 className="order-progress__h2">Transaksi selesai</h2>
    </div>
  )
}