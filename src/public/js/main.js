import { API_URL } from './api.js';

(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow');
            } else {
                $('.fixed-top').removeClass('shadow');
            }
        } else {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow').css('top', -55);
            } else {
                $('.fixed-top').removeClass('shadow').css('top', 0);
            }
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    });


    // vegetable carousel
    $(".vegetable-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        // console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });



    // Product Quantity
    $(document).ready(function () {
        $('.quantity input').on('input', function () {
            var inputValue = $(this).val();

            // Kiểm tra xem giá trị nhập vào có phải là số từ 1 trở lên hay không
            if (!/^[1-9]\d*$/.test(inputValue)) {
                // Nếu không phải số từ 1 trở lên, đặt giá trị là 1
                $(this).val(1);
            }
        });

        $('.quantity button').on('click', function () {
            var button = $(this);
            var inputField = button.parent().parent().find('input');
            var oldValue = parseFloat(inputField.val());

            if (button.hasClass('btn-plus')) {
                // Tăng giá trị
                var newVal = parseFloat(oldValue) + 1;
            } else {
                // Giảm giá trị, nhưng không thể giảm dưới 1
                var newVal = Math.max(1, parseFloat(oldValue) - 1);
            }

            // Hiển thị giá trị mới
            inputField.val(newVal);
        });
    });



})(jQuery);


// JavaScript để xử lý sự kiện khi nhấn nút "minus"
// quantityModule.js

export function decrementQuantity() {
    const quantityInput = document.getElementById('quantityInput');
    let currentValue = parseInt(quantityInput.value, 10);

    if (!isNaN(currentValue) && currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

export function validateQuantityInput(input) {
    // Lấy giá trị hiện tại của ô input
    let currentValue = input.value;

    // Sử dụng regex để kiểm tra xem giá trị có phải là số nguyên dương không
    if (!/^[1-9]\d*$/.test(currentValue)) {
        // Nếu không hợp lệ, đặt giá trị về 1
        input.value = 1;
    }
}

export function incrementQuantity() {
    const quantityInput = document.getElementById('quantityInput');
    let currentValue = parseInt(quantityInput.value, 10);

    if (!isNaN(currentValue)) {
        quantityInput.value = currentValue + 1;
    }
}


//! Xử lý phần tìm kiếm sản phẩm theo từ khóa hoặc giá tiền
// Hàm hiển thị kết quả tìm kiếm
const displaySearchResults = (products, container) => {
    container ? container.innerHTML = "" : "";
    if (products) {
        let data = ""; // Initialize an empty string
        data += `
            <h4 class="text-primary justify-content-center text-center mb-3">Sản phẩm tìm được</h4>
        `;

        products.forEach((product) => {
            const imageUrl = product.image ? `/img/${product.image}` : "";
            const viPrice = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            });

            const price = product.price;
            const formattedPrice = viPrice.format(price);

            data += `
                <div class="card col-md-3 mb-2 ms-3">
                    <a href="#" class="mx-auto d-flex align-items-center justify-content-center" data-product-id="${product.id}">
                        <img src="${imageUrl}" class="card-img-top mt-3" alt="img" style="width: 100%; height: 100%">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title text-center">${product.name}</h5>
                        <p class="text-dark fs-5 fw-bold mb-0">${formattedPrice} / kg</p>
                    </div>
                </div>
            `;
        });

        container.innerHTML += data;

        // Thêm sự kiện cho các sản phẩm tìm được
        addProductClickEvent();

    } else {
        console.error('products is undefined or null.');
    }
};

// Hàm thêm sự kiện click cho sản phẩm
const addProductClickEvent = () => {
    const productLinks = document.querySelectorAll('#sampleProducts .card a[data-product-id]');

    productLinks.forEach((link) => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const productId = this.getAttribute('data-product-id');

            if (productId) {
                redirectToShopDetail(productId);
            } else {
                console.error('Product ID not found');
            }
        });
    });
};

// Hàm chuyển hướng đến trang shop-detail
const redirectToShopDetail = (productId) => {
    window.location.href = `/shop-detail?id=${productId}`;
};

// Hàm để kiểm tra xem một đối tượng có giá trị null hay không
const isNotNull = (obj) => obj !== null && obj !== undefined;

// Hàm thực hiện tìm kiếm
const performSearch = async () => {
    const keyword = document.getElementById('searchInput').value.trim();
    try {
        // Gọi API để lấy tất cả sản phẩm
        const allProductsResponse = await axios.get(`${API_URL}products.json`);
        const allProducts = allProductsResponse.data;

        // Lọc sản phẩm dựa trên từ khóa trong 'name'
        const filteredProducts = allProducts.filter(product =>
            isNotNull(product) &&
            (product.name.toLowerCase().includes(keyword.toLowerCase()) ||
                product.price.toString().includes(keyword))
        );

        // Hiển thị kết quả tìm kiếm trong box sản phẩm
        const searchResultsContainer = document.getElementById('sampleProducts');
        displaySearchResults(filteredProducts, searchResultsContainer);
    } catch (error) {
        console.error('Error searching products:', error.message);
    }
};

// Thêm sự kiện khi nhấn nút trong JavaScript
document.getElementById('searchButton').addEventListener('click', performSearch);

// Thêm sự kiện khi nhấn Enter trong input
document.getElementById('searchInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});






