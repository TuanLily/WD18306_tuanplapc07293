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
        if (document.querySelector("#userInfo")) {
            this.updateUI();
        }
    }

    async getUser() {
        try {
            const response = await axios.get(`${API_URL}users.json`);
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error.message);
            throw error;
        }
    }

    signIn() {
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
                        localStorage.setItem('currentUser', JSON.stringify(user));


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
                try {
                    const currentData = await axios.get(`${API_URL}users.json`);
                    const currentUsers = Object.values(currentData.data || {});

                    const nextId = currentUsers.length > 0 ? Math.max(...currentUsers.map(user => Number(user.id))) + 1 : 1;

                    await axios.put(`${API_URL}users/${nextId - 1}.json`, {
                        fullname,
                        username,
                        email,
                        password,
                        id: nextId,
                    });


                    setTimeout(() => {
                        alert("Đăng ký thành công!");
                        window.location.href = "/signin";
                    }, 0);
                } catch (error) {
                    console.error('Error creating user:', error.message);
                    alert("Đã xảy ra lỗi khi đăng ký người dùng. Vui lòng thử lại sau.");
                }
            }
        });
    }



    updateUI() {

        const userIcon = document.querySelector(".fa-user");
        const signInLink = document.querySelector("#userInfo");

        // Lấy thông tin người dùng từ localStorage
        const currentUserString = localStorage.getItem('currentUser');
        const user = currentUserString ? JSON.parse(currentUserString) : null;

        // Nếu có thông tin người dùng, hiển thị thông tin
        if (user) {
            // Loại bỏ icon user
            if (userIcon) {
                userIcon.style.display = "none";
            }

            // Hiển thị thông tin người dùng và loại bỏ link đăng nhập
            if (signInLink) {
                signInLink.innerHTML = `<div class="dropdown">
                <button class="btn btn-outline-success dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="/img/user-account.png" alt="img" width="30">

                    ${user.username}
                </button>
                <ul class="dropdown-menu dropdown-menu-end mt-1" aria-labelledby="userDropdown">
                    <li>
                    <a class="dropdown-item" href="#" id="userInfo">
                    <i class="fas fa-user"></i> 
                    Thông tin tài khoản</a>
                    </li>
                    <li><hr class="dropdown-divider"></li>
                    <li>
                    <a class="dropdown-item" href="" id="signOut">
                        <i class="fas fa-sign-out-alt"></i> Đăng xuất
                    </a>
                    </li>
                </ul>
            </div>
            `;
            }
            const signOutButton = document.getElementById("signOut");
            if (signOutButton) {
                signOutButton.addEventListener("click", () => {
                    // Xóa dữ liệu người dùng từ localStorage
                    localStorage.removeItem('currentUser');
                    // Cập nhật lại giao diện sau khi đăng xuất
                    this.updateUI();
                });
            }
        } else {
            // Nếu không có thông tin người dùng, hiển thị icon và link đăng nhập
            if (userIcon) {
                userIcon.style.display = "block";
            }

            if (signInLink) {
                signInLink.innerHTML = `<a href="/signin" class="my-auto">
                    <i class="fas fa-user fa-2x"></i>
                </a>`;
            }
        }
    }
}
new Authentication();




