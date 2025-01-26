import './HistoryOverview.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "dayjs/locale/id";
import dayjs from 'dayjs';
import { historyOptions, paymentMethods, products } from "../../../../data/index.js";
import { useOrder, useUserStorage } from "../../../../contexts/index.js";
import { findNestedBy, findBy } from "../../../../utils/index.js";

export default function HistoryOverview() {
  const
    { filterOrderBy } = useOrder(),
    { loginInfo } = useUserStorage(),
    { durationOptions, paymentOptions, orderOptions } = historyOptions,
    [duration, setDuration] = useState(durationOptions[0].duration),
    [paymentStatus, setPaymentStatus] = useState(paymentOptions[0]),
    [orderStatus, setOrderStatus] = useState(orderOptions[0]),
    orders = filterOrderBy(loginInfo.id, duration, paymentStatus, orderStatus);

  return (
    <div className="history-overview">
      <h2 className="history-overview__h2">Riwayat</h2>
      <p>Berikut adalah riwayat-riwayat dari pembelian Anda. Anda dapat melakukan penyaringan bedasarkan tanggal pesanan, status pembayaran, dan status pesanan.</p>
      <HistoryOption
        duration={duration}
        paymentStatus={paymentStatus}
        orderStatus={orderStatus}
        setDuration={setDuration}
        setPaymentStatus={setPaymentStatus}
        setOrderStatus={setOrderStatus}
      />
      {
        orders.length === 0
          ? <p>Tidak ada riwayat pembelian berdasarkan kriteria penyaringan.</p>
          : <HistoryList orders={orders} />
      }
    </div>
  );
}

function HistoryOption({
  duration, paymentStatus, orderStatus, setDuration, setPaymentStatus, setOrderStatus
}) {
  const
    { durationOptions, paymentOptions, orderOptions } = historyOptions,
    handleDurationChange = e => setDuration(e.target.value),
    handlePaymentChange = e => setPaymentStatus(e.target.value),
    handleOrderChange = e => setOrderStatus(e.target.value);

  return (
    <form className="history-overview__form" onSubmit={e => e.preventDefault()}>
      <select
        className="history-overview__select"
        value={duration}
        onChange={handleDurationChange}
      >
        {durationOptions.map(
          option => <option value={option.duration} className="history-overview__option" key={option.duration}>{option.name}</option>
        )}
      </select>
      <select
        className="history-overview__select"
        value={paymentStatus}
        onChange={handlePaymentChange}
      >
        {paymentOptions.map(
          option => <option value={option} className="history-overview__option" key={option}>{option}</option>
        )}
      </select>
      <select
        className="history-overview__select"
        value={orderStatus}
        onChange={handleOrderChange}
      >
        {orderOptions.map(
          option => <option value={option} className="history-overview__option" key={option}>{option}</option>
        )}
      </select>
    </form>
  )
}

function HistoryList({ orders }) {
  return (
    <ul className="history-overview__ul">
      {orders.map(
        order => <HistoryItem order={order} key={order.orderId} />
      )}
    </ul>
  )
}

const currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });

function HistoryItem({ order }) {
  const
    { getOrderStatus } = useOrder(),
    paymentMethod = findNestedBy(paymentMethods, 'subMethods', 'id', order.paymentMethodId),
    cartTotalAmount = order.cart.reduce((prev, curr) => {
      const
        product = findBy(products, 'id', curr.productId),
        nominalOption = findBy(product.nominalOptions, 'id', curr.nominalOptionId),
        totalAmount = nominalOption.idrAmount + nominalOption.adminAmount,
        discountAmount = Math.floor((totalAmount) * product.discount / 100),
        finalAmount = totalAmount - discountAmount;
      return prev + finalAmount;
    }, 0),
    finalAmount = cartTotalAmount + paymentMethod.adminAmount;

  return (
    <li className="history-overview__li">
      <h3 className="history-overview__h3">{dayjs(order.orderDate).locale('id').format('D MMMM YYYY, HH:mm')}</h3>
      <div className="history-overview__container">
        <p className="history-overview__p">
          <span className="history-overview__span">
            Status pembayaran
          </span>
          {order.paymentStatus}
        </p>
        <p className="history-overview__p">
          <span className="history-overview__span">
            Status pesanan
          </span>
          {getOrderStatus(order.orderId)}
        </p>
        <p className="history-overview__p">
          <span className="history-overview__span">
            Total biaya
          </span>
          {currencyFormatter.format(finalAmount)}
        </p>
        <p className="history-overview__p">
          <Link className="history-overview__link" to={`/dashboard/history/${order.orderId}`}>Lihat Detail</Link>
        </p>
      </div>
    </li>
  )
}