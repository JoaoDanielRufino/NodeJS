const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render('admin/add-product', { title: 'Add Product', path: '/admin/add-product' });
}

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
}

exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('admin/products', { products, title: 'Admin products', path: '/admin/products' });
  }); 
}