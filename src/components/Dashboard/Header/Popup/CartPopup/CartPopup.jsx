import './CartPopup.css';
import { arrowForwardIcon } from "../../../../../assets/icons/index.js";
import { Link } from "react-router-dom";
import { products } from "../../../../../data/index.js";

export default function CartPopup({ loginInfo, isLoggedIn }) {
  const length = loginInfo.cart?.length;
  return (
    <div className="keranjang">
      <div className="keranjang__container">
        <h2>
          <Link className="keranjang__h2" to={'/dashboard/cart'}>
            Keranjang {length > 0 ? `(${length})` : ''}
            <img src={arrowForwardIcon} alt="Arrow forward icon" className="keranjang__icon" />
          </Link>
        </h2>
        {
          isLoggedIn
            ? <CartList cart={loginInfo.cart} />
            : <p>Anda harus Masuk untuk melihat keranjang Anda.</p>
        }
      </div>
    </div>
  )
}

function CartList({ cart }) {
  return (
    <div className="keranjang__ul">
      {
        cart.length === 0
          ? <p>Keranjang Anda kosong.</p>
          : cart.map(
            cartItem => <CartItem cartItem={cartItem} key={cartItem.productId} />
          )
      }
    </div>
  )
}

function CartItem({ cartItem }) {
  const currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });
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
    <li className="keranjang__li">
      <Link className="keranjang__link" to={`/dashboard/product/${product.id}`}>
        <img src={product.imgUrl} alt={product.name} className='keranjang__img' />
        <div className="keranjang__small-container">
          <h3 className="keranjang__h3">{product.name}</h3>
          <p className="keranjang__p">{nominalOption.name}</p>
        </div>
        <p className="keranjang__p keranjang__p-total">{currencyFormatter.format(finalAmount)}</p>
      </Link>
    </li>
  )
}