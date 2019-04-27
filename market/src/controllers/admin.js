const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', { title: 'Add Product', path: '/admin/add-product', editing: false });
}

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  Product.create({
    title,
    price,
    imageUrl,
    description
  }).then(result => {
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(err);
  });
}

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then(product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', { title: 'Edit Product', path: '/admin/edit-product', editing: editMode, product });
  })
  .catch(err => {
    console.log(err);
  });
}

exports.postEditProduct = (req, res) => {
  const { productId, title, imageUrl, price, description } = req.body;
  Product.update({title, imageUrl, description, price}, {where: {id: productId}})
  .then(result => {
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.log(err);
  });  
}

exports.getProducts = (req, res) => {
  Product.findAll()
  .then(products => {
    res.render('admin/products', { products, title: 'Admin products', path: '/admin/products' });
  })
  .catch(err => {
    console.log(err);
  });
}

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then(product => {
    return product.destroy();
  })
  .then(result => {
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
}