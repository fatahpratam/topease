import './FAQ.css';
import { Link } from 'react-router-dom';

export default function FAQ() {
  return (
    <div className="faq">
      <div className="faq__container">
        <h2 className="faq__h2">Pertanyaan yang Sering Diajukan (FAQ) TopEase</h2>
        <p className="faq__p">Terakhir diperbarui: <strong>24 Januari 2025</strong></p>
        <p className="faq__p">Selamat datang di halaman FAQ TopEase! Berikut adalah beberapa pertanyaan yang sering diajukan oleh pengguna beserta jawabannya. Jika Anda tidak menemukan jawaban yang Anda cari, jangan ragu untuk menghubungi tim dukungan kami.</p>
        <ol className="faq__main-ol">
          <li className="faq__main-li">
            <h3 className="faq__h3">Apa itu TopEase?</h3>
            <p className="faq__p">TopEase adalah platform top-up digital yang memungkinkan pengguna untuk mengisi saldo berbagai layanan seperti game, e-wallet, dan pulsa secara cepat dan mudah.</p>
          </li>
          <li className="faq__main-li">
            <h3 className="faq__h3">Bagaimana cara melakukan pembelian di TopEase?</h3>
            <p className="faq__p">Untuk melakukan pembelian, ikuti langkah-langkah berikut:</p>
            <ul className="faq__ul">
              <li className="faq__li">Pilih produk yang ingin dibeli.</li>
              <li className="faq__li">Masukkan informasi akun tujuan.</li>
              <li className="faq__li">Pilih nominal yang diinginkan.</li>
              <li className="faq__li">Masukkan produk ke dalam keranjang.</li>
              <li className="faq__li">Pilih metode pembayaran.</li>
              <li className="faq__li">Selesaikan pembayaran dan tunggu pesanan diproses.</li>
            </ul>
          </li>
          <li className="faq__main-li">
            <h3 className="faq__h3">Metode pembayaran apa saja yang tersedia?</h3>
            <p className="faq__p">TopEase menyediakan berbagai metode pembayaran, termasuk:</p>
            <ul className="faq__ul">
              <li className="faq__li">TopEase</li>
              <li className="faq__li">QRIS</li>
              <li className="faq__li">E-wallet (seperti Dana, OVO, GoPay, dll.)</li>
              <li className="faq__li">Transfer bank</li>
              <li className="faq__li">Alfamart</li>
            </ul>
          </li>
          <li className="faq__main-li">
            <h3 className="faq__h3">Berapa lama waktu pemrosesan pesanan?</h3>
            <p className="faq__p">Sebagian besar pesanan diproses secara otomatis dan akan selesai dalam beberapa menit setelah pembayaran dikonfirmasi. Namun, dalam beberapa kasus tertentu, pemrosesan bisa memakan waktu lebih lama karena kendala teknis atau gangguan dari pihak penyedia layanan.</p>
          </li>
          <li className="faq__main-li">
            <h3 className="faq__h3">Saya sudah membayar tetapi belum menerima produk. Apa yang harus saya lakukan?</h3>
            <p className="faq__p">Jika Anda sudah melakukan pembayaran tetapi belum menerima produk, lakukan langkah-langkah berikut:</p>
            <ul className="faq__ul">
              <li className="faq__li">Periksa kembali status pesanan di halaman <Link to={'/dashboard/history'} className="faq__link">Riwayat</Link>.</li>
              <li className="faq__li">Pastikan pembayaran telah berhasil dan sesuai dengan nominal yang ditentukan.</li>
              <li className="faq__li">Jika pesanan masih belum diproses setelah waktu yang ditentukan, silakan hubungi tim dukungan kami melalui <Link to="mailto:support@topease.com" className="faq__link">Email</Link> atau <Link to="tel:0812345678" className="faq__link">WhatsApp</Link>.</li>
            </ul>
          </li>
          <li className="faq__main-li">
            <h3 className="faq__h3">Apakah saya bisa membatalkan pesanan setelah pembayaran?</h3>
            <p className="faq__p">Pesanan yang sudah dibayar umumnya tidak dapat dibatalkan, kecuali dalam kondisi tertentu seperti transaksi gagal atau kesalahan dari sistem TopEase. Silakan merujuk ke <Link to={'/dashboard/refund-policy'} className="faq__link">Kebijakan Pengembalian Dana</Link> untuk informasi lebih lanjut.</p>
          </li>
          <li className="faq__main-li">
            <h3 className="faq__h3">Bagaimana cara melihat riwayat transaksi saya?</h3>
            <p className="faq__p">Untuk melihat riwayat transaksi, ikuti langkah-langkah berikut:</p>
            <ul className="faq__ul">
              <li className="faq__li">Pastikan Anda sudah login ke akun TopEase.</li>
              <li className="faq__li">Klik ikon <strong>Akun</strong> di bagian atas halaman.</li>
              <li className="faq__li">Pilih <Link to={'/dashboard/history'} className="faq__link">Riwayat</Link> untuk melihat daftar transaksi Anda.</li>
            </ul>
          </li>
          <li className="faq__main-li">
            <h3 className="faq__h3">Bagaimana jika saya lupa kata sandi akun saya?</h3>
            <p className="faq__p">Jika Anda lupa kata sandi, ikuti langkah-langkah berikut:</p>
            <ul className="faq__ul">
              <li className="faq__li">Klik tombol <Link to={'/login'} className="faq__link">Masuk</Link> di halaman utama.</li>
              <li className="faq__li">Pilih opsi <strong>Lupa Kata Sandi</strong>.</li>
              <li className="faq__li">Masukkan nomor WhatsApp yang terdaftar.</li>
              <li className="faq__li">Ikuti instruksi untuk mengatur ulang kata sandi Anda.</li>
            </ul>
          </li>
          <li className="faq__main-li">
            <h3 className="faq__h3">Apakah saya bisa mengubah informasi akun saya?</h3>
            <p className="faq__p">Ya, Anda bisa mengubah informasi akun seperti nama, nomor WhatsApp, dan kata sandi melalui halaman <Link to={'/dashboard/setting'} className="faq__link">Pengaturan</Link>.</p>
          </li>
          <li className="faq__main-li">
            <h3 className="faq__h3">Bagaimana cara menghubungi tim dukungan TopEase?</h3>
            <p className="faq__p">Jika Anda memiliki pertanyaan atau kendala, silakan hubungi kami melalui:</p>
            <ul className="faq__ul">
              <li className="faq__li"><strong>Email</strong>: <Link to="mailto:support@topease.com" className="faq__link">support@topease.com</Link></li>
              <li className="faq__li"><strong>WhatsApp</strong>: <Link to="tel:0812345678" className="faq__link">0812345678</Link></li>
            </ul>
            <p className="faq__p">Terima kasih telah menggunakan TopEase! Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami. 😊</p>
          </li>
        </ol>
      </div>
    </div>
  )
}