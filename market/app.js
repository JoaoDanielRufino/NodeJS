const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./src/routes/admin');
const shopRoute = require('./src/routes/shop');
const errorController = require('./src/controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./src/public'));

app.use('/admin', adminRoutes);
app.use(shopRoute);

app.use(errorController.get404);

app.listen(3000);