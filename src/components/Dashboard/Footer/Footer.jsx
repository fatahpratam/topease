import { Link } from "react-router-dom";
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <section className="footer__section">
          <h2 className="footer__h2">Tentang</h2>
          <p>TopEase adalah platform top-up digital yang memungkinkan pengguna untuk mengisi saldo berbagai layanan seperti game, e-wallet, dan pulsa secara cepat dan mudah.</p>
        </section>
        <section className="footer__section">
          <h2 className="footer__h2">Legal</h2>
          <ul className="footer__ul">
            <li><Link to='/topease/dashboard/privacy-policy' className="footer__link">Kebijakan Privasi</Link></li>
            <li><Link to='/topease/dashboard/terms-and-conditions' className="footer__link">Syarat dan Ketentuan</Link></li>
            <li><Link to='/topease/dashboard/refund-policy' className="footer__link">Kebijakan Pengembalian Dana</Link></li>
          </ul>
        </section>
        <section className="footer__section">
          <h2 className="footer__h2">Pusat Bantuan</h2>
          <ul className="footer__ul">
            <li><Link to='/topease/dashboard/faq' className="footer__link">FAQ</Link></li>
            <li><Link to='mailto:support@topease.com' className="footer__link">Email</Link></li>
            <li><Link to='tel:0812345678' className="footer__link">WhatsApp</Link></li>
          </ul>
        </section>
        <section className="footer__section">
          <h2 className="footer__h2">Social Media</h2>
          <ul className="footer__ul">
            <li><Link to='https://www.facebook.com/topease' className="footer__link" target="_blank">Facebook</Link></li>
            <li><Link to='https://www.instagram.com/topease/' className="footer__link" target="_blank">Instagram</Link></li>
            <li><Link to='https://x.com/topease' className="footer__link" target="_blank">X</Link></li>
          </ul>
        </section>
      </div>
      <p><strong>@{new Date().getFullYear()} TopEase.com All Rights Reserved</strong></p>
    </div>
  )
}