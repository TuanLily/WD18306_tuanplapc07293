
import fetchData from '/js/api.js';
import { API_URL } from '/js/api.js';
// import { addCategory } from './Categories/create.js';

const handleCategoryForm = document.querySelector(".form-category");
const handleCategoryEditForm = document.querySelector(".formEdit-Category");

document.addEventListener("DOMContentLoaded", async function () {
    // Fetch danh sách danh mục từ API
    const categories = await fetchData("categories");

    // Hiển thị danh sách danh mục trong bảng
    displayCategories(categories);
});

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



    // Xử lý sự kiện click nút sửa
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const categoryId = e.currentTarget.getAttribute('data-id');
            // Chuyển hướng hoặc thực hiện các thao tác cần thiết để sửa danh mục với ID categoryId
            if (categoryId) {
                // Chuyển hướng đến trang /cate-edit với ID categoryId
                window.location.href = `/cate-edit?id=${categoryId}`;
            } else {
                console.log('CategoryId is null or undefined');
            }
        });
    });


    // Xử lý sự kiện click nút xóa
    const deleteButtons = document.querySelectorAll('.btn-del');
    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', async function (e) {
            e.preventDefault();
            const categoryId = this.getAttribute('data-id');
            const categoryTitle = this.getAttribute('data-title');
            const confirmMessage = `Bạn có chắc muốn xóa danh mục với tên "${categoryTitle}" không?`;
    
            // Hiển thị hộp thoại xác nhận
            if (confirm(confirmMessage)) {
                // Thực hiện xóa nếu người dùng xác nhận
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
            // Sau khi thêm thành công, có thể cập nhật giao diện hoặc làm các thao tác khác cần thiết
            console.log('Added new category');

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

    // Kiểm tra xem categoryId có giá trị không
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

    // Edit Category
    handleCategoryEditForm ? handleCategoryEditForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value.trim();
        const msgError = document.getElementById('categoryError');

        // Kiểm tra xem categoryName có trống không
        if (!title) {
            msgError.innerHTML = '<span class="text-danger">Tên danh mục không được để trống</span>';
            return;
        } else {
            msgError.innerHTML = '';
            categoryError.innerHTML = '<span class="text-success">Thêm danh mục thành công</span>'; // Nếu bạn muốn hiển thị thông báo thành công

            try {
                // Sử dụng phương thức PUT để cập nhật danh mục
                await axios.put(`${API_URL}categories/${categoryId}`, {
                    title: title
                });

                // Sau khi cập nhật thành công, có thể chuyển hướng hoặc thực hiện các thao tác khác cần thiết
                console.log('Updated category');

                await setTimeout(() => {
                    window.location.href = `/cate-list`;
                }, 1500)
            } catch (error) {
                console.log(error.message);
            }
        }
    }) : "";

});





