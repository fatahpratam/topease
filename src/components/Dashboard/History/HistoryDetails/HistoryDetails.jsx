import './HistoryDetails.css';
import dayjs from 'dayjs';
import { downloadIcon } from "../../../../assets/icons/index.js";
import { useOrder, useUserStorage } from "../../../../contexts/index.js";
import { findBy, findNestedBy, fileDownloader } from "../../../../utils/index.js";
import { products, paymentMethods } from "../../../../data/index.js";
import { Navigate } from 'react-router-dom';

export default function HistoryDetails({ id }) {
  const
    { getOrder, getOrderStatus } = useOrder(),
    { loginInfo } = useUserStorage(),
    order = getOrder(id);

  if (!order || loginInfo.id !== order.userId) {
    return <Navigate to={'/dashboard/history'} />
  }

  const currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }),
    paymentMethod = findNestedBy(paymentMethods, 'subMethods', 'id', order.paymentMethodId),
    { cartTotalAmount, cartTotalAdmin } = order.cart.reduce((prev, curr) => {
      const
        product = findBy(products, 'id', curr.productId),
        nominalOption = findBy(product.nominalOptions, 'id', curr.nominalOptionId),
        totalAmount = nominalOption.idrAmount + nominalOption.adminAmount,
        discountAmount = Math.floor((totalAmount) * product.discount / 100),
        finalAmount = totalAmount - discountAmount;

      return {
        cartTotalAmount: prev.cartTotalAmount + finalAmount,
        cartTotalAdmin: prev.cartTotalAdmin + nominalOption.adminAmount
      };
    }, { cartTotalAmount: 0, cartTotalAdmin: 0 }),
    finalAmount = cartTotalAmount + paymentMethod.adminAmount,
    finalAdmin = cartTotalAdmin + paymentMethod.adminAmount,
    orderStatuses = getOrderStatus(order.orderId);

  const handleDownload = e => {
    e.preventDefault();
    fileDownloader('Bukti transaksi.jpg', 'https://via.assets.so/img.jpg?w=300&h=600&t=Bukti+transaksi');

  }

  return (
    <div className="history-details">
      <h2 className="history-details__h2">Detail Riwayat</h2>
      <p className="history-details__p">
        <span className="history-details__span">ID pesanan</span>
        {order.orderId}
      </p>
      <p className="history-details__p">
        <span className="history-details__span">Metode pembayaran</span>
        {paymentMethod.name}
      </p>
      <p className="history-details__p">
        <span className="history-details__span">Admin metode pembayaran</span>
        {currencyFormatter.format(paymentMethod.adminAmount)}
      </p>
      <p className="history-details__p">
        <span className="history-details__span">Total admin</span>
        {currencyFormatter.format(finalAdmin)}
      </p>
      <p className="history-details__p">
        <span className="history-details__span">Total tagihan</span>
        {currencyFormatter.format(finalAmount)}
      </p>
      <p className="history-details__p">
        <span className="history-details__span">Status pembayaran</span>
        {order.paymentStatus}
      </p>
      <p className="history-details__p">
        <span className="history-details__span">Status pesanan</span>
        {orderStatuses}
      </p>
      <p className="history-details__p">
        <span className="history-details__span">Waktu pesanan</span>
        {dayjs(order.orderDate).format('DD/MM/YYYY HH:mm')}
      </p>
      <a href="" className="history-details__link" onClick={handleDownload}>
        <img src={downloadIcon} alt="Ikon unduh" className="history-details__icon" />
        Bukti transaksi
      </a>
      <hr className="history-details__hr" />
      <h3 className="history-details__h3">Detail keranjang</h3>
      <CartList cart={order.cart} />
    </div>
  );
}

function CartList({ cart }) {
  return (
    <ul className="history-details__ul">
      {cart.map(
        item => <CartItem item={item} />
      )}
    </ul>
  );
}

function CartItem({ item }) {
  const
    { productId, nominalOptionId, orderStatus, ...extraFields } = item,
    currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }),
    product = findBy(products, 'id', productId),
    nominalOption = findBy(product.nominalOptions, 'id', nominalOptionId),
    totalAmount = nominalOption.idrAmount + nominalOption.adminAmount,
    discountAmount = Math.floor((totalAmount) * product.discount / 100),
    finalAmount = totalAmount - discountAmount;

  return (
    <li className="history-details__li">
      <details className="history-details__details">
        <summary className="history-details__summary">
          <img src={product.imgUrl} alt={product.name} className="history-details__img" />
          <div className="history-details__sub-container">
            <p>{product.name}</p>
            <p>{nominalOption.name}</p>
          </div>
          <span>{currencyFormatter.format(finalAmount)}</span>
        </summary>
        <div className="history-details__container">
          <h3 className="history-details__h3">Informasi Tambahan</h3>
          {
            Object.keys(extraFields).map(field => {
              const labelId = `${product.name}-${field}`;
              return (
                <p className="history-details__p" key={labelId}>
                  <label
                    htmlFor={labelId}
                    className="history-details__label"
                  >
                    {field.toLowerCase()}:
                  </label>
                  <input
                    id={labelId}
                    type="text"
                    className="history-details__input"
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