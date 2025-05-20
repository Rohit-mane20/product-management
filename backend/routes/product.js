const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

//  list all products
router.get('/', getProducts);
//  get single product by ID
router.get('/:id', getProductById);
//  create a new product
router.post('/', isAuthenticated, createProduct);
//  update an existing product
router.put('/:id', isAuthenticated, updateProduct);
//  delete a product
router.delete('/:id', isAuthenticated, deleteProduct);

module.exports = router;
