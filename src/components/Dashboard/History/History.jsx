import './History.css';
import { useState } from 'react';
import { historyOptions } from "../../../data/index.js";

export default function History() {
  const
    { durationOptions, paymentOptions, orderOptions } = historyOptions,
    [duration, setDuration] = useState(durationOptions[0]),
    [paymentStatus, setPaymentStatus] = useState(paymentOptions[0]),
    [orderStatus, setOrderStatus] = useState(orderOptions[0]);

  return (
    <div className="history">
      <h1 className="history__h1">Riwayat</h1>
      <p className="history__p">Berikut adalah riwayat-riwayat dari pembelian Anda.</p>
    </div>
  );
}

function HistoryOption({ }) {
  return;
}

function HistoryList({ }) {
  return;
}

function HistoryItem({ }) {
  return;
}