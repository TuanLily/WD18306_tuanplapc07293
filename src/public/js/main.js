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

