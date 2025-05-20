const products = [
  {
    id: 1,
    name: "Apple Watch",
    price: 100,
    description: "Apple Watch",
    category: "Electronics",
  },
  {
    id: 2,
    name: "JBL Speaker",
    price: 200,
    description: "JBL Speaker",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Samsung S22",
    price: 300,
    description: "Samsung S22",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Iphone 15",
    price: 400,
    description: "Iphone 15",
    category: "Electronics",
  },
  {
    id: 5,
    name: "Zara T-shirt",
    price: 500,
    description: 'Zara"s T-shirt',
    category: "Clothing",
  },
];

// Hard-coded demo users for authentication
const users = [
  {
    username: "admin@gmail.com",
    password: "admin123",
    name: "Alice Admin",
    role: "admin",
  },
  {
    username: "john@gmail.com",
    password: "john123",
    name: "John Doe",
    role: "basic",
  },
];

const getNextProductId = () => products.length + 1;

module.exports = {
  users,
  products,
  getNextProductId,
};
