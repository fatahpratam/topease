import "./CartDetails.css";
import { Link } from "react-router-dom";
import { products, paymentMethods } from "../../../../data/index.js";

export default function CartDetails({ cart, isLoggedIn }) {
  return (
    <div className="cart-details">
      <h2 className="cart-details__h2">Detail Keranjang</h2>
      <p className="cart-details__p">Berikut adalah daftar produk yang ada di keranjang.</p>
      {
        isLoggedIn
          ? <CartList cart={cart} />
          : <p>Anda harus Masuk untuk melihat keranjang Anda.</p>
      }
    </div>
  )
}

function CartList({ cart }) {
  return (
    <div className="cart-details__ul">
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
  const paymentMethod = paymentMethods.find(
    paymentMethod => paymentMethod.id === cartItem.paymentMethodId
  );
  const totalAdmin = nominalOption.adminAmount + paymentMethod.adminAmount;
  const totalAmount = nominalOption.idrAmount + totalAdmin;
  return (
    <li className="cart-details__li">
      <Link className="cart-details__link" to={`/dashboard/product/${product.id}`}>
        <img src={product.imgUrl} alt={product.name} className='cart-details__img' />
        <div className="cart-details__small-container">
          <h3 className="cart-details__h3">{product.name}</h3>
          <p className="cart-details__p">{nominalOption.name}</p>
          <p className="cart-details__p">{paymentMethod.name}</p>
        </div>
        <p className="cart-details__p cart-details__p-total">{currencyFormatter.format(totalAmount)}</p>
      </Link>
    </li>
  )
}