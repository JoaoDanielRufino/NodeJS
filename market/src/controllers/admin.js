const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', { title: 'Add Product', path: '/admin/add-product', editing: false });
}

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(null, title, imageUrl, description, price);
  product.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', { title: 'Edit Product', path: '/admin/edit-product', editing: editMode, product });
  });
}

exports.postEditProduct = (req, res) => {
  const { prodId, title, imageUrl, price, description } = req.body;
  const product = new Product(prodId, title, imageUrl, description, price);
  product.save();
  res.redirect('/admin/products');
}

exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('admin/products', { products, title: 'Admin products', path: '/admin/products' });
  });
}

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
}