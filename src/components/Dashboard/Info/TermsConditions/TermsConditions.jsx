import './TermsConditions.css';
import { Link } from 'react-router-dom';

export default function TermsConditions() {
  return (
    <div className="terms-conditions">
      <div className="terms-conditions__container">
        <h2 className="terms-conditions__h2">Syarat dan Ketentuan TopEase</h2>
        <p className="terms-conditions__p">Terakhir diperbarui: <strong>22 Januari 2025</strong></p>
        <p className="terms-conditions__p">Selamat datang di TopEase! Dengan mengakses dan menggunakan layanan kami, Anda setuju untuk mematuhi Syarat dan Ketentuan berikut. Jika Anda tidak setuju dengan ketentuan ini, harap tidak menggunakan layanan kami.</p>
        <ol className="terms-conditions__main-ol">
          <li className="terms-conditions__main-li">
            <h3 className="terms-conditions__h3">Ketentuan Umum</h3>
            <ul className="terms-conditions__ul">
              <li className="terms-conditions__li">TopEase adalah platform yang menyediakan layanan top-up untuk berbagai layanan digital.</li>
              <li className="terms-conditions__li">Anda harus berusia minimal 17 tahun atau memiliki izin dari orang tua/wali untuk menggunakan layanan ini.</li>
              <li className="terms-conditions__li">Kami berhak mengubah Syarat dan Ketentuan ini kapan saja, dan perubahan akan diberitahukan melalui platform kami.</li>
            </ul>
          </li>
          <li className="terms-conditions__main-li">
            <h3 className="terms-conditions__h3">Akun Pengguna</h3>
            <ul className="terms-conditions__ul">
              <li className="terms-conditions__li">Anda diwajibkan untuk mendaftar akun dengan informasi yang akurat dan terkini.</li>
              <li className="terms-conditions__li">Anda bertanggung jawab untuk menjaga keamanan akun dan kata sandi Anda.</li>
              <li className="terms-conditions__li">Kami berhak menangguhkan atau menghapus akun Anda jika ditemukan aktivitas mencurigakan atau pelanggaran terhadap kebijakan kami.</li>
            </ul>
          </li>
          <li className="terms-conditions__main-li">
            <h3 className="terms-conditions__h3">Penggunaan Layanan</h3>
            <ul className="terms-conditions__ul">
              <li className="terms-conditions__li">Layanan TopEase hanya boleh digunakan untuk keperluan yang sah dan sesuai hukum.</li>
              <li className="terms-conditions__li">Dilarang menggunakan layanan kami untuk aktivitas ilegal, penipuan, atau pelanggaran hak pihak lain.</li>
              <li className="terms-conditions__li">Kami berhak menolak atau membatalkan transaksi jika terdapat indikasi penyalahgunaan.</li>
            </ul>
          </li>
          <li className="terms-conditions__main-li">
            <h3 className="terms-conditions__h3">Transaksi dan Pembayaran</h3>
            <ul className="terms-conditions__ul">
              <li className="terms-conditions__li">Semua transaksi top-up bersifat final dan tidak dapat dibatalkan setelah pembayaran dikonfirmasi.</li>
              <li className="terms-conditions__li">Kami tidak bertanggung jawab atas kesalahan input informasi oleh pengguna yang menyebabkan transaksi gagal atau salah kirim.</li>
              <li className="terms-conditions__li">Jika terjadi kesalahan dalam sistem kami, pengguna dapat menghubungi layanan bantuan untuk penyelesaian lebih lanjut.</li>
            </ul>
          </li>
          <li className="terms-conditions__main-li">
            <h3 className="terms-conditions__h3">Pembatalan dan Pengembalian Dana</h3>
            <ul className="terms-conditions__ul">
              <li className="terms-conditions__li">Pembatalan pesanan hanya dapat dilakukan jika pembayaran belum dikonfirmasi.</li>
              <li className="terms-conditions__li">Pengembalian dana akan diproses sesuai dengan kebijakan <Link to="/dashboard/refund-policy" className="terms-conditions__link">Kebijakan Pengembalian Dana</Link> kami.</li>
            </ul>
          </li>
          <li className="terms-conditions__main-li">
            <h3 className="terms-conditions__h3">Hak dan Kewajiban Pengguna</h3>
            <ul className="terms-conditions__ul">
              <li className="terms-conditions__li">Pengguna bertanggung jawab atas informasi yang diberikan dan konsekuensi dari penggunaannya.</li>
              <li className="terms-conditions__li">Pengguna tidak boleh mencoba mengakses sistem kami tanpa izin atau melakukan tindakan yang dapat merugikan layanan kami.</li>
            </ul>
          </li>
          <li className="terms-conditions__main-li">
            <h3 className="terms-conditions__h3">Pembatasan Tanggung Jawab</h3>
            <ul className="terms-conditions__ul">
              <li className="terms-conditions__li">Kami tidak bertanggung jawab atas kerugian akibat kesalahan pengguna dalam menggunakan layanan ini.</li>
              <li className="terms-conditions__li">Layanan ini diberikan sebagaimana adanya tanpa jaminan tertentu.</li>
              <li className="terms-conditions__li">Kami tidak bertanggung jawab atas gangguan layanan yang diakibatkan oleh pihak ketiga, seperti penyedia jaringan atau sistem pembayaran.</li>
            </ul>
          </li>
          <li className="terms-conditions__main-li">
            <h3 className="terms-conditions__h3">Perubahan dan Penghentian Layanan</h3>
            <ul className="terms-conditions__ul">
              <li className="terms-conditions__li">Kami dapat mengubah atau menghentikan layanan kapan saja tanpa pemberitahuan sebelumnya.</li>
              <li className="terms-conditions__li">Jika layanan dihentikan, kami akan berupaya menyelesaikan transaksi yang masih berjalan atau memberikan informasi terkait proses lebih lanjut.</li>
            </ul>
          </li>
          <li className="terms-conditions__main-li">
            <h3 className="terms-conditions__h3">Hukum yang Berlaku</h3>
            <p className="terms-conditions__p">Syarat dan Ketentuan ini tunduk pada hukum yang berlaku di Indonesia.</p>
          </li>
          <li className="terms-conditions__main-li">
            <h3 className="terms-conditions__h3">Hubungi Kami</h3>
            <p className="terms-conditions__p">Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, Anda dapat menghubungi kami melalui:</p>
            <ul className="terms-conditions__ul">
              <li className="terms-conditions__li"><strong>Email</strong>: <Link to="mailto:support@topease.com" className="terms-conditions__link">support@topease.com</Link></li>
              <li className="terms-conditions__li"><strong>WhatsApp</strong>: <Link to="tel:0812345678" className="terms-conditions__link">0812345678</Link></li>
            </ul>
            <p className="terms-conditions__p">Terima kasih telah menggunakan TopEase!</p>
          </li>
        </ol>
      </div>
    </div>
  )
}