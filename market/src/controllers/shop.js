const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', { products, title: 'All products', path: '/products' });
  });
}

exports.getProduct = (req, res) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', { product, title: product.title, path: '/products' });
  });
}

exports.getIndex = (req, res) => {
  Product.fetchAll(products => {
    res.render('shop/index', { products, title: 'Shop', path: '/' });
  });
}

exports.getCart = (req, res) => {
  res.render('shop/cart', { path: '/cart', title: 'Your Cart' });
}

exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
}

exports.getOrders = (req, res) => {
  res.render('shop/orders', { path: '/orders', title: 'Your Orders' });
}

exports.getCheckout = (req, res) => {
  res.render('shop/checkout', { path: 'checkout', title: 'Checkout' });
}