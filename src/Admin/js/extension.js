// Hàm hiển thị alert và chuyển hướng ngay lập tức
const showAlertAndRedirect = (message, redirectUrl) => {
    alert(message);
    window.location.replace(redirectUrl); // Chuyển hướng trang ngay lập tức
};

// Sử dụng hàm
// showAlertAndRedirect('Thông báo', '/product-list');

export { showAlertAndRedirect };