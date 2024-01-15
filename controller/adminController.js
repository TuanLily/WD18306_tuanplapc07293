"use strict";

const adminController = {};

adminController.showDashboardPage = (req, res) => {
    res.render('admin/index', { isHomePage: true })
}

adminController.showMorePageAdmin = (req, res) => {
    const page = req.params.page;

    // Kiểm tra xem trang có tồn tại hay không
    if (isPageAdminExists(page)) {
        res.render(`admin/${page}`, { isHomePage: true, isListPage: false });
    }
    else if (isCRUDPageProductAdmin(page)) {
        res.render(`adminPartials/adminPage/products/${page}`, { isHomePage: false, isListPage: true });
    } else {
        // Nếu không tồn tại, chuyển hướng hoặc hiển thị trang 404
        res.render('error/404', { isHomePage: true, is404Page: true });
    }
};

adminController.showAdmin404Page = (req, res) => {
    res.render('error/admin404');
}

module.exports = adminController;

function isCRUDPageProductAdmin(page) {
    const validPages = ['product-list'];
    const result = validPages.includes(page);
    return result;
}

function isPageAdminExists(page) {
    const validPages = ['index', 'blank', 'chart', 'button', 'element', 'form', 'table', 'signin', 'signup', 'typography', 'widget'];
    const result = validPages.includes(page);
    return result;
}

