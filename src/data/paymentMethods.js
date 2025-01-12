export const paymentMethods = [
  {
    id: "topease",
    name: "TopEase",
    adminAmount: 0, // Gratis
    imgUrl: "https://via.assets.so/img.jpg?w=40&h=40&t=Topease",
  },
  {
    id: "qris",
    name: "QRIS",
    adminAmount: 1500,
    imgUrl: "https://via.assets.so/img.jpg?w=40&h=40&t=QRIS",
  },
  {
    id: "ewallet",
    name: "eWallet",
    adminAmount: null, // Ditentukan oleh sub-metode
    imgUrl: "https://via.assets.so/img.jpg?w=40&h=40&t=eWallet",
    subMethods: [
      {
        id: "ewallet-gopay",
        name: "GoPay",
        adminAmount: 1000,
        imgUrl: "https://via.assets.so/img.jpg?w=40&h=40&t=GoPay",
      },
      {
        id: "ewallet-ovo",
        name: "OVO",
        adminAmount: 1200,
        imgUrl: "https://via.assets.so/img.jpg?w=40&h=40&t=OVO",
      },
      {
        id: "ewallet-dana",
        name: "DANA",
        adminAmount: 1000,
        imgUrl: "https://via.assets.so/img.jpg?w=40&h=40&t=DANA",
      },
      {
        id: "ewallet-shopeepay",
        name: "ShopeePay",
        adminAmount: 1500,
        imgUrl: "https://via.assets.so/img.jpg?w=40&h=40&t=ShopeePay",
      },
    ],
  },
  {
    id: "mbanking",
    name: "Mobile Banking",
    adminAmount: null, // Ditentukan oleh sub-metode
    imgUrl: "https://via.assets.so/img.jpg?w=40&h=40&t=Mobile+Banking",
    subMethods: [
      {
        id: "mbanking-bca",
        name: "BCA Mobile",
        adminAmount: 6500,
        imgUrl: "https://via.assets.so/img.jpg?w=40&h=40&t=BCA+Mobile",
      },
      {
        id: "mbanking-bni",
        name: "BNI Mobile",
        adminAmount: 5000,
        imgUrl: "https://via.assets.so/img.jpg?w=40&h=40&t=BNI+Mobile",
      },
      {
        id: "mbanking-mandiri",
        name: "Mandiri Mobile",
        adminAmount: 6000,
        imgUrl: "https://via.assets.so/img.jpg?w=40&h=40&t=Mandiri+Mobile",
      },
    ],
  },
  {
    id: "bank-transfer",
    name: "Transfer Bank",
    adminAmount: null, // Ditentukan oleh sub-metode
    imgUrl: "https://via.assets.so/img.jpg?w=40&h=40&t=Bank+Transfer",
    subMethods: [
      {
        id: "bank-bca",
        name: "Transfer BCA",
        adminAmount: 6500,
        imgUrl: "https://via.assets.so/img.jpg?w=40&h=40&t=BCA",
      },
      {
        id: "bank-bni",
        name: "Transfer BNI",
        adminAmount: 5000,
        imgUrl: "https://via.assets.so/img.jpg?w=40&h=40&t=BNI",
      },
      {
        id: "bank-bri",
        name: "Transfer BRI",
        adminAmount: 4000,
        imgUrl: "https://via.assets.so/img.jpg?w=40&h=40&t=BRI",
      },
      {
        id: "bank-bsi",
        name: "Transfer BSI",
        adminAmount: 6000,
        imgUrl: "https://via.assets.so/img.jpg?w=40&h=40&t=BSI",
      },
    ],
  },
  {
    id: "alfamart",
    name: "Alfamart",
    adminAmount: 2500,
    imgUrl: "https://via.assets.so/img.jpg?w=40&h=40&t=Alfamart",
  },
];