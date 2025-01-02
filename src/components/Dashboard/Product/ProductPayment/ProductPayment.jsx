import './ProductPayment.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { infoIcon } from "../../../../assets/icons/index.js";
import { findBy } from "../../../../utils/index.js";
import { useUserStorage } from "../../../../contexts/index.js";

export default function ProductPayment({ product }) {
  const { isLoggedIn, addToCart, isCartItemExist, handleCartItemChange, removeFromCart, getCartItem, loginInfo } = useUserStorage(),
    [paymentData, setPaymentData] = useState(() => {
      const extraField = product.requiredFields.reduce((prev, curr) => {
        return { ...prev, [curr.fieldName]: '' };
      }, {});
      for (const key of Object.keys(extraField)) {
        if (key === 'phoneNumber') {
          extraField.phoneNumber = loginInfo.phoneNumber;
        }
      }
      return {
        productId: product.id,
        nominalOptionId: product.nominalOptions[0].id,
        ...extraField
      }
    });

  const navigate = useNavigate(),
    doesCartItemExist = isCartItemExist(product.id),
    nominalOptionId = getValueOf('nominalOptionId'),
    nominalOption = findBy(product.nominalOptions, 'id', nominalOptionId) || product.nominalOptions[0];

  const handleProductChange = (property, value) => {
    if (doesCartItemExist)
      handleCartItemChange(product.id, property, value);
    else
      setPaymentData(prev => {
        return { ...prev, [property]: value };
      });
  };

  function getValueOf(property) {
    if (doesCartItemExist)
      return getCartItem(product.id)[property];
    else
      return paymentData[property];
  }

  useEffect(() => {
    setPaymentData(() => {
      const extraField = product.requiredFields.reduce((prev, curr) => {
        return { ...prev, [curr.fieldName]: '' };
      }, {});
      for (const key of Object.keys(extraField)) {
        if (key === 'phoneNumber') {
          extraField.phoneNumber = loginInfo.phoneNumber;
        }
      }
      return {
        productId: product.id,
        nominalOptionId: product.nominalOptions[0].id,
        ...extraField
      }
    });
  }, [product]);


  const handleNominalId = (id) => {
    handleProductChange('nominalOptionId', id);
  };

  const handleExtraField = (property, value) => {
    handleProductChange(property, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoggedIn()) {
      if (doesCartItemExist) {
        removeFromCart(product.id);
      }
      else {
        addToCart(paymentData);
      }
    } else {
      navigate('../../../login');
    }
  };

  return (
    <form
      className="payment"
      onSubmit={handleSubmit}
    >
      <section className="payment__section">
        <h3 className="payment__h3">Masukkan Informasi Akun</h3>
        <AccountInfo
          requiredFields={product.requiredFields}
          handleExtraField={handleExtraField}
          getExtraField={getValueOf}
        />
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
        <h3 className="payment__h3">Konfirmasi Pembayaran</h3>
        <PaymentConfirmation
          nominalOption={nominalOption}
          isCartItemExist={doesCartItemExist}
          isLoggedIn={isLoggedIn()}
          discount={product.discount}
        />
      </section>
    </form>
  )
}

function AccountInfo({ requiredFields, handleExtraField, getExtraField }) {
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
              value={getExtraField(field.fieldName)}
              onChange={(e) => handleExtraField(field.fieldName, e.target.value)}
              pattern={field.type === 'tel' ? '^(\\+62|62|0)8[1-9][0-9]{6,11}$' : '.*'}
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
            <img src={nominalOption.imgUrl} alt={nominalOption.name} className="payment__token-icon" />
            <span className="payment__token-span">{nominalOption.name}</span>
            <span className="payment__token-span">{numberFormatter.format(nominalOption.amount)}</span>
            <span className="payment__token-span">{currencyFormatter.format(nominalOption.idrAmount + nominalOption.adminAmount)}</span>
          </label>
        </div>
      ))}
    </div>
  )
}

function PaymentConfirmation({ nominalOption, isCartItemExist, isLoggedIn, discount }) {
  const
    numberFormatter = Intl.NumberFormat('id-ID'),
    currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }),
    totalAmount = nominalOption.idrAmount + nominalOption.adminAmount,
    discountAmount = Math.floor((totalAmount) * discount / 100),
    finalAmount = totalAmount - discountAmount;

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
        Harga awal
        <span className="payment__confirm-span">{currencyFormatter.format(nominalOption.amount)}</span>
      </p>
      <p className="payment__confirm-p">
        Biaya admin
        <span className="payment__confirm-span">{currencyFormatter.format(nominalOption.adminAmount)}</span>
      </p>
      <p className="payment__confirm-p">
        Potongan promo
        <span className="payment__confirm-span">{`(${discount}%) ${currencyFormatter.format(discountAmount)}`}</span>
      </p>
      <hr />
      <p className="payment__confirm-p">
        <strong>Total Tagihan</strong>
        <span className="payment__confirm-span">{currencyFormatter.format(finalAmount)}</span>
      </p>
      <blockquote className="payment__blockquote">
        <img src={infoIcon} alt="Info icon" className="product__icon" />
        Pastikan pesanan kamu sudah benar sebelum melanjutkan pesanan.
      </blockquote>
      <button className="payment__confirm-button" type='submit'>
        {!isLoggedIn
          ? 'Tambah ke keranjang'
          : isCartItemExist
            ? 'Hapus dari keranjang'
            : 'Tambah ke keranjang'
        }
      </button>
    </div>
  )
}