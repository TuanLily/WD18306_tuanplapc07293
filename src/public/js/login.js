import { API_URL } from './api.js';
import fetchData from './api.js'; // Đảm bảo tên là fetchData

(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }



})(jQuery);

//! Sử lý phần đăng nhập


class Authentication {
    constructor() {
        if (document.querySelector(".btn_Login")) {
            this.signIn();
        } else if (document.querySelector(".btn_SignUp")) {
            this.signUp();
        }
    }

    async getUser() {
        try {
            const response = await axios.get(`${API_URL}users`);
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error.message);
            throw error;
        }
    }

    signIn() {
        console.log("Hello Login");
        const btnLogin = document.querySelector(".btn_Login");

        btnLogin.addEventListener("click", async (e) => {
            e.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (username == "" || password == "") {
                alert("Hãy điền thông tin Username và Password");
            } else {
                try {
                    const data = await this.getUser();
                    const user = data.find(
                        (user) =>
                            user.username == username && user.password == password
                    );

                    if (user) {
                        setTimeout(() => {
                            alert("Đăng nhập thành công!");
                            window.location.href = "/";
                        }, 0);
                    } else {
                        alert("Đăng nhập thất bại có thể tài khoản hoặc mật khẩu sai!");
                    }
                } catch (error) {
                    console.error('Error fetching users:', error.message);
                }
            }
        });
    }

    signUp() {
        console.log("Hello SignUp");
        const btnSignUp = document.querySelector(".btn_SignUp");

        btnSignUp.addEventListener("click", async (e) => {
            e.preventDefault();

            const fullname = document.getElementById("fullname").value.trim();
            const username = document.getElementById("username").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const isPassword = document.getElementById("isPassword").value.trim();

            if (fullname == "" || username == "" || email == "" || password == "") {
                alert("Vui lòng điền đầy đủ thông tin");
            } else if (password !== isPassword) {
                alert("Mật khẩu và xác nhận mật khẩu không khớp");
            } else {
                const user = {
                    fullname,
                    username,
                    email,
                    password,
                };

                try {
                    const response = await axios.post(`${API_URL}users`, user);

                    if (response) {
                        setTimeout(() => {
                            alert("Đăng ký thành công!");
                            window.location.href = "/signin";
                        }, 0);
                    } else {
                        alert("Đăng ký thất bại có thể thông tin bị sai!");
                    }
                } catch (error) {
                    console.error('Error creating user:', error.message);
                }
            }
        });
    }
}

// Khởi tạo đối tượng Authentication
new Authentication();




