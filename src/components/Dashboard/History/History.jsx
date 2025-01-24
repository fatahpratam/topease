import './History.css';
import { useParams } from 'react-router-dom';
import { ProtectedRoute } from "../../Utilities/index.js";
import { useUserStorage, useOrder } from "../../../contexts/index.js";
import HistoryOverview from './HistoryOverview/HistoryOverview.jsx';
import HistoryDetails from './HistoryDetails/HistoryDetails.jsx';

export default function History() {
  const
    { id } = useParams(),
    { isLoggedIn } = useUserStorage(),
    { getOrder } = useOrder(),
    order = getOrder(id);

  return (
    <ProtectedRoute to={'/dashboard/home'} condition={!isLoggedIn()}>
      <div className="history">
        {order ? <HistoryDetails order={order} /> : <HistoryOverview />}
      </div>
    </ProtectedRoute>
  );
}