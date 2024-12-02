export const paymentMethods = [
  {
    id: "topease",
    name: "TopEase",
    adminAmount: 0, // Gratis
    imgUrl: "https://via.placeholder.com/150?text=TopEase",
  },
  {
    id: "qris",
    name: "QRIS",
    adminAmount: 1500,
    imgUrl: "https://via.placeholder.com/150?text=QRIS",
  },
  {
    id: "ewallet",
    name: "eWallet",
    adminAmount: null, // Ditentukan oleh sub-metode
    imgUrl: "https://via.placeholder.com/150?text=eWallet",
    subMethods: [
      {
        id: "ewallet-gopay",
        name: "GoPay",
        adminAmount: 1000,
        imgUrl: "https://via.placeholder.com/150?text=GoPay",
      },
      {
        id: "ewallet-ovo",
        name: "OVO",
        adminAmount: 1200,
        imgUrl: "https://via.placeholder.com/150?text=OVO",
      },
      {
        id: "ewallet-dana",
        name: "DANA",
        adminAmount: 1000,
        imgUrl: "https://via.placeholder.com/150?text=DANA",
      },
      {
        id: "ewallet-shopeepay",
        name: "ShopeePay",
        adminAmount: 1500,
        imgUrl: "https://via.placeholder.com/150?text=ShopeePay",
      },
    ],
  },
  {
    id: "mbanking",
    name: "Mobile Banking",
    adminAmount: null, // Ditentukan oleh sub-metode
    imgUrl: "https://via.placeholder.com/150?text=Mobile+Banking",
    subMethods: [
      {
        id: "mbanking-bca",
        name: "BCA Mobile",
        adminAmount: 6500,
        imgUrl: "https://via.placeholder.com/150?text=BCA+Mobile",
      },
      {
        id: "mbanking-bni",
        name: "BNI Mobile",
        adminAmount: 5000,
        imgUrl: "https://via.placeholder.com/150?text=BNI+Mobile",
      },
      {
        id: "mbanking-mandiri",
        name: "Mandiri Mobile",
        adminAmount: 6000,
        imgUrl: "https://via.placeholder.com/150?text=Mandiri+Mobile",
      },
    ],
  },
  {
    id: "bank-transfer",
    name: "Transfer Bank",
    adminAmount: null, // Ditentukan oleh sub-metode
    imgUrl: "https://via.placeholder.com/150?text=Bank+Transfer",
    subMethods: [
      {
        id: "bank-bca",
        name: "Transfer BCA",
        adminAmount: 6500,
        imgUrl: "https://via.placeholder.com/150?text=BCA",
      },
      {
        id: "bank-bni",
        name: "Transfer BNI",
        adminAmount: 5000,
        imgUrl: "https://via.placeholder.com/150?text=BNI",
      },
      {
        id: "bank-bri",
        name: "Transfer BRI",
        adminAmount: 4000,
        imgUrl: "https://via.placeholder.com/150?text=BRI",
      },
      {
        id: "bank-bsi",
        name: "Transfer BSI",
        adminAmount: 6000,
        imgUrl: "https://via.placeholder.com/150?text=BSI",
      },
    ],
  },
  {
    id: "alfamart",
    name: "Alfamart",
    adminAmount: 2500,
    imgUrl: "https://via.placeholder.com/150?text=Alfamart",
  },
];