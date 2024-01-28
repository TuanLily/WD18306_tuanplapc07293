// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Thay 'db.json' bằng tên file JSON của bạn
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Thêm middleware để xử lý yêu cầu có từ khóa
server.use((req, res, next) => {
    if (req.query.keyword) {
        // Nếu có từ khóa, lọc dữ liệu trước khi chuyển đến router
        const keyword = req.query.keyword.toLowerCase();
        const db = router.db;
        const filteredData = Object.keys(db)
            .reduce((acc, collection) => {
                acc[collection] = db[collection].filter(item =>
                    JSON.stringify(item).toLowerCase().includes(keyword)
                );
                return acc;
            }, {});

        // Gán dữ liệu lọc vào request để router sử dụng
        req.body = filteredData;
    }

    // Tiếp tục xử lý
    next();
});

// Sử dụng router tùy chỉnh
server.use(router);

const port = 3000;
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
