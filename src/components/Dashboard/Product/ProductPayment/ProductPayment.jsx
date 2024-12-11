import './ProductPayment.css';
import { useState, useRef, useEffect } from "react";
import { infoIcon } from "../../../../assets/icons/index.js";
import { paymentMethods } from "../../../../data/index.js";
import { findBy, findNestedBy } from "../../../../utils/index.js";
import { ErrorBlockQuote } from "../../../Error";
import { useErrorBlockQuote } from "../../../../hooks/index.js";
import { useStorage } from "../../../../contexts/index.js";

export default function ProductPayment({ product }) {
  const [nominalOptionId, setNominalOptionId] = useState(product.nominalOptions[0].id);
  const [paymentMethodId, setPaymentMethodId] = useState(paymentMethods[0].id);

  const { errorMessage, triggerError } = useErrorBlockQuote();
  const { isLoggedIn, loginInfo } = useStorage();
  const formRef = useRef();

  const handleNominalId = (id) => {
    setNominalOptionId(id);
  };

  const handlePaymentId = (id) => {
    setPaymentMethodId(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoggedIn()) {
      const data = new FormData(formRef.current);
      data.append('productId', product.id);
      data.append('userId', loginInfo.id);
      const objData = {};
      for (const [key, value] of data.entries()) {
        objData[key] = value;
      }
      console.log(objData);
    } else {
      triggerError('Anda harus login atau register untuk melakukan pembelian.');
    }
  };

  useEffect(() => {
    setNominalOptionId(product.nominalOptions[0].id);
  }, [product]);

  return (
    <form
      className="product__container payment"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <section className="payment__section">
        <h3 className="payment__h3">Masukkan Informasi Akun</h3>
        <AccountInfo requiredFields={product.requiredFields} />
      </section>
      <section className="payment__section">
        <h3 className="payment__h3">Pilih Nominal</h3>
        <blockquote className="payment__blockquote">
          <img src={infoIcon} alt="Info icon" className="product__icon" />
          Harga tertera sudah termasuk biaya admin dan biaya tambahan lainnya.
        </blockquote>
        <NominalOptionList
          nominalOptionId={nominalOptionId}
          nominalOptions={product.nominalOptions}
          handleNominalId={handleNominalId}
        />
      </section>
      <section className="payment__section">
        <h3 className="payment__h3">Pilih Metode Pembayaran</h3>
        <PaymentMethodList
          paymentMethodId={paymentMethodId}
          paymentMethods={paymentMethods}
          handlePaymentId={handlePaymentId}
        />
      </section>
      <section className="payment__section">
        <h3 className="payment__h3">Konfirmasi Pembayaran</h3>
        <PaymentConfirmation
          nominalOption={findBy(product.nominalOptions, 'id', nominalOptionId) || product.nominalOptions[0].id}
          paymentMethod={findNestedBy(paymentMethods, 'subMethods', 'id', paymentMethodId)}
          errorMessage={errorMessage}
        />
      </section>
    </form>
  )
}

function AccountInfo({ requiredFields }) {
  return (
    <>
      {
        requiredFields.map(field => (
          <p className="payment__account-p" key={field.fieldName}>
            <label htmlFor={field.fieldName}>{field.label}*</label>
            <input
              id={field.fieldName}
              type={field.type}
              className="payment__account-input"
              placeholder={field.placeholder}
              name={field.fieldName}
              required
            />
          </p>
        ))
      }
    </>
  )
}

function NominalOptionList({ nominalOptionId, nominalOptions, handleNominalId }) {
  const numberFormatter = Intl.NumberFormat('id-ID');
  const currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });
  return (
    <div className="payment__token-section">
      {nominalOptions.map(nominalOption => (
        <div className="payment__token-item" key={nominalOption.id}>
          <input
            id={nominalOption.id}
            type="radio"
            className="payment__token-input"
            name='nominalOptionId'
            value={nominalOption.id}
            onChange={e => handleNominalId(e.target.value)}
            checked={nominalOption.id === nominalOptionId}
            required
          />
          <label htmlFor={nominalOption.id} className="payment__token-label">
            <img src={nominalOption.imgUrl} alt="" className="payment__token-icon" />
            <span className="payment__token-span">{nominalOption.name}</span>
            <span className="payment__token-span">{numberFormatter.format(nominalOption.amount)}</span>
            <span className="payment__token-span">{currencyFormatter.format(nominalOption.idrAmount + nominalOption.adminAmount)}</span>
          </label>
        </div>
      ))}
    </div>
  )
}

