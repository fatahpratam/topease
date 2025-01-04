import './Order.css';
import { useCountdown, useOrder } from "../../../hooks/index.js";
import { useParams } from 'react-router-dom';
import OrderProgress from './OrderProgress/OrderProgress.jsx';
import OrderDetails from './OrderDetails/OrderDetails.jsx';
import { useUserStorage } from "../../../contexts/index.js";
import { ProtectedRoute } from "../../Utilities/index.js";

export default function Order() {
  const
    { id } = useParams(),
    { isLoggedIn, loginInfo } = useUserStorage(),
    { getOrder } = useOrder(),
    order = getOrder(id);

  return (
    <ProtectedRoute condition={!isLoggedIn() && loginInfo.id !== order.userId} to={'/dashboard/home'}>
      <div className="order">
        <div className="order__container">
          <OrderProgress order={order} />
        </div>
        <div className="order__container">
          <OrderDetails order={order} />
        </div>
      </div>
    </ProtectedRoute>
  )
}