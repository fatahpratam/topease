import { Link } from "react-router-dom";
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <section className="footer__section">
          <h2 className="footer__h2">Tentang</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae corrupti natus iure quas exercitationem inventore praesentium odio porro ipsam nam nisi iusto nemo modi quae, laboriosam fugit sed tempora quia.</p>
        </section>
        <section className="footer__section">
          <h2 className="footer__h2">Legal</h2>
          <ul className="footer__ul">
            <li><Link to='/dashboard/privacy-policy' className="footer__link">Kebijakan Privasi</Link></li>
            <li><Link to='/dashboard/terms-and-conditions' className="footer__link">Syarat dan Ketentuan</Link></li>
            <li><Link to='/dashboard/refund-policy' className="footer__link">Kebijakan Pengembalian Dana</Link></li>
          </ul>
        </section>
        <section className="footer__section">
          <h2 className="footer__h2">Pusat Bantuan</h2>
          <ul className="footer__ul">
            <li><Link to='#' className="footer__link">FAQ</Link></li>
            <li><Link to='#' className="footer__link">Email</Link></li>
            <li><Link to='#' className="footer__link">WhatsApp</Link></li>
          </ul>
        </section>
        <section className="footer__section">
          <h2 className="footer__h2">Social Media</h2>
          <ul className="footer__ul">
            <li><Link to='#' className="footer__link">Facebook</Link></li>
            <li><Link to='#' className="footer__link">Instagram</Link></li>
            <li><Link to='#' className="footer__link">X</Link></li>
          </ul>
        </section>
      </div>
      <p>@{new Date().getFullYear()} TopEase.com All Rights Reserved</p>
    </div>
  )
}