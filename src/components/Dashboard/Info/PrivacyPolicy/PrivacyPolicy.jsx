import './PrivacyPolicy.css';
import { Link } from 'react-router-dom';


export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy">
      <div className="privacy-policy__container">
        <h2 className="privacy-policy__h2">Kebijakan Privasi TopEase</h2>
        <p className="privacy-policy__p">Terakhir diperbarui: <strong>21 Januari 2025</strong></p>
        <p className="privacy-policy__p">Selamat datang di TopEase! Kami menghargai privasi Anda dan berkomitmen untuk melindungi informasi pribadi yang Anda berikan kepada kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan melindungi informasi pribadi Anda saat menggunakan layanan kami.</p>
        <ol className="privacy-policy__main-ol">
          <li className="privacy-policy__main-li">
            <h3 className="privacy-policy__h3">Informasi yang Kami Kumpulkan</h3>
            <p className="privacy-policy__p">Kami mengumpulkan beberapa jenis informasi untuk memberikan dan meningkatkan layanan kami, termasuk tetapi tidak terbatas pada:</p>
            <ol className="privacy-policy__ol">
              <li className="privacy-policy__li">
                <p className="privacy-policy__p--bold">Informasi yang Anda Berikan Langsung</p>
                <ul className="privacy-policy__ul">
                  <li className="privacy-policy__li">Nama</li>
                  <li className="privacy-policy__li">Nomor WhatsApp</li>
                  <li className="privacy-policy__li">Kata sandi akun</li>
                  <li className="privacy-policy__li">Informasi pembayaran</li>
                  <li className="privacy-policy__li">Informasi akun tujuan untuk transaksi top-up</li>
                </ul>
              </li>
              <li className="privacy-policy__li">
                <p className="privacy-policy__p--bold">Informasi yang Dikumpulkan Secara Otomatis</p>
                <ul className="privacy-policy__ul">
                  <li className="privacy-policy__li">Alamat IP</li>
                  <li className="privacy-policy__li">Jenis perangkat dan browser</li>
                  <li className="privacy-policy__li">Kata sandi akun</li>
                  <li className="privacy-policy__li">Aktivitas di dalam aplikasi (seperti pencarian dan riwayat transaksi)</li>
                </ul>
              </li>
              <li className="privacy-policy__li">
                <p className="privacy-policy__p--bold">Informasi dari Pihak Ketiga</p>
                <p className="privacy-policy__p">Kami dapat menerima informasi dari layanan pihak ketiga yang Anda gunakan untuk login atau pembayaran.</p>
              </li>
            </ol>
          </li>
          <li className="privacy-policy__main-li">
            <h3 className="privacy-policy__h3">Bagaimana Kami Menggunakan Informasi Anda</h3>
            <p className="privacy-policy__p">Informasi yang kami kumpulkan digunakan untuk:</p>
            <ul className="privacy-policy__ul">
              <li className="privacy-policy__li">Memproses transaksi top-up Anda.</li>
              <li className="privacy-policy__li">Mengelola akun dan memberikan layanan pelanggan.</li>
              <li className="privacy-policy__li">Mengirimkan notifikasi terkait transaksi dan akun Anda.</li>
              <li className="privacy-policy__li">Menganalisis dan meningkatkan layanan kami.</li>
              <li className="privacy-policy__li">Menyediakan keamanan dan mencegah aktivitas mencurigakan atau penipuan.</li>
            </ul>
          </li>
          <li className="privacy-policy__main-li">
            <h3 className="privacy-policy__h3">Berbagi Informasi Anda</h3>
            <p className="privacy-policy__p">Kami tidak menjual atau menyewakan informasi pribadi Anda. Namun, kami dapat membagikan informasi Anda dengan:</p>
            <ul className="privacy-policy__ul">
              <li className="privacy-policy__li"><strong>Penyedia layanan pembayaran</strong> untuk memproses transaksi.</li>
              <li className="privacy-policy__li"><strong>Pihak berwenang</strong>, jika diwajibkan oleh hukum.</li>
              <li className="privacy-policy__li"><strong>Pihak ketiga</strong>, dengan persetujuan Anda atau jika diperlukan untuk menyediakan layanan yang Anda minta.</li>
            </ul>
          </li>
          <li className="privacy-policy__main-li">
            <h3 className="privacy-policy__h3">Keamanan Informasi</h3>
            <p className="privacy-policy__p">Kami mengambil langkah-langkah keamanan yang wajar untuk melindungi informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Namun, tidak ada sistem yang sepenuhnya aman, dan kami tidak dapat menjamin keamanan absolut.</p>
          </li>
          <li className="privacy-policy__main-li">
            <h3 className="privacy-policy__h3">Hak Pengguna</h3>
            <p className="privacy-policy__p">Anda memiliki hak untuk:</p>
            <ul className="privacy-policy__ul">
              <li className="privacy-policy__li">Mengakses, mengubah, atau menghapus informasi akun Anda.</li>
              <li className="privacy-policy__li">Menolak atau menarik persetujuan atas pengumpulan data tertentu.</li>
              <li className="privacy-policy__li">Meminta salinan data yang kami simpan tentang Anda.</li>
            </ul>
            <p className="privacy-policy__p">Untuk menggunakan hak-hak ini, Anda dapat menghubungi kami melalui pusat bantuan kami.</p>
          </li>
          <li className="privacy-policy__main-li">
            <h3 className="privacy-policy__h3">Penyimpanan dan Penghapusan Data</h3>
            <p className="privacy-policy__p">Kami menyimpan informasi Anda selama akun Anda aktif atau sesuai dengan kebutuhan untuk mematuhi kewajiban hukum. Jika Anda menghapus akun Anda, kami akan menghapus informasi pribadi Anda, kecuali jika diperlukan oleh hukum.</p>
          </li>
          <li className="privacy-policy__main-li">
            <h3 className="privacy-policy__h3">Perubahan Kebijakan Privasi</h3>
            <p className="privacy-policy__p">Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Jika ada perubahan signifikan, kami akan memberi tahu Anda melalui email atau pemberitahuan di aplikasi.</p>
          </li>
          <li className="privacy-policy__main-li">
            <h3 className="privacy-policy__h3">Hubungi Kami</h3>
            <p className="privacy-policy__p">Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, Anda dapat menghubungi kami melalui:</p>
            <ul className="privacy-policy__ul">
              <li className="privacy-policy__li"><strong>Email</strong>: <Link to="mailto:support@topease.com" className="privacy-policy__link">support@topease.com</Link></li>
              <li className="privacy-policy__li"><strong>WhatsApp</strong>: <Link to="tel:0812345678" className="privacy-policy__link">0812345678</Link></li>
            </ul>
            <p className="privacy-policy__p">Terima kasih telah menggunakan TopEase!</p>
          </li>
        </ol>
      </div>
    </div>
  );
}