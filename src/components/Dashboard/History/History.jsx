import './History.css';
import { useParams } from 'react-router-dom';
import { ProtectedRoute } from "../../Utilities/index.js";
import { useUserStorage } from "../../../contexts/index.js";
import HistoryOverview from './HistoryOverview/HistoryOverview.jsx';
import HistoryDetails from './HistoryDetails/HistoryDetails.jsx';

export default function History() {
  const
    { id } = useParams(),
    { isLoggedIn } = useUserStorage();

  return (
    <ProtectedRoute to={'/dashboard/home'} condition={!isLoggedIn()}>
      <div className="history">
        {id ? <HistoryDetails id={id} /> : <HistoryOverview />}
      </div>
    </ProtectedRoute>
  );
}