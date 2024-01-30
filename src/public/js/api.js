
// const API_URL = "http://localhost:3000/"; //!Khai báo biến lấy đường dẫn URL

const API_URL = 'https://wd18306-pc07293-ecmascript-default-rtdb.firebaseio.com/';

export { API_URL };


const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`${API_URL}${endpoint}.json`);
        const data = response.data;

        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


export default fetchData;

