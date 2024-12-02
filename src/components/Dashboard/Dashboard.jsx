import { Outlet } from "react-router-dom";
import { Footer, Header } from "./../index.js";
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard__div">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}