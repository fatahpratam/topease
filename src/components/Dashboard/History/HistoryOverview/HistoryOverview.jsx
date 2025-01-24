import './HistoryOverview.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { historyOptions, paymentMethods, products } from "../../../../data/index.js";
import { useOrder, useUserStorage } from "../../../../contexts/index.js";
import { findNestedBy } from "../../../../utils/index.js";

const { filterOrderBy, getOrderStatus } = useOrder();

export default function HistoryOverview() {
  const
    { loginInfo } = useUserStorage(),
    { durationOptions, paymentOptions, orderOptions } = historyOptions,
    [duration, setDuration] = useState(durationOptions[0].duration),
    [paymentStatus, setPaymentStatus] = useState(paymentOptions[0]),
    [orderStatus, setOrderStatus] = useState(orderOptions[0]),
    orders = filterOrderBy(loginInfo.userId, duration, paymentStatus, orderStatus);

  return (
    <div className="history-list">
      <h2 className="history-list__h2">Riwayat</h2>
      <p className="history-list__p">Berikut adalah riwayat-riwayat dari pembelian Anda.</p>
      <HistoryOption
        duration={duration}
        paymentStatus={paymentStatus}
        orderStatus={orderStatus}
        setDuration={setDuration}
        setPaymentStatus={setPaymentStatus}
        setOrderStatus={setOrderStatus}
      />
      <HistoryList orders={orders} />
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
    <form className="history-list__form" onSubmit={e => e.preventDefault()}>
      <select
        className="history-list__select"
        value={duration}
        onChange={handleDurationChange}
      >
        {durationOptions.map(
          option => <option value={option.duration} className="history-list__option">{option.name}</option>
        )}
      </select>
      <select
        className="history-list__select"
        value={paymentStatus}
        onChange={handlePaymentChange}
      >
        {paymentOptions.map(
          option => <option value={option} className="history-list__option">{option}</option>
        )}
      </select>
      <select
        className="history-list__select"
        value={orderStatus}
        onChange={handleOrderChange}
      >
        {orderOptions.map(
          option => <option value={option} className="history-list__option">{option}</option>
        )}
      </select>
    </form>
  )
}

function HistoryList({ orders }) {
  return (
    <ul className="history-list__ul">
      {orders.map(
        order => <HistoryItem order={order} key={order.orderId} />
      )}
    </ul>
  )
}

const currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });

function HistoryItem({ order }) {
  const
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
    <li className="history-list__li">
      <h2 className="history-list__h2">Order Id {order.orderId}</h2>
      <div className="history-list__container">
        <p className="history-list__p">
          Metode pembayaran:
          {paymentMethod.name}
        </p>
        <p className="history-list__p">
          Tanggal pemesanan:
          {dayjs(order.orderDate).format('DD-MM-YYYY HH:mm')}
        </p>
        <p className="history-list__p">
          Status pembayaran:
          {order.paymentStatus}
        </p>
        <p className="history-list__p">
          Status pesanan:
          {getOrderStatus(order.orderId)}
        </p>
        <p className="history-list__p">
          Total biaya:
          {currencyFormatter.format(finalAmount)}
        </p>
        <p className="history-list__p">
          <Link className="history-list__link" to={`/dashboard/history/${order.orderId}`}>Lihat</Link>
        </p>
      </div>
    </li>
  )
}