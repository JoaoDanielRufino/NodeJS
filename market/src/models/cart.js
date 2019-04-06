const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'src/data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if(!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.products.findIndex(prod => prod.id == id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if(existingProduct) {
        updatedProduct = {...existingProduct};
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      }
      else {
        updatedProduct = {id, qty: 1};
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice; // Additional + to transform it to integer
      fs.writeFile(p, JSON.stringify(cart), err => {
        if(err) {
          console.log(err);
        }
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if(err) {
        return;
      }
      const updatedCart = {...JSON.parse(fileContent)};
      const product = updatedCart.products.find(prod => prod.id == id);
      if(!product)
        return;
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
      updatedCart.totalPrice -= productPrice * productQty;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        if(err)
          console.log(err);
      });
    });
  }

  static getCart(callback) {
    fs.readFile(p, (err, fileContent) => {
      if(err) {
        callback(null);
      }
      else {
        callback(JSON.parse(fileContent));
      }
    });
  }
}