
const API_URL = "http://localhost:3000/"; //!Khai báo biến lấy đường dẫn URL

export {API_URL};

// Khai báo biến categoriesData ở đầu mã nguồn
let categoriesData = [];

const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(API_URL + endpoint);
        const data = response.data;

        if (endpoint === "categories") {
            categoriesData = data; // Lưu trữ dữ liệu danh mục để sử dụng sau này
        }

        // Bổ sung các trường khác tùy thuộc vào cấu trúc của API
        if (endpoint === "products") {
            data.forEach((product) => {
                // Bổ sung các trường khác như image, description, price, ...
                product.image = product.image || ""; // Thêm một giá trị mặc định nếu không có trường image
                product.description = product.description || ""; // Thêm một giá trị mặc định nếu không có trường description
            });
        }

        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export default fetchData;

