const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminData = require('./src/routes/admin');
const shopRoute = require('./src/routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./src/public'));

app.use('/admin', adminData.routes);
app.use(shopRoute);

app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page not found' });
});

app.listen(3000);