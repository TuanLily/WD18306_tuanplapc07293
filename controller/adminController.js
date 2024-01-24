
const adminController = {};

adminController.showDashboardPage = (req, res) => {
    res.render('admin/index', { isHomePage: true })
}

// Trong adminController.js

// Trong adminController.js

adminController.showMorePageAdmin = (req, res) => {
    const page = req.params.page;

    // Kiểm tra xem trang có tồn tại hay không
    if (isPageAdminExists(page)) {
        res.render(`admin/${page}`, { isHomePage: true });
    }
    else if (isCRUDPageProductAdmin(page) && page === 'product-list') {
        res.render(`adminPartials/adminPage/products/${page}`, { isProductListPage: true });
    }
    else if (isCRUDPageProductAdmin(page) && page === 'product-create') {
        res.render(`adminPartials/adminPage/products/${page}`, { isProductCreatePage: true });
    } else if (isCRUDPageProductAdmin(page) && page === 'product-edit') {
        res.render(`adminPartials/adminPage/products/${page}`, { isProductEditPage: true });
    }
    else if (isCRUDPageProductAdmin(page) && page === 'cate-list') {
        res.render(`adminPartials/adminPage/categories/${page}`, { isCateListPage: true });
    }
    else if (isCRUDPageProductAdmin(page) && page === 'cate-create') {
        res.render(`adminPartials/adminPage/categories/${page}`, { isCateCreatePage: true });
    } else if (isCRUDPageProductAdmin(page) && page === 'cate-edit') {
        res.render(`adminPartials/adminPage/categories/${page}`, { isCateEditPage: true });
    }
    else if (isCRUDPageProductAdmin(page) && page === 'order-list') {
        res.render(`adminPartials/adminPage/orders/${page}`, { isOrderListPage: true });
    } else if (isCRUDPageProductAdmin(page) && page === 'order-detail') {
        res.render(`adminPartials/adminPage/orders/${page}`, { isOrderDetailPage: true });
    }
    else if (isCRUDPageProductAdmin(page) && page === 'user-list') {
        res.render(`adminPartials/adminPage/users/${page}`, { isUserListPage: true });
    }
    else {
        // Nếu không tồn tại, chuyển hướng hoặc hiển thị trang 404
        res.render('error/404', { isHomePage: true, is404Page: true });
    }
};


adminController.showAdmin404Page = (req, res) => {
    res.render('error/admin404');
}

function isCRUDPageProductAdmin(page) {
    const validPages = ['product-list', 'product-create', 'product-edit', 'cate-list', 'cate-create', 'cate-edit', 'order-list', 'order-detail', 'user-list'];
    // Kiểm tra xem trang hiện tại có thuộc danh sách trang quản lý sản phẩm không
    return validPages.includes(page);
}

function isPageAdminExists(page) {
    const validPages = ['index', 'blank', 'chart', 'button', 'element', 'form', 'table', 'signin', 'signup', 'typography', 'widget'];
    return validPages.includes(page);
}

module.exports = adminController;


