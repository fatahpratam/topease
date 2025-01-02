import './OrderProgress.css';

export default function OrderProgress({ order }) {
  return (
    <div className="payment-progress">
      <div className="payment-progress__container">
        <WaitingPayment />
      </div>
      <div className="payment-progress__container">
        <ProcessedOrder />
      </div>
      <div className="payment-progress__container">
        <FinishTransaction />
      </div>
    </div>
  )
}

function WaitingPayment({ }) {
  return (
    <>
      <h2 className="payment-progress__h2">Menunggu Pembayaran</h2>
    </>
  )
}

function ProcessedOrder({ }) {
  return (
    <>
      <h2 className="payment-progress__h2">Pesanan diproses</h2>
    </>
  )
}

function FinishTransaction({ }) {
  return (
    <>
      <h2 className="payment-progress__h2">Transaksi selesai</h2>
    </>
  )
}