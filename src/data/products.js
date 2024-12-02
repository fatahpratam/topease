export const products = [
  {
    id: "fantasy-quest-123abc",
    name: "Fantasy Quest",
    rating: {
      star: 4.8,
      count: 340,
    },
    currentMonthSold: 1200,
    currentYearSold: 14500,
    imageUrl: "https://via.placeholder.com/150?text=Fantasy+Quest",
    discount: 10,
    type: "game",
    requiredFields: [
      { fieldName: "uid", label: "User ID", type: "text", placeholder: "Enter your UID" },
      { fieldName: "server", label: "Server", type: "text", placeholder: "Enter your server" },
    ],
  },
  {
    id: "battle-of-legends-456def",
    name: "Battle of Legends",
    rating: {
      star: 4.6,
      count: 290,
    },
    currentMonthSold: 950,
    currentYearSold: 11200,
    imageUrl: "https://via.placeholder.com/150?text=Battle+of+Legends",
    discount: 0,
    type: "game",
    requiredFields: [
      { fieldName: "uid", label: "User ID", type: "text", placeholder: "Enter your UID" },
      { fieldName: "server", label: "Server", type: "text", placeholder: "Enter your server" },
    ],
  },
  {
    id: "daily-planner-pro-789ghi",
    name: "Daily Planner Pro",
    rating: {
      star: 4.5,
      count: 150,
    },
    currentMonthSold: 850,
    currentYearSold: 10300,
    imageUrl: "https://via.placeholder.com/150?text=Daily+Planner+Pro",
    discount: 15,
    type: "aplikasi",
    requiredFields: [
      { fieldName: "accountEmail", label: "Email Address", type: "email", placeholder: "Enter your email" },
    ],
  },
  {
    id: "fitness-tracker-321jkl",
    name: "Fitness Tracker",
    rating: {
      star: 4.7,
      count: 190,
    },
    currentMonthSold: 1200,
    currentYearSold: 14500,
    imageUrl: "https://via.placeholder.com/150?text=Fitness+Tracker",
    discount: 0,
    type: "aplikasi",
    requiredFields: [
      { fieldName: "accountEmail", label: "Email Address", type: "email", placeholder: "Enter your email" },
    ],
  },
  {
    id: "gopay-456mno",
    name: "GoPay",
    rating: {
      star: 4.9,
      count: 1500,
    },
    currentMonthSold: 25000,
    currentYearSold: 320000,
    imageUrl: "https://via.placeholder.com/150?text=GoPay",
    discount: 5,
    type: "e-wallet",
    requiredFields: [
      { fieldName: "phoneNumber", label: "Phone Number", type: "tel", placeholder: "Enter your phone number" },
    ],
  },
  {
    id: "ovo-789pqr",
    name: "OVO",
    rating: {
      star: 4.8,
      count: 1400,
    },
    currentMonthSold: 22000,
    currentYearSold: 295000,
    imageUrl: "https://via.placeholder.com/150?text=OVO",
    discount: 0,
    type: "e-wallet",
    requiredFields: [
      { fieldName: "phoneNumber", label: "Phone Number", type: "tel", placeholder: "Enter your phone number" },
    ],
  },
  {
    id: "telkomsel-50k-123stu",
    name: "Telkomsel 50K",
    rating: {
      star: 4.6,
      count: 400,
    },
    currentMonthSold: 1800,
    currentYearSold: 21000,
    imageUrl: "https://via.placeholder.com/150?text=Telkomsel+50K",
    discount: 10,
    type: "pulsa",
    requiredFields: [
      { fieldName: "phoneNumber", label: "Phone Number", type: "tel", placeholder: "Enter your phone number" },
    ],
  },
  {
    id: "indosat-25k-456vwx",
    name: "Indosat 25K",
    rating: {
      star: 4.5,
      count: 350,
    },
    currentMonthSold: 1200,
    currentYearSold: 15000,
    imageUrl: "https://via.placeholder.com/150?text=Indosat+25K",
    discount: 0,
    type: "pulsa",
    requiredFields: [
      { fieldName: "phoneNumber", label: "Phone Number", type: "tel", placeholder: "Enter your phone number" },
    ],
  },
]