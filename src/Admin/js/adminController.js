
import fetchData from '/js/api.js';
import { API_URL } from '/js/api.js';
import { showAlertAndRedirect } from './extension.js';
import { removeAscent } from './extension.js';
import { loadCategories, selectedValue } from './Categories/categoriesModule.js';
import { renderOrdersDisplay } from './Orders/ordersModule.js';


document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Sử dụng Promise.all để gọi đồng thời các API và chờ cho tất cả chúng hoàn tất
        const [categories, products, orders, orderDetails] = await Promise.all([
            fetchData("categories"),
            fetchData("products"),
            fetchData("orders"),
            fetchData("order_details")
        ]);

        // Hiển thị danh sách danh mục trong bảng
        displayCategories(categories);

        // Thực hiện các hàm hiển thị sản phẩm và đơn hàng dựa trên dữ liệu đã nhận được
        renderDisplayProducts(products, categories);
        // renderOrders(orders, orderDetails);

        renderOrdersDisplay(products, orders, orderDetails);

    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
});


// ! Sử lý CRUD danh mục
const handleCategoryForm = document.querySelector(".form-category");
const handleCategoryEditForm = document.querySelector(".formEdit-Category");

// Hàm để hiển thị danh sách danh mục
const displayCategories = async (categories) => {
    const categoriesTableBody = document.getElementById("categoriesTableBody");

    // Xóa nội dung cũ của tbody
    categoriesTableBody ? categoriesTableBody.innerHTML = "" : " ";

    // Thêm từng danh mục vào tbody
    await categories.forEach((category, index) => {
        const html = `
            <tr data-id='${category.id}'>
                <th scope="row">${index + 1}</th>
                <td>${category.title}</td>
                <td class="w-3">
                    <a href="/cate-edit" class="btn-edit" data-id="${category.id}"><i class="fa-solid fa-pen-to-square"></i></a>
                </td>
                <td class="w-3">
                <a class="btn-del" data-id="${category.id}" data-title="${category.title}">
                  <i class="fa-solid fa-trash"></i>
                </a>
                </td>
            </tr>
        `;
        categoriesTableBody ? categoriesTableBody.innerHTML += html : " ";
    });
    // Hàm để hiển thị danh sách danh mục


    // * Xử lý sự kiện click nút sửa
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const categoryId = e.currentTarget.getAttribute('data-id');
            if (categoryId) {
                // Chuyển hướng đến trang /cate-edit với ID categoryId
                window.location.href = `/cate-edit?id=${categoryId}`;
            } else {
                console.log('CategoryId is null or undefined');
            }
        });
    });


    // * Xử lý sự kiện click nút xóa
    const deleteButtons = document.querySelectorAll('.btn-del');
    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', async function (e) {
            e.preventDefault();
            const categoryId = this.getAttribute('data-id');
            const categoryTitle = this.getAttribute('data-title');
            const confirmMessage = `Bạn có chắc muốn xóa danh mục với tên "${categoryTitle}" không?`;

            // Hiển thị hộp thoại xác nhận
            if (confirm(confirmMessage)) {
                const trElement = this.closest('tr');

                if (categoryId && trElement) {
                    try {
                        // Tạm thời vô hiệu hóa nút xóa
                        this.disabled = true;

                        await axios.delete(`${API_URL}categories/${categoryId}`);
                        // Sau khi xóa thành công, có thể cập nhật giao diện hoặc làm các thao tác khác cần thiết
                        console.log(`Deleted category with ID: ${categoryId}`);
                        // Xóa thẻ <tr> khỏi DOM
                        trElement.remove();
                    } catch (error) {
                        console.log(error.message);
                    } finally {
                        // Kích hoạt lại nút xóa sau khi hoàn thành yêu cầu
                        this.disabled = false;
                    }
                }
            } else {
                // Người dùng đã hủy xác nhận
                console.log('Delete cancelled');
            }
        });
    });

    // Create Category
    handleCategoryForm ? handleCategoryForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value.trim();
        const msgError = document.getElementById('categoryError');

        // Kiểm tra xem categoryName có trống không
        if (!title) {
            msgError.innerHTML = '<span class="text-danger">Tên danh mục không được để trống</span>';
            return;
        } else {
            msgError.innerHTML = '';
            categoryError.innerHTML = '<span class="text-success">Thêm danh mục thành công</span>';
        }

        try {
            await axios.post(`${API_URL}categories`, {
                title: title
            });
            console.log('Added new category');
            showAlertAndRedirect("Thêm danh mục mới thành công", "/cate-list")

            await setTimeout(() => {
                window.location.href = `/cate-list`;
            }, 1500)
        } catch (error) {
            console.log(error.message);
        }

    }) : "";
};

document.addEventListener("DOMContentLoaded", async function () {
    // Lấy id từ tham số truyền vào URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');

    if (categoryId) {
        try {
            // Fetch dữ liệu danh mục từ API
            const response = await axios.get(`${API_URL}categories/${categoryId}`);
            const categoryData = response.data;

            // Hiển thị dữ liệu trong các ô input
            if (categoryData) {
                document.getElementById('title').value = categoryData.title;
                // Các ô input khác tương tự
            } else {
                console.log('Category data not found');
            }
        } catch (error) {
            console.log(error.message);
        }
    } else {
        console.log('CategoryId is null or undefined');
    }

    // * Edit Category
    handleCategoryEditForm ? handleCategoryEditForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value.trim();
        const msgError = document.getElementById('categoryError');

        if (!title) {
            msgError.innerHTML = '<span class="text-danger">Tên danh mục không được để trống</span>';
            return;
        } else {
            msgError.innerHTML = '';

            try {
                // Sử dụng phương thức PUT để cập nhật danh mục
                await axios.put(`${API_URL}categories/${categoryId}`, {
                    title: title
                });

                // Sau khi cập nhật thành công, có thể chuyển hướng hoặc thực hiện các thao tác khác cần thiết
                console.log('Updated category');
                showAlertAndRedirect(`Cập nhật danh mục "${title}" thành công`, "/cate-list")
            } catch (error) {
                console.log(error.message);
            }
        }
    }) : "";

});




// ! Sử lý CRUD sản phẩm
const handleProductForm = document.querySelector(".form-product");
const handleProductEditForm = document.querySelector(".formEdit-Product");

const renderDisplayProducts = async (products, categories) => {
    const productsTableBody = document.getElementById("productsTableBody");

    // Xóa nội dung cũ của tbody
    productsTableBody ? productsTableBody.innerHTML = "" : " ";

    // Thêm từng danh mục vào tbody
    await products.forEach((product, index) => {
        const imageUrl = product.image ? `/img/${product.image}` : "";
        const viPrice = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        });

        const category = categories.find((cat) => cat.id === product.cate_id);
        const categoryName = category ? category.title : "Unknown Category";

        const price = product.price;
        const formattedPrice = viPrice.format(price);
        const html = `
         <tr data-id='${product.id}'>
            <th scope="row">${index + 1}</th>
            <td>${product.name}</td>
            <td align="center"><img src="${imageUrl}" alt="IMG" width="80"></td>
            <td>${formattedPrice}</td>
            <td>${categoryName}</td>
            <td class="w-3">
                <a href="/product-edit" class="btn-pro-edit" data-id='${product.id}'><i class="fa-solid fa-pen-to-square"></i></a>
            </td>
            <td class="w-3"> <a class="btn-pro-del" data-id='${product.id}' data-title='${product.name}'><i class="fa-solid fa-trash"></i></a>
            </td>
        </tr>
        `;
        productsTableBody ? productsTableBody.innerHTML += html : " ";
    });


    // * Xử lý sự kiện click nút sửa
    const editButtons = document.querySelectorAll('.btn-pro-edit');
    editButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = e.currentTarget.getAttribute('data-id');
            console.log(productId);
            // Chuyển hướng hoặc thực hiện các thao tác cần thiết để sửa danh mục với ID productId
            if (productId) {
                // Chuyển hướng đến trang /product-edit với ID productId
                window.location.href = `/product-edit?id=${productId}`;
            } else {
                console.log('productId is null or undefined');
            }
        });
    });


    // * Xử lý sự kiện click nút xóa
    const deleteButtons = document.querySelectorAll('.btn-pro-del');
    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', async function (e) {
            e.preventDefault();
            const productID = this.getAttribute('data-id');
            const productName = this.getAttribute('data-title');
            const confirmMessage = `Bạn có chắc muốn xóa danh mục với tên "${productName}" không?`;

            // Hiển thị hộp thoại xác nhận
            if (confirm(confirmMessage)) {
                // Thực hiện xóa nếu người dùng xác nhận
                const trElement = this.closest('tr');

                if (productID && trElement) {
                    try {
                        // Tạm thời vô hiệu hóa nút xóa
                        this.disabled = true;

                        await axios.delete(`${API_URL}products/${productID}`);
                        // Sau khi xóa thành công, có thể cập nhật giao diện hoặc làm các thao tác khác cần thiết
                        console.log(`Deleted product with ID: ${productID}`);
                        // Xóa thẻ <tr> khỏi DOM
                        trElement.remove();
                    } catch (error) {
                        console.log(error.message);
                    } finally {
                        // Kích hoạt lại nút xóa sau khi hoàn thành yêu cầu
                        this.disabled = false;
                    }
                }
            } else {
                // Người dùng đã hủy xác nhận
                console.log('Delete cancelled');
            }
        });
    });

    //* Sử lý chức năng create product

    // Function để hiển thị hình ảnh khi chọn file
    const showImage = () => {
        const inputImage = document.getElementById('formFileMultiple');
        inputImage ? inputImage.addEventListener('change', () => {
            // Kiểm tra xem đã chọn file hay chưa
            if (inputImage.files.length > 0) {
                const image = inputImage.files.item(0).name;
                console.log(image);
                document.getElementById('showImage').innerHTML = `<img src="/img/${image}" alt="" width="120">`;
            }
        }) : "";
    };

    // const loadCategories = async () => {
    //     try {
    //         const response = await axios.get(`${API_URL}categories`);
    //         const categories = response.data;
    //         // Gọi hàm để cập nhật dữ liệu cho select element
    //         updateCategoriesDropdown(categories);
    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // };


    // Khi cần tải danh sách categories

    // const updateCategoriesDropdown = (categories) => {
    //     // Xóa bỏ tất cả các sự kiện 'change' trước đó
    //     selectElement.removeEventListener('change', handleDropdownChange);

    //     // Xóa tất cả các option hiện tại trong dropdown
    //     selectElement.innerHTML = '<option selected>Vui lòng chọn danh mục</option>';

    //     // Thêm các option mới từ dữ liệu categories
    //     categories.forEach((category) => {
    //         const option = document.createElement('option');
    //         option.value = category.id;
    //         option.text = category.title;
    //         selectElement.appendChild(option);
    //     });

    //     // Thêm sự kiện để theo dõi sự thay đổi trong dropdown
    //     selectElement.addEventListener('change', handleDropdownChange);
    // };

    // const handleDropdownChange = () => {
    //     // Lấy giá trị option đã chọn
    //     selectedValue = selectElement.value;
    //     console.log(selectedValue);
    // };

    window.onload(loadCategories());

    handleProductForm ? handleProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // await loadCategories();

        const name = document.getElementById('inputProduct').value.trim();
        const price = document.getElementById('inputPrice').value.trim();
        const detail = document.getElementById('summernote').value;
        const fileInput = document.getElementById('formFileMultiple');
        const selectedFile = fileInput.files[0];

        const productErr = document.querySelector('.productError');
        const imgtErr = document.querySelector('.imgError');
        const priceErr = document.querySelector('.priceError');
        const catetErr = document.querySelector('.cateError');

        productErr.innerHTML = '';
        imgtErr.innerHTML = '';
        priceErr.innerHTML = '';
        catetErr.innerHTML = '';

        // Gọi hàm loadCategories để tải danh sách danh mục (nếu cần)
        await loadCategories();

        // Sử dụng selectedValue từ module
        console.log(selectedValue);

        // Kiểm tra xem các trường có đúng giá trị không và hiển thị lỗi nếu cần
        let hasError = false;

        const isValidName = (name) => {
            const regex = /^[a-zA-Z0-9\s!@#\$%\^\&*\)\(+=._-]{2,}$/; // Regex here
            return regex.test(removeAscent(name));
        };

        if (!name) {
            productErr.innerHTML = '<span class="text-danger">Tên sản phẩm không được để trống</span>';
            hasError = true;
        } else if (!isValidName(name)) {
            productErr.innerHTML = '<span class="text-danger">Tên sản phẩm không hợp lệ</span>';
            hasError = true;
        }

        // Kiểm tra xem giá có phải là số dương hay không
        if (!price || isNaN(price) || parseFloat(price) <= 0) {
            priceErr.innerHTML = '<span class="text-danger">Giá không hợp lệ</span>';
            hasError = true;
        }

        // Kiểm tra xem giá trị đã chọn trong dropdown có phải là rỗng hay không
        if (!selectedValue) {
            catetErr.innerHTML = '<span class="text-danger">Vui lòng chọn danh mục</span>';
            hasError = true;
        }

        // Kiểm tra xem tệp tin có được chọn hay không
        if (!selectedFile) {
            imgtErr.innerHTML = '<span class="text-danger">Hình ảnh không được để trống</span>';
            hasError = true;
        } else {
            // Kiểm tra loại tệp tin, ví dụ chỉ cho phép ảnh
            const allowedExtensions = /\.(jpg|jpeg|png|gif)$/i;
            if (!allowedExtensions.test(selectedFile.name)) {
                imgtErr.innerHTML = '<span class="text-danger">Chỉ chấp nhận định dạng ảnh (jpg, jpeg, png, gif)</span>';
                hasError = true;
            }
        }

        const inputImage = selectedFile.name;

        // Thực hiện các thao tác cần thiết khi thông tin hợp lệ
        if (!hasError) {
            try {
                // Tiếp tục xử lý, ví dụ: gửi yêu cầu đến server để thêm sản phẩm
                await axios.post(`${API_URL}products`, {
                    name: name,
                    image: inputImage,
                    price: price,
                    cate_id: parseInt(selectedValue),
                    detail: detail,
                });

                // Sau khi thêm sản phẩm thành công, có thể chuyển hướng hoặc làm các thao tác khác cần thiết
                console.log('Added new product');
                showAlertAndRedirect("Thêm sản phẩm thành công", "/product-list")
            } catch (error) {
                console.log(error.message);
            }
        }
    }) : "";

    // Gọi hàm showImage để kích hoạt sự kiện change
    showImage();


}

document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const response = await axios.get(`${API_URL}products/${productId}`);
    const productData = response.data;
    if (productId) {
        try {
            if (productData) {
                console.log(productData);

                document.getElementById('inputProduct').value = productData.name;
                document.getElementById('inputPrice').value = productData.price;

                // Sử dụng phương thức của Summernote để cập nhật giá trị
                $('.summernote').summernote('code', productData.detail);

                document.getElementById('previewImage').innerHTML = `
                    <span>Hình cũ: </span>
                    <img src="/img/${productData.image}" alt="" width="120">`;

                // Lấy tên của danh mục dựa trên cate_id
                const categoryName = await getCategoryName(productData.cate_id);
                document.getElementById('priviewOldCategory').innerText = categoryName;

                // console.log(
                //     document.getElementById('checkCategory').value = productData.cate_id,
                //     document.getElementById('checkCategory').innerText = categoryName
                // Để nữa được thì sửa sau
                // );
            } else {
                console.log('Product data not found');
            }
        } catch (error) {
            console.log(error.message);
        }
    } else {
        console.log('productId is null or undefined');
    }

    // Khởi tạo Summernote trên tất cả các thẻ có class 'summernote'
    $('.summernote').summernote();

    // Hàm để lấy tên danh mục dựa trên cate_id
    async function getCategoryName(cateId) {
        try {
            const response = await axios.get(`${API_URL}categories/${cateId}`);
            const categoryData = response.data;
            return categoryData ? categoryData.title : "Unknown Category";
        } catch (error) {
            console.log(`Error fetching category data for id ${cateId}: ${error.message}`);
            return "Unknown Category";
        }
    }

    // * Sửa thông tin sản phẩm
    handleProductEditForm ? handleProductEditForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('inputProduct').value.trim();
        const price = document.getElementById('inputPrice').value.trim();
        const detail = document.getElementById('summernote').value;
        const fileInput = document.getElementById('formFileMultiple');
        const selectedFile = fileInput.files[0];

        const productErr = document.querySelector('.productError');
        const imgtErr = document.querySelector('.imgError');
        const priceErr = document.querySelector('.priceError');
        const catetErr = document.querySelector('.cateError');

        // Gọi hàm loadCategories để tải danh sách danh mục (nếu cần)
        await loadCategories();

        // Kiểm tra xem các trường có đúng giá trị không và hiển thị lỗi nếu cần
        let hasError = false;

        const isValidName = (name) => {
            const regex = /^[a-zA-Z0-9\s!@#\$%\^\&*\)\(+=._-]{2,}$/; // Regex here
            return regex.test(removeAscent(name));
        };

        if (!name) {
            productErr.innerHTML = '<span class="text-danger">Tên sản phẩm không được để trống</span>';
            hasError = true;

        } else if (!isValidName(name)) {
            productErr.innerHTML = '<span class="text-danger">Tên sản phẩm không hợp lệ</span>';
            hasError = true;
        }
        // Kiểm tra xem giá có phải là số dương hay không
        if (!price || isNaN(price) || parseFloat(price) <= 0) {
            priceErr.innerHTML = '<span class="text-danger">Giá không hợp lệ</span>';
            hasError = true;
        }



        // Kiểm tra xem tệp tin có được chọn hay không
        if (selectedFile) {
            // Kiểm tra loại tệp tin, ví dụ chỉ cho phép ảnh
            const allowedExtensions = /\.(jpg|jpeg|png|gif)$/i;
            if (!allowedExtensions.test(selectedFile.name)) {
                imgtErr.innerHTML = '<span class="text-danger">Chỉ chấp nhận định dạng ảnh (jpg, jpeg, png, gif)</span>';
                hasError = true;
            }
        }

        // Lấy giá trị option đã chọn
        const selectValueCate = selectedValue;

        // Biến để kiểm tra xem người dùng đã chọn danh mục mới hay không
        let updatedCategory = false;

        if (selectValueCate) {
            updatedCategory = true;
        }

        // Lấy giá trị ảnh đã chọn
        const selectValueImage = selectedFile ? selectedFile.name : null;

        // Biến để kiểm tra xem người dùng đã chọn ảnh mới hay không
        let updatedImage = false;

        if (selectValueImage) {
            updatedImage = true;
        }

        if (!hasError) {
            try {
                // Nếu người dùng đã chọn danh mục mới hoặc chọn ảnh mới, cập nhật sản phẩm
                if (updatedCategory || updatedImage) {
                    await axios.put(`${API_URL}products/${productId}`, {
                        name: name,
                        image: selectValueImage || productData.image,
                        price: price,
                        cate_id: parseInt(selectValueCate),
                        detail: detail
                    });
                } else {
                    // Ngược lại, sử dụng danh mục và ảnh hiện tại từ dữ liệu sản phẩm
                    await axios.put(`${API_URL}products/${productId}`, {
                        name: name,
                        image: productData.image,
                        price: price,
                        cate_id: productData.cate_id,
                        detail: detail
                    });
                }

                // Sau khi cập nhật sản phẩm thành công, có thể chuyển hướng hoặc làm các thao tác khác cần thiết
                console.log('Updated product');
                showAlertAndRedirect(`Cập nhật sản phẩm "${name}" thành công`, "/product-list");
            } catch (error) {
                console.log(error.message);
            }
        }



    }) : "";

});


//! Quản lý đon hàng nè



