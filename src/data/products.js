export const products = [
  {
    id: "fantasy-quest-123abc",
    name: "Fantasy Quest",
    description: 'Fantasy Quest adalah game petualangan epik yang membawa pemain ke dunia fantasi penuh keajaiban. Kumpulkan pahlawan, hadapi musuh tangguh, dan selesaikan berbagai misi seru untuk meningkatkan level karakter. Dapatkan mata uang dalam game untuk membuka item eksklusif dan meningkatkan pengalaman bermain!',
    rating: {
      star: 4.8,
      count: 340,
    },
    currentMonthSold: 1200,
    currentYearSold: 14500,
    imgUrl: "https://via.assets.so/img.jpg?w=150&h=150&tc=whitesmoke&bg=%23232328&t=Fantast+Quest",
    discount: 10,
    type: "game",
    requiredFields: [
      { fieldName: "uid", label: "User ID", type: "text", placeholder: "Masukkan UID Anda" },
      { fieldName: "server", label: "Server", type: "text", placeholder: "Masukkan server akun Anda" },
    ],
    nominalOptions: [
      { id: "fq-100-123abc", name: "100 Crystals", amount: 100, idrAmount: 15000, adminAmount: 1000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=100" },
      { id: "fq-300-123abc", name: "300 Crystals", amount: 300, idrAmount: 45000, adminAmount: 1500, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=300" },
      { id: "fq-500-123abc", name: "500 Crystals", amount: 500, idrAmount: 75000, adminAmount: 2000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=500" },
      { id: "fq-1000-123abc", name: "1000 Crystals", amount: 1000, idrAmount: 150000, adminAmount: 2500, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=1000" },
      { id: "fq-2000-123abc", name: "2000 Crystals", amount: 2000, idrAmount: 300000, adminAmount: 3000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=2000" },
      { id: "fq-5000-123abc", name: "5000 Crystals", amount: 5000, idrAmount: 750000, adminAmount: 5000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=5000" },
    ],
  },
  {
    id: "battle-of-legends-456def",
    name: "Battle of Legends",
    description: 'Masuki medan pertempuran dalam Battle of Legends, game strategi real-time di mana Anda dapat mengendalikan pasukan legendaris dan bertarung melawan pemain lain secara online. Kembangkan strategi terbaik, kumpulkan hero unik, dan taklukkan lawan untuk menjadi legenda sejati!',
    rating: {
      star: 4.6,
      count: 290,
    },
    currentMonthSold: 950,
    currentYearSold: 11200,
    imgUrl: "https://via.assets.so/img.jpg?w=150&h=150&tc=whitesmoke&bg=%23232328&t=Battle+of+Legends",
    discount: 0,
    type: "game",
    requiredFields: [
      { fieldName: "uid", label: "User ID", type: "text", placeholder: "Masukkan UID Anda" },
      { fieldName: "server", label: "Server", type: "text", placeholder: "Masukkan server akun Anda" },
    ],
    nominalOptions: [
      { id: "bol-50-456def", name: "50 Diamonds", amount: 50, idrAmount: 10000, adminAmount: 1000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=50" },
      { id: "bol-150-456def", name: "150 Diamonds", amount: 150, idrAmount: 30000, adminAmount: 1500, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=150" },
      { id: "bol-300-456def", name: "300 Diamonds", amount: 300, idrAmount: 60000, adminAmount: 2000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=300" },
      { id: "bol-500-456def", name: "500 Diamonds", amount: 500, idrAmount: 100000, adminAmount: 2500, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=500" },
      { id: "bol-1000-456def", name: "1000 Diamonds", amount: 1000, idrAmount: 200000, adminAmount: 3000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=1000" },
      { id: "bol-2000-456def", name: "2000 Diamonds", amount: 2000, idrAmount: 400000, adminAmount: 5000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=2000" },
    ],
  },
  {
    id: "daily-planner-pro-789ghi",
    name: "Daily Planner Pro",
    description: 'Daily Planner Pro adalah aplikasi perencana harian yang membantu Anda mengatur jadwal dengan mudah. Buat daftar tugas, atur pengingat, dan tingkatkan produktivitas dengan fitur manajemen waktu yang canggih. Cocok untuk profesional, mahasiswa, dan siapa saja yang ingin tetap terorganisir!',
    rating: {
      star: 4.5,
      count: 150,
    },
    currentMonthSold: 850,
    currentYearSold: 10300,
    imgUrl: "https://via.assets.so/img.jpg?w=150&h=150&tc=whitesmoke&bg=%23232328&t=Daily+Planner+Pro",
    discount: 15,
    type: "aplikasi",
    requiredFields: [
      { fieldName: "accountEmail", label: "Email Address", type: "email", placeholder: "Masukkan email akun Anda" },
    ],
    nominalOptions: [
      { id: "dpp-month-789ghi", name: "Monthly Plan", amount: 1, idrAmount: 30000, adminAmount: 1000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=Monthly" },
      { id: "dpp-quarter-789ghi", name: "Quarterly Plan", amount: 3, idrAmount: 80000, adminAmount: 1500, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=Quarterly" },
      { id: "dpp-annual-789ghi", name: "Annual Plan", amount: 12, idrAmount: 300000, adminAmount: 3000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=Annual" },
    ],
  },
  {
    id: "fitness-tracker-321jkl",
    name: "Fitness Tracker",
    description: 'Pantau kesehatan dan kebugaran Anda dengan Fitness Tracker! Aplikasi ini membantu Anda mencatat aktivitas harian, menghitung jumlah langkah, melacak kalori, serta memberikan rekomendasi latihan yang sesuai dengan tujuan Anda. Dapatkan gaya hidup lebih sehat dengan Fitness Tracker!',
    rating: {
      star: 4.7,
      count: 190,
    },
    currentMonthSold: 1200,
    currentYearSold: 14500,
    imgUrl: "https://via.assets.so/img.jpg?w=150&h=150&tc=whitesmoke&bg=%23232328&t=Fitness+Tracker",
    discount: 0,
    type: "aplikasi",
    requiredFields: [
      { fieldName: "accountEmail", label: "Email Address", type: "email", placeholder: "Masukkan email akun Anda" },
    ],
    nominalOptions: [
      { id: "ft-month-321jkl", name: "Monthly Plan", amount: 1, idrAmount: 50000, adminAmount: 1500, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=Monthly" },
      { id: "ft-quarter-321jkl", name: "Quarterly Plan", amount: 3, idrAmount: 140000, adminAmount: 2000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=Quarterly" },
      { id: "ft-annual-321jkl", name: "Annual Plan", amount: 12, idrAmount: 500000, adminAmount: 5000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=Annual" },
    ],
  },
  {
    id: "gopay-456mno",
    name: "GoPay",
    description: 'GoPay adalah dompet digital serbaguna yang memudahkan transaksi online dan offline. Gunakan GoPay untuk pembayaran di berbagai merchant, isi saldo dengan mudah, serta nikmati promo eksklusif yang menguntungkan!',
    rating: {
      star: 4.9,
      count: 1500,
    },
    currentMonthSold: 25000,
    currentYearSold: 320000,
    imgUrl: "https://via.assets.so/img.jpg?w=150&h=150&tc=whitesmoke&bg=%23232328&t=GoPay",
    discount: 5,
    type: "e-wallet",
    requiredFields: [
      { fieldName: "phoneNumber", label: "Phone Number", type: "tel", placeholder: "Masukkan nomor HP Anda" },
    ],
    nominalOptions: [
      { id: "gopay-10k", name: "GoPay 10k", amount: 10000, idrAmount: 10000, adminAmount: 1000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=10k" },
      { id: "gopay-20k", name: "GoPay 20k", amount: 20000, idrAmount: 20000, adminAmount: 1000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=20k" },
      { id: "gopay-50k", name: "GoPay 50k", amount: 50000, idrAmount: 50000, adminAmount: 1500, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=50k" },
      { id: "gopay-100k", name: "GoPay 100k", amount: 100000, idrAmount: 100000, adminAmount: 1500, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=100k" },
      { id: "gopay-200k", name: "GoPay 200k", amount: 200000, idrAmount: 200000, adminAmount: 2000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=200k" },
      { id: "gopay-500k", name: "GoPay 500k", amount: 500000, idrAmount: 500000, adminAmount: 2500, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=500k" },
    ],
  },
  {
    id: "ovo-789pqr",
    name: "OVO",
    description: 'Dengan OVO, pengalaman transaksi menjadi lebih praktis dan aman! Top-up saldo, bayar tagihan, dan nikmati berbagai promo menarik. OVO juga menyediakan cashback dan reward bagi pengguna setia!',
    rating: {
      star: 4.8,
      count: 1400,
    },
    currentMonthSold: 22000,
    currentYearSold: 295000,
    imgUrl: "https://via.assets.so/img.jpg?w=150&h=150&tc=whitesmoke&bg=%23232328&t=OVO",
    discount: 0,
    type: "e-wallet",
    requiredFields: [
      { fieldName: "phoneNumber", label: "Phone Number", type: "tel", placeholder: "Masukkan nomor HP Anda" },
    ],
    nominalOptions: [
      { id: "ovo-10k", name: "OVO 10k", amount: 10000, idrAmount: 10000, adminAmount: 1200, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=10k" },
      { id: "ovo-20k", name: "OVO 20k", amount: 20000, idrAmount: 20000, adminAmount: 1200, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=20k" },
      { id: "ovo-50k", name: "OVO 50k", amount: 50000, idrAmount: 50000, adminAmount: 1500, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=50k" },
      { id: "ovo-100k", name: "OVO 100k", amount: 100000, idrAmount: 100000, adminAmount: 1500, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=100k" },
      { id: "ovo-200k", name: "OVO 200k", amount: 200000, idrAmount: 200000, adminAmount: 2000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=200k" },
      { id: "ovo-500k", name: "OVO 500k", amount: 500000, idrAmount: 500000, adminAmount: 2500, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=500k" },
    ],
  },
  {
    id: "telkomsel-50k-123stu",
    name: "Telkomsel 50K",
    description: 'Isi ulang pulsa Telkomsel 50K dengan cepat dan mudah melalui TopEase. Nikmati jaringan berkualitas tinggi untuk panggilan, SMS, dan internet di mana saja tanpa ribet!',
    rating: {
      star: 4.6,
      count: 400,
    },
    currentMonthSold: 1800,
    currentYearSold: 21000,
    imgUrl: "https://via.assets.so/img.jpg?w=150&h=150&tc=whitesmoke&bg=%23232328&t=Telkomsel+50K",
    discount: 10,
    type: "pulsa",
    requiredFields: [
      { fieldName: "phoneNumber", label: "Phone Number", type: "tel", placeholder: "Masukkan nomor HP Anda" },
    ],
    nominalOptions: [
      { id: "telkomsel-5k", name: "Pulsa Telkomsel 5k", amount: 5000, idrAmount: 5000, adminAmount: 500, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=5k" },
      { id: "telkomsel-10k", name: "Pulsa Telkomsel 10k", amount: 10000, idrAmount: 10000, adminAmount: 1000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=10k" },
      { id: "telkomsel-25k", name: "Pulsa Telkomsel 25k", amount: 25000, idrAmount: 25000, adminAmount: 1500, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=25k" },
      { id: "telkomsel-50k", name: "Pulsa Telkomsel 50k", amount: 50000, idrAmount: 50000, adminAmount: 1500, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=50k" },
      { id: "telkomsel-100k", name: "Pulsa Telkomsel 100k", amount: 100000, idrAmount: 100000, adminAmount: 2000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=100k" },
    ],
  },
  {
    id: "indosat-25k-456vwx",
    name: "Indosat 25K",
    description: 'Dapatkan pulsa Indosat 25K dengan harga terbaik! Gunakan untuk kebutuhan komunikasi, paket data, dan layanan lainnya dengan koneksi yang stabil dan cepat.',
    rating: {
      star: 4.5,
      count: 350,
    },
    currentMonthSold: 1200,
    currentYearSold: 15000,
    imgUrl: "https://via.assets.so/img.jpg?w=150&h=150&tc=whitesmoke&bg=%23232328&t=Indosat+25K",
    discount: 0,
    type: "pulsa",
    requiredFields: [
      { fieldName: "phoneNumber", label: "Phone Number", type: "tel", placeholder: "Masukkan nomor HP Anda" },
    ],
    nominalOptions: [
      { id: "indosat-5k", name: "Pulsa Indosat 5k", amount: 5000, idrAmount: 5000, adminAmount: 500, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=5k" },
      { id: "indosat-10k", name: "Pulsa Indosat 10k", amount: 10000, idrAmount: 10000, adminAmount: 1000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=10k" },
      { id: "indosat-25k", name: "Pulsa Indosat 25k", amount: 25000, idrAmount: 25000, adminAmount: 1500, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=25k" },
      { id: "indosat-50k", name: "Pulsa Indosat 50k", amount: 50000, idrAmount: 50000, adminAmount: 1500, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=50k" },
      { id: "indosat-100k", name: "Pulsa Indosat 100k", amount: 100000, idrAmount: 100000, adminAmount: 2000, imgUrl: "https://via.assets.so/img.jpg?w=64&h=64&t=100k" },
    ],
  },
]