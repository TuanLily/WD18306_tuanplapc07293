"use strict";

const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars'); // Sửa đổi dòng này

const app = express();
const appAdmin = express();
const port = 3000 || 5050;
const adminPort = 3200 || 5050;

//! Bắt đầu cáu hình cho trang client


// Cấu hình Public static Folder
// app.use(express.static(__dirname + '/src'));
app.use(express.static(path.join(__dirname, '/src')));


// Cấu hình sử dụng express-handlebars
app.engine('hbs', handlebars.engine({ // Sửa đổi dòng này
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: [
        __dirname + '/views/partials',
        __dirname + '/views/error'
    ],
    extname: '.hbs',
    defaultLayout: 'main'
}));


app.set('view engine', 'hbs'); // Sửa đổi dòng này

//routes
app.use('/', require('./routes/indexRouter'))


app.use((req, res, next) => {
    res.locals.isHomePage = (req.url === '/');
    next();
});
//! Kết thúc cáu hình cho trang client


//! Bắt đầu cáu hình cho trang Admin
appAdmin.use(express.static(path.join(__dirname, '/src/Admin')));
appAdmin.use(express.static(path.join(__dirname, '/src/public')));
appAdmin.use(express.static(path.join(__dirname, '/src')));


// Cấu hình sử dụng express-handlebars
appAdmin.engine('hbs', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: [
        __dirname + '/views/partials',
        __dirname + '/views/adminPartials/adminPage',
        __dirname + '/views/error'
    ],
    extname: '.hbs',
    defaultLayout: 'adMain'

}));


appAdmin.set('view engine', 'hbs'); // Sửa đổi dòng này

appAdmin.use('/', require('./routes/adminRouter'));


appAdmin.use((req, res, next) => {
    res.locals.isHomePage = (req.url === '/');
    next();
});

// Middleware 404
appAdmin.use((req, res) => {
    res.status(404).render('error/admin404');
});
//! Kết thúc cáu hình cho trang Admin

//Chạy server npm 
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
appAdmin.listen(adminPort, () => console.log(`Admin Server is running on http://localhost:${adminPort}`));