function PaymentMethodList({ paymentMethodId, paymentMethods, handlePaymentId }) {
  const currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });
  const handleDefaultChecked = (id) => {
    return paymentMethodId === id;
  };
  return (
    <div className="payment__method-section">
      {paymentMethods.map(paymentMethod => {
        if (paymentMethod.adminAmount === null)
          return (
            <details className="payment__method-details" key={paymentMethod.id}>
              <summary className="payment__method-summary">{paymentMethod.name}</summary>
              <div className="payment__method-container">
                {paymentMethod.subMethods.map(paymentMethod => (
                  <PaymentMethodItem
                    paymentMethod={paymentMethod}
                    currencyFormatter={currencyFormatter}
                    key={paymentMethod.id}
                    handlePaymentId={handlePaymentId}
                    handleDefaultChecked={handleDefaultChecked}
                  />
                ))}
              </div>
            </details>
          )
        else
          return <PaymentMethodItem
            paymentMethod={paymentMethod}
            currencyFormatter={currencyFormatter}
            key={paymentMethod.id}
            handlePaymentId={handlePaymentId}
            handleDefaultChecked={handleDefaultChecked}
          />
      })}
    </div>
  )
}

function PaymentMethodItem({ paymentMethod, currencyFormatter, handlePaymentId, handleDefaultChecked }) {
  return (
    <div className="payment__method-item">
      <input
        id={paymentMethod.id}
        type="radio"
        className="payment__method-input"
        name='paymentMethodId'
        value={paymentMethod.id}
        onChange={e => handlePaymentId(e.target.value)}
        checked={handleDefaultChecked(paymentMethod.id)}
        required
      />
      <label htmlFor={paymentMethod.id} className="payment__method-label">
        <img
          src={paymentMethod.imgUrl}
          alt={paymentMethod.name} className="payment__method-icon"
        />
        <div className="payment__method-div">
          <span className="payment__method-span">{paymentMethod.name}</span>
          <span className="payment__method-span">{currencyFormatter.format(paymentMethod.adminAmount)}</span>
        </div>
      </label>
    </div>
  )
}

function PaymentConfirmation({ nominalOption, paymentMethod, errorMessage }) {
  const numberFormatter = Intl.NumberFormat('id-ID');
  const currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });

  const totalAdmin = nominalOption.adminAmount
    + paymentMethod.adminAmount;
  const totalAmount = nominalOption.idrAmount + totalAdmin;

  return (
    <div className="payment__confirm-section">
      <p className="payment__confirm-p">
        Item yang dibeli
        <span className="payment__confirm-span">{nominalOption.name}</span>
      </p>
      <p className="payment__confirm-p">
        Jumlah item
        <span className="payment__confirm-span">{numberFormatter.format(nominalOption.amount)}</span>
      </p>
      <p className="payment__confirm-p">
        Metode pembayaran
        <span className="payment__confirm-span">{paymentMethod.name}</span>
      </p>
      <p className="payment__confirm-p">
        Harga awal
        <span className="payment__confirm-span">{currencyFormatter.format(nominalOption.amount)}</span>
      </p>
      <p className="payment__confirm-p">
        Biaya admin
        <span className="payment__confirm-span">{currencyFormatter.format(totalAdmin)}</span>
      </p>
      <hr />
      <p className="payment__confirm-p">
        <strong>Total Tagihan</strong>
        <span className="payment__confirm-span">{currencyFormatter.format(totalAmount)}</span>
      </p>
      <blockquote className="payment__blockquote">
        <img src={infoIcon} alt="Info icon" className="product__icon" />
        Pastikan pesanan kamu sudah benar sebelum melanjutkan pesanan.
      </blockquote>
      <ErrorBlockQuote message={errorMessage} />
      <button className="payment__confirm-button" type='submit'>Beli sekarang</button>
    </div>
  )
}