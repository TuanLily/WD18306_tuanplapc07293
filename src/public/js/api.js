const API_URL = "http://localhost:3000/";

// Function to fetch data from the API
const fetchData = async () => {
    try {
        const response = await fetch(API_URL + "products");
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
const displayData = (data) => {
    const productsData = document.querySelector(".products-data");

    data.forEach((item) => {
        // console.log(item);
        const imageUrl = item.image ? `/img/${item.image}` : ''; // Thay thế bằng hình ảnh mặc định
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

// Gọi fetchData và xử lý kết quả
fetchData();


