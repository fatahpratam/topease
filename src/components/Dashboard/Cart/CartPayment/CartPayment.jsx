import "./CartPayment.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products, paymentMethods } from "../../../../data/index.js";
import { useUserStorage } from "../../../../contexts/index.js";
import { infoIcon } from "../../../../assets/icons/index.js";
import { findNestedBy, findBy } from "../../../../utils/index.js";
import { useOrder } from "../../../../contexts/index.js";

export default function CartPayment() {
  const
    [paymentMethodId, setPaymentMethodId] = useState(paymentMethods[0].id),
    { isLoggedIn, getCheckedCartItem } = useUserStorage(),
    checkedCartItem = isLoggedIn() && getCheckedCartItem();

  const handlePaymentId = (id) => {
    setPaymentMethodId(id);
  }
  return (
    <div className="cart-payment">
      <div className="cart-payment__container">
        <h2 className="cart-payment__h2">Metode Pembayaran</h2>
        <p>Berikut adalah daftar metode pembayaran yang ada.</p>
        {
          !isLoggedIn()
            ? <p>Anda harus Masuk untuk memilih metode pembayaran.</p>
            : <PaymentMethodList
              paymentMethodId={paymentMethodId}
              paymentMethods={paymentMethods}
              handlePaymentId={handlePaymentId}
            />
        }
      </div>
      <div className="cart-payment__container">
        <h2 className="cart-payment__h2">Konfirmasi Pembayaran</h2>
        {
          !isLoggedIn()
            ? <p>Anda harus Masuk untuk melakukan pembelian.</p>
            : checkedCartItem.length === 0
              ? <p>Anda harus memilih minimal satu keranjang.</p>
              : <PaymentConfirmation
                cart={checkedCartItem}
                paymentMethod={findNestedBy(paymentMethods, 'subMethods', 'id', paymentMethodId)}
              />
        }
      </div>
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

function PaymentConfirmation({ cart, paymentMethod }) {
  const
    currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }),
    cartTotalAmount = cart.reduce((prev, curr) => {
      const
        product = findBy(products, 'id', curr.productId),
        nominalOption = findBy(product.nominalOptions, 'id', curr.nominalOptionId),
        totalAmount = nominalOption.idrAmount + nominalOption.adminAmount,
        discountAmount = Math.floor((totalAmount) * product.discount / 100),
        finalAmount = totalAmount - discountAmount;
      return prev + finalAmount;
    }, 0),
    finalAmount = cartTotalAmount + paymentMethod.adminAmount,
    { loginInfo, getCheckedCartItem, removeCheckedFromCart } = useUserStorage(),
    { addOrder } = useOrder(),
    navigate = useNavigate();

  const handleOnSubmit = e => {
    e.preventDefault();
    const orderId = addOrder(loginInfo.id, paymentMethod.id, getCheckedCartItem());
    removeCheckedFromCart();
    navigate(`/dashboard/order/${orderId}`);
  };

  return (
    <form className="cart-payment__confirm-section" onSubmit={handleOnSubmit}>
      <p className="cart-payment__confirm-p">
        Jumlah produk yang dibeli
        <span className="cart-payment__confirm-span">{cart.length}</span>
      </p>
      <p className="cart-payment__confirm-p">
        Metode pembayaran
        <span className="cart-payment__confirm-span">{paymentMethod.name}</span>
      </p>
      <p className="cart-payment__confirm-p">
        Harga awal
        <span className="cart-payment__confirm-span">{currencyFormatter.format(cartTotalAmount)}</span>
      </p>
      <p className="cart-payment__confirm-p">
        Admin metode pembayaran
        <span className="cart-payment__confirm-span">{currencyFormatter.format(paymentMethod.adminAmount)}</span>
      </p>
      <hr className="cart-payment__confirm-hr" />
      <p className="cart-payment__confirm-p">
        <strong>Total Tagihan</strong>
        <span className="cart-payment__confirm-span">{currencyFormatter.format(finalAmount)}</span>
      </p>
      <blockquote className="cart-payment__blockquote">
        <img src={infoIcon} alt="Ikon info" className="cart-payment__icon" />
        Pastikan pesanan kamu sudah benar sebelum melanjutkan pesanan.
      </blockquote>
      <button className="cart-payment__confirm-button" type='submit'>
        Beli
      </button>
    </form>
  )
}