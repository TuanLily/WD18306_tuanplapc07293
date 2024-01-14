"use strict";

const adminController = {};

adminController.showDashboardPage = (req, res) => {
    res.render('admin/index')
}

adminController.showMorePageAdmin = (req, res) => {
    const page = req.params.page;

    // Kiểm tra xem trang có tồn tại hay không
    if (isPageAdminExists(page)) {
        res.render(`admin/${page}`);
    } else {
        // Nếu không tồn tại, chuyển hướng hoặc hiển thị trang 404
        res.render('error/404');
    }
}

module.exports = adminController;

function isPageAdminExists(page) {
    const validPages = ['index', 'blank', 'chart', 'button', 'element', 'form', 'table', 'signin', 'signup', 'typography', 'widget'];
    return validPages.includes(page);
}