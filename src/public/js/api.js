const API_URL = "http://localhost:3000/";

// Function to fetch data from the API
const fetchDataProducts = async () => {
    try {
        const response = await axios.get(API_URL + "products");
        const data = response.data;
        displayData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}; //* Lấy API phần sản phẩm

const displayData = (data) => {
    const productsData = document.querySelector(".products-data");

    data.forEach((item) => {
        const imageUrl = item.image ? `/img/${item.image}` : '';
        const viPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });

        const price = item.price;
        const formattedPrice = viPrice.format(price);

        const html = `
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="rounded position-relative fruite-item">
                    <div class="fruite-img">
                        <img src="${imageUrl}" class="img-fluid w-100 rounded-top" alt="IMG">
                    </div>
                    <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px">
                        ${item.cate_id} 
                    </div>
                    <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>${item.name}</h4>
                        <div class="d-flex justify-content-between flex-lg-wrap">
                            <p class="text-dark fs-5 fw-bold mb-0">
                                ${formattedPrice} / kg
                            </p>
                            <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary">
                                <i class="fa fa-shopping-bag me-2 text-primary"></i>
                                Add to cart
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        productsData.innerHTML += html;
    });
};

// Call fetchData and handle the result
fetchDataProducts();


const fetchDataCategories = async () => {
    try {
        const response = await axios.get(API_URL + "categories");
        const data = response.data;
        console.log(data);
        // displayData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}; //* Lấy API phần danh mục

fetchDataCategories();

const fetchDataOrders = async () => {
    try {
        const response = await axios.get(API_URL + "orders");
        const data = response.data;
        console.log(data);
        // displayData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}; //* Lấy API phần đơn hàng

fetchDataOrders();

const fetchDataOrdersDetails = async () => {
    try {
        const response = await axios.get(API_URL + "order_details");
        const data = response.data;
        console.log(data);
        // displayData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}; //* Lấy API phần chi tiết đơn hàng

fetchDataOrdersDetails();