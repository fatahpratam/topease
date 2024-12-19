import './Cart.css';
import { useUserStorage } from "../../../contexts/index.js";
import CartDetails from "./CartDetails/CartDetails.jsx";

export default function Cart() {
  const { loginInfo, isLoggedIn } = useUserStorage();
  return (
    <div className="cart">
      <CartDetails cart={loginInfo.cart} isLoggedIn={isLoggedIn()} />
    </div>
  )
}