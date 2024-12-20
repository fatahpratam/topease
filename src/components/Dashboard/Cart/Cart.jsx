import './Cart.css';
import CartDetails from "./CartDetails/CartDetails.jsx";
import CartPayment from "./CartPayment/CartPayment.jsx";

export default function Cart() {
  return (
    <div className="cart">
      <section className="cart__section">
        <CartDetails />
      </section>
      <section className="cart__section">
        <CartPayment />
      </section>
    </div>
  )
}