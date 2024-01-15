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

// Thêm biến global để lưu trữ số lượng sản phẩm trong giỏ hàng
if (typeof cartItemCount === 'undefined') {
    // Khai báo biến cartItemCount nếu nó chưa được khai báo trước đó
    var cartItemCount = 3; // Số lượng sản phẩm giả định, bạn có thể thay đổi theo nhu cầu thực tế
}
// Hàm để hiển thị pop-up và cập nhật số lượng sản phẩm trong giỏ hàng
function openCartPopup() {
    // Hiển thị pop-up với hiệu ứng fade-in
    const cartPopup = document.getElementById('cartPopup');
    cartPopup.style.display = 'flex';
    cartPopup.classList.remove('fade-out'); // Đảm bảo lớp fade-out đã được loại bỏ

    // Hiển thị số lượng sản phẩm trong giỏ hàng trong pop-up
    document.getElementById('cartItemCountPopup').innerText = cartItemCount;

}

// Hàm để ẩn pop-up và xóa sự kiện click trên overlay
function closeCartPopup() {
    // Ẩn pop-up với hiệu ứng fade-out
    const cartPopup = document.getElementById('cartPopup');
    cartPopup.classList.add('fade-out');

    // Đặt thời gian chờ để ẩn pop-up sau khi hoàn thành hiệu ứng fade-out
    setTimeout(() => {
        cartPopup.style.display = 'none';
        cartPopup.classList.remove('fade-out');
    }, 300); // 300ms là thời gian của hiệu ứng fade-out
}

