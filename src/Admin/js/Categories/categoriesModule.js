
import { API_URL } from '/js/api.js';

const selectElement = document.getElementById('checkCategory');
let selectedValue = null;

const loadCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}categories.json`);
        const categories = response.data;
        // Gọi hàm để cập nhật dữ liệu cho select element
        updateCategoriesDropdown(categories);
    } catch (error) {
        console.error(error.message);
    }
};

const updateCategoriesDropdown = (categories) => {
    // Xóa bỏ tất cả các sự kiện 'change' trước đó
    selectElement.removeEventListener('change', handleDropdownChange);

    // Xóa tất cả các option hiện tại trong dropdown
    selectElement.innerHTML = '<option selected>Vui lòng chọn danh mục</option>';

    // Thêm các option mới từ dữ liệu categories
    categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category.id;
        option.text = category.title;
        selectElement.appendChild(option);
    });

    // Thêm sự kiện để theo dõi sự thay đổi trong dropdown
    selectElement.addEventListener('change', handleDropdownChange);
};

const handleDropdownChange = () => {
    // Lấy giá trị option đã chọn
    selectedValue = selectElement.value;
    console.log(selectedValue);
};



export { loadCategories, selectedValue };