"use strict";
const express = require('express');
const handlebars = require('express-handlebars'); // Sửa đổi dòng này

const app = express();
const port = 3000 || 5050;

// Cấu hình Public static Folder
app.use(express.static(__dirname + '/public'));

// Cấu hình sử dụng express-handlebars
app.engine('hbs', handlebars.engine({ // Sửa đổi dòng này
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials', // Sửa đổi tên đúng
    extname: '.hbs',
    defaultLayout: 'main'
}));

app.set('view engine', 'hbs'); // Sửa đổi dòng này

app.get('/', (ren, res) => {
    res.render('home');
})
app.get('/:page', (req, res) => {
    res.render(req.params.page);
})

//Chạy server npm 
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
