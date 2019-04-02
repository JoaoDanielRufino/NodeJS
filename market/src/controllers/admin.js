const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', { title: 'Add Product', path: '/admin/add-product', editing: false });
}

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
}

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if(!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if(!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', { title: 'Edit Product', path: '/admin/edit-product', editing: editMode, product });
  });
}

exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('admin/products', { products, title: 'Admin products', path: '/admin/products' });
  }); 
}