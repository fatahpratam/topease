import "./CartPayment.css";
import { useState } from "react";
import { paymentMethods } from "../../../../data/index.js";

export default function CartPayment() {
  const [paymentMethodId, setPaymentMethodId] = useState(paymentMethods[0].id);

  const handlePaymentId = (id) => {
    setPaymentMethodId(id);
  }
  return (
    <div className="cart-payment">
      <PaymentMethodList
        paymentMethodId={paymentMethodId}
        paymentMethods={paymentMethods}
        handlePaymentId={handlePaymentId}
      />
    </div>
  )
}

function PaymentMethodList({ paymentMethodId, paymentMethods, handlePaymentId }) {
  const currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });
  const handleChecked = (id) => {
    return paymentMethodId === id;
  };
  return (
    <div className="cart-payment__method-section">
      {paymentMethods.map(paymentMethod => (
        paymentMethod.adminAmount === null
          ? (
            <details className="cart-payment__method-details" key={paymentMethod.id}>
              <summary className="cart-payment__method-summary">{paymentMethod.name}</summary>
              <div className="cart-payment__method-container">
                {paymentMethod.subMethods.map(paymentMethod => (
                  <PaymentMethodItem
                    paymentMethod={paymentMethod}
                    currencyFormatter={currencyFormatter}
                    key={paymentMethod.id}
                    handlePaymentId={handlePaymentId}
                    handleChecked={handleChecked}
                  />
                ))}
              </div>
            </details>
          )
          : (
            <PaymentMethodItem
              paymentMethod={paymentMethod}
              currencyFormatter={currencyFormatter}
              key={paymentMethod.id}
              handlePaymentId={handlePaymentId}
              handleChecked={handleChecked}
            />
          )
      ))}
    </div>
  )
}

function PaymentMethodItem({ paymentMethod, currencyFormatter, handlePaymentId, handleChecked }) {
  return (
    <div className="cart-payment__method-item">
      <input
        id={paymentMethod.id}
        type="radio"
        className="cart-payment__method-input"
        name='paymentMethodId'
        value={paymentMethod.id}
        onChange={e => handlePaymentId(e.target.value)}
        checked={handleChecked(paymentMethod.id)}
        required
      />
      <label htmlFor={paymentMethod.id} className="cart-payment__method-label">
        <img
          src={paymentMethod.imgUrl}
          alt={paymentMethod.name}
          className="cart-payment__method-icon"
        />
        <div className="cart-payment__method-div">
          <span className="cart-payment__method-span">{paymentMethod.name}</span>
          <span className="cart-payment__method-span">{currencyFormatter.format(paymentMethod.adminAmount)}</span>
        </div>
      </label>
    </div>
  )
}