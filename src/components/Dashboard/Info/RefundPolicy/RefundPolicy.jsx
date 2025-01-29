import './RefundPolicy.css';

export default function RefundPolicy() {
  return (
    <div className="refund-policy">
      <div className="refund-policy__container">
        <h2 className="refund-policy__h2">Kebijakan Pengembalian Dana TopEase</h2>
        <p className="refund-policy__p">Terakhir diperbarui: <strong>23 Januari 2025</strong></p>
        <p className="refund-policy__p">TopEase berkomitmen untuk memberikan layanan terbaik kepada pengguna. Kebijakan ini menjelaskan ketentuan pengembalian dana untuk transaksi yang dilakukan di platform kami. Dengan menggunakan layanan kami, Anda dianggap telah memahami dan menyetujui kebijakan ini.</p>
        <ol className="refund-policy__main-ol">
          <li className="refund-policy__main-li">
            <h3 className="refund-policy__h3">Ketentuan Umum</h3>
            <ul className="refund-policy__ul">
              <li className="refund-policy__li">Semua transaksi top-up yang berhasil diproses bersifat final dan tidak dapat dibatalkan.</li>
              <li className="refund-policy__li">Pengembalian dana hanya dapat dilakukan dalam kondisi tertentu sebagaimana diatur dalam kebijakan ini.</li>
            </ul>
          </li>
          <li className="refund-policy__main-li">
            <h3 className="refund-policy__h3">Situasi yang Memenuhi Syarat Pengembalian Dana</h3>
            <p className="refund-policy__p">Pengguna dapat mengajukan permohonan pengembalian dana dalam kondisi berikut:</p>
            <ul className="refund-policy__ul">
              <li className="refund-policy__li"><strong>Transaksi gagal, tetapi saldo telah terpotong</strong>: Jika transaksi tidak berhasil diproses oleh sistem kami tetapi pembayaran telah dilakukan.</li>
              <li className="refund-policy__li"><strong>Kesalahan sistem dari pihak TopEase</strong>: Jika terjadi gangguan teknis dari sistem kami yang menyebabkan pesanan tidak diproses.</li>
              <li className="refund-policy__li"><strong>Produk tidak diterima dalam waktu yang wajar</strong>: Jika setelah batas waktu tertentu produk tidak diterima oleh pengguna dan tidak ada solusi yang dapat diberikan.</li>
              <li className="refund-policy__li"><strong>Pesanan dibatalkan sebelum pembayaran dikonfirmasi</strong>: Jika pengguna membatalkan pesanan sebelum melakukan pembayaran.</li>
            </ul>
          </li>
          <li className="refund-policy__main-li">
            <h3 className="refund-policy__h3">Pengembalian dana tidak dapat dilakukan dalam kondisi berikut:</h3>
            <p className="refund-policy__p">Pengguna dapat mengajukan permohonan pengembalian dana dalam kondisi berikut:</p>
            <ul className="refund-policy__ul">
              <li className="refund-policy__li">Kesalahan pengguna dalam memasukkan informasi akun tujuan atau memilih nominal yang salah.</li>
              <li className="refund-policy__li">Pengguna telah menerima produk tetapi berubah pikiran atau tidak lagi membutuhkannya.</li>
              <li className="refund-policy__li">Penyalahgunaan sistem untuk mendapatkan keuntungan yang tidak sah.</li>
              <li className="refund-policy__li">Permintaan pengembalian dana yang dilakukan setelah jangka waktu yang ditentukan.</li>
            </ul>
          </li>
          <li className="refund-policy__main-li">
            <h3 className="refund-policy__h3">Proses Pengajuan Pengembalian Dana</h3>
            <p className="refund-policy__p">Jika Anda memenuhi syarat untuk pengembalian dana, berikut adalah langkah-langkah yang perlu dilakukan:</p>
            <ul className="refund-policy__ul">
              <li className="refund-policy__li">Hubungi tim dukungan pelanggan kami melalui Email atau WhatsApp dalam waktu maksimal 7 hari setelah transaksi dilakukan.</li>
              <li className="refund-policy__li">Berikan detail transaksi, termasuk bukti pembayaran dan penjelasan terkait masalah yang terjadi.</li>
              <li className="refund-policy__li">Tim kami akan melakukan investigasi dalam waktu 7 hari kerja.</li>
              <li className="refund-policy__li">Jika pengembalian dana disetujui, dana akan dikembalikan ke metode pembayaran asli dalam waktu 7 hari kerja.</li>
            </ul>
          </li>
          <li className="refund-policy__main-li">
            <h3 className="refund-policy__h3">Waktu Pemrosesan Pengembalian Dana</h3>
            <ul className="refund-policy__ul">
              <li className="refund-policy__li">Waktu pemrosesan pengembalian dana dapat bervariasi tergantung pada metode pembayaran yang digunakan.</li>
              <li className="refund-policy__li">Setelah disetujui, dana biasanya dikembalikan dalam waktu 3-7 hari kerja.</li>
              <li className="refund-policy__li">Jika terjadi keterlambatan, pengguna dapat menghubungi penyedia layanan pembayaran terkait untuk informasi lebih lanjut.</li>
            </ul>
          </li>
          <li className="refund-policy__main-li">
            <h3 className="refund-policy__h3">Hubungi Kami</h3>
            <p className="refund-policy__p">Jika Anda memiliki pertanyaan atau ingin mengajukan permohonan pengembalian dana, silakan hubungi kami melalui:</p>
            <ul className="refund-policy__ul">
              <li className="refund-policy__li"><strong>Email</strong>: <a href="mailto:support@topease.com" className="refund-policy__link">support@topease.com</a></li>
              <li className="refund-policy__li"><strong>WhatsApp</strong>: <a href="tel:0812345678" className="refund-policy__link">0812345678</a></li>
            </ul>
            <p className="refund-policy__p">Terima kasih telah menggunakan TopEase!</p>
          </li>
        </ol>
      </div>
    </div>
  )
}