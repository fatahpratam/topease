export const historyOptions = {
  durationOptions: [
    { duration: 1, name: "Hari ini" },
    { duration: 7, name: "Minggu ini" },
    { duration: 30, name: "Bulan ini" },
    { duration: 365, name: "Tahun ini" },
    { duration: "Semua", name: "Semua" }
  ],
  paymentOptions: [
    "Semua", "Menunggu pembayaran", "Lunas", "Dibatalkan", "Jatuh tempo"
  ],
  orderOptions: [
    "Semua", "Dalam pemrosesan", "Sebagian terkirim", "Semua terkirim",
    "Dalam proses pengembalian", "Sebagian dibatalkan", "Semua dibatalkan"
  ]
}