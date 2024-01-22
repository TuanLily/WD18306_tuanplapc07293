
const API_URL = "http://localhost:3000/"; //!Khai báo biến lấy đường dẫn URL

export { API_URL };

// Khai báo biến categoriesData ở đầu mã nguồn
let categoriesData = [];

const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(API_URL + endpoint);
        const data = response.data;

        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export default fetchData;

