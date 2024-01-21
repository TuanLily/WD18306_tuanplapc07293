
import fetchData from '/js/api.js';

document.addEventListener("DOMContentLoaded", async function () {
    // Fetch danh sách danh mục từ API
    const categories = await fetchData("categories");

    // Hiển thị danh sách danh mục trong bảng
    displayCategories(categories);
});

// Hàm để hiển thị danh sách danh mục
const displayCategories = (categories) => {
    const categoriesTableBody = document.getElementById("categoriesTableBody");

    // Xóa nội dung cũ của tbody
    categoriesTableBody.innerHTML = "";

    // Thêm từng danh mục vào tbody
    categories.forEach((category, index) => {
        const html = `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${category.title}</td>
                <td class="w-3">
                    <a href="/cate-edit"><i class="fa-solid fa-pen-to-square"></i></a>
                </td>
                <td class="w-3">
                    <a href=""><i class="fa-solid fa-trash"></i></a>
                </td>
            </tr>
        `;
        categoriesTableBody.innerHTML += html;
    });
};


