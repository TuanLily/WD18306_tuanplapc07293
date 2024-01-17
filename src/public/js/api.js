const API_URL = "http://localhost:3000/";

// Khai báo biến categoriesData ở đầu mã nguồn
let categoriesData = [];

const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(API_URL + endpoint);
        const data = response.data;

        if (endpoint === 'categories') {
            categoriesData = data; // Lưu trữ dữ liệu danh mục để sử dụng sau này
        }

        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Để lấy cả 2 API products và categories thì cần dùng hàm Promise.all
Promise.all([fetchData("products"), fetchData("categories")])
    .then(([products, categories]) => {
        displayData(products, categories);
    });

const displayData = (products, categories) => {
    console.log(categories);
    console.log(products);
    const productsData = document.querySelector(".products-data");

    products.forEach((product) => {
        const imageUrl = product.image ? `/img/${product.image}` : '';
        const viPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });

        const price = product.price;
        const formattedPrice = viPrice.format(price);

        // Tìm thông tin danh mục tương ứng bằng vòng lặp
        let categoryName = 'Unknown Category';
        for (const cat of categories) {
            if (cat.id === product.cate_id) {
                categoryName = cat.title;
                break;
            }
        }

        const html = `
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="rounded position-relative fruite-item">
                    <div class="fruite-img">
                        <img src="${imageUrl}" class="img-fluid w-100 rounded-top" alt="IMG">
                    </div>
                    <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px">
                        ${categoryName}
                    </div>
                    <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>${product.name}</h4>
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
