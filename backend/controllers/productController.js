const { products, getNextProductId } = require('../data/store');

// @desc    Get all products
// @route   GET /products
// @access  Public
const getProducts = (req, res) => {
  res.json(products);
};

// @desc    Get single product by ID
// @route   GET /products/:id
// @access  Public
const getProductById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Create a new product
// @route   POST /products
// @access  Protected
const createProduct = (req, res) => {
  const { name, description, price, category } = req.body;
  if (!name || !description || price == null || !category) {
    return res.status(400).json({ message: 'Please include all fields' });
  }
  const newProduct = {
    id: getNextProductId(),
    name,
    description,
    price,
    category,
  };
  console.log(newProduct,'pushing');
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// @desc    Update a product
// @route   PUT /products/:id
// @access  Protected
const updateProduct = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const { name, description, price, category } = req.body;
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price != null ? price : product.price;
  product.category = category || product.category;
  res.json(product);
};

// @desc    Delete a product
// @route   DELETE /products/:id
// @access  Protected
const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  products.splice(index, 1);
  res.json({ message: 'Product removed' });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
