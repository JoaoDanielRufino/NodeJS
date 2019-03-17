const path = require('path');
const express = require('express');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res) => {
  res.render('add-product', { title: 'Add Product', path: '/admin/add-product' });
});

router.post('/add-product', (req, res) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

module.exports.routes = router;
module.exports.products = products;