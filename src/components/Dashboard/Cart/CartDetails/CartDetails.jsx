import "./CartDetails.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { products } from "../../../../data/index.js";
import { useUserStorage } from "../../../../contexts/index.js";
import { findNestedBy } from "../../../../utils/index.js";

export default function CartDetails() {
  const { loginInfo, isLoggedIn } = useUserStorage();
  return (
    <div className="cart-details">
      <h2 className="cart-details__h2">Detail Keranjang</h2>
      <p className="cart-details__p">Berikut adalah daftar produk yang ada di keranjang.</p>
      {
        !isLoggedIn()
          ? <p>Anda harus Masuk untuk melihat keranjang Anda.</p>
          : loginInfo.cart.length <= 0
            ? <p>Keranjang Anda kosong.</p>
            : <CartList cart={loginInfo.cart} />
      }
    </div>
  )
}

function CartList({ cart }) {
  const { toggleCartItem, toggleAllCartItem, isEveryCartItemChecked, removeCheckedFromCart } = useUserStorage();
  const [selectAll, setSelectAll] = useState(isEveryCartItemChecked());

  const handleAllSelectOnChange = () => {
    setSelectAll(prev => {
      toggleAllCartItem(!prev);
      return !prev;
    });
  };

  useEffect(() => {
    if (isEveryCartItemChecked())
      setSelectAll(true);
    else
      setSelectAll(false);
  }, [cart]);

  return (
    <>
      <div className="select-all">
        <div className="select-all__container">
          <input
            type="checkbox"
            className="select-all__input"
            id="selectAll"
            checked={selectAll}
            onChange={handleAllSelectOnChange}
          />
          <label htmlFor="selectAll" className="select-all__label">Pilih semua</label>
        </div>
        <button
          className="select-all__button"
          onClick={removeCheckedFromCart}
        >
          Hapus pilihan
        </button>
      </div>
      <div className="cart-details__ul">
        {
          cart.map(cartItem => (
            <CartItem
              cartItem={cartItem}
              toggleCartItem={toggleCartItem}
              key={cartItem.productId}
            />
          ))
        }
      </div>
    </>
  )
}

function CartItem({ cartItem, toggleCartItem }) {
  const currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });
  const handleOnChange = () => {
    toggleCartItem(cartItem.productId);
  };
  const product = products.find(
    product => product.id === cartItem.productId
  );
  const nominalOption = product.nominalOptions.find(
    nominalOption => nominalOption.id === cartItem.nominalOptionId
  );
  const totalAmount = nominalOption.idrAmount + nominalOption.adminAmount,
    discountAmount = Math.floor((totalAmount) * product.discount / 100),
    finalAmount = totalAmount - discountAmount;
  return (
    <li className="cart-details__li">
      <input
        id={cartItem.productId}
        type="checkbox"
        className="cart-details__input"
        checked={cartItem.isChecked}
        onChange={handleOnChange}
      />
      <label htmlFor={cartItem.productId} className="cart-details__label">
        <img src={product.imgUrl} alt={product.name} className='cart-details__img' />
        <div className="cart-details__small-container">
          <h3 className="cart-details__h3">{product.name}</h3>
          <p className="cart-details__p">{nominalOption.name}</p>
        </div>
        <p className="cart-details__p cart-details__p-total">{currencyFormatter.format(finalAmount)}</p>
        <Link className="cart-details__link" to={`/dashboard/product/${product.id}`}>Lihat</Link>
      </label>
    </li>
  )
}