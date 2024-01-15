"use strict";

const controller = {};

controller.showHomePage = (req, res) => {
    res.render('client/index', { isHomePage: true, isSignInPage: false, isSignUpPage: false });

}
controller.showMorePage = (req, res) => {
    const page = req.params.page;

    // Kiểm tra xem trang có tồn tại hay không
    if (isPageExists(page)) {
        res.render(`client/${page}`, { isHomePage: true, isSignInPage: false, isSignUpPage: false });
    } else {
        // Nếu không tồn tại, chuyển hướng hoặc hiển thị trang 404
        res.render('error/404', { isHomePage: true, is404Page: true });
    }
}
controller.show404Page = (req, res) => {
    res.render('error/404');
}

module.exports = controller;

function isPageExists(page) {
    const validPages = ['index', 'contact', 'cart', 'chackout', 'shop', 'shop-detail', 'testimonial'];
    return validPages.includes(page);
}