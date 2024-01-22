
import { API_URL } from './api.js';
import fetchData from './api.js'; // Đảm bảo tên là fetchData
import { decrementQuantity, validateQuantityInput, incrementQuantity } from './main.js';



Promise.all([fetchData("products"), fetchData("categories")])
    .then(
        ([products, categories]) => {
            displayShopData(products, categories);
        }
    );

const displayShopData = (products, categories) => {
    const productsData = document.querySelector(".products-data");

    products.forEach((product) => {
        const imageUrl = product.image ? `/img/${product.image}` : "";
        const viPrice = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        });

        const price = product.price;
        const formattedPrice = viPrice.format(price);

        // Tìm thông tin danh mục tương ứng bằng vòng lặp
        const category = categories.find((cat) => cat.id === product.cate_id);
        console.log(category);
        const categoryName = category ? category.title : "Unknown Category";

        const html = `
                    <div class="col-md-6 col-lg-4 col-xl-3">
                        <div class="rounded position-relative fruite-item">
                            <div class="fruite-img" data-product-id="${product.id}">
                                <a href="/shop-detail?id=${product.id}" class="product-link">
                                    <img src="${imageUrl}" class="img-fluid w-100 rounded-top" alt="IMG">
                                </a>
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
        productsData ? (productsData.innerHTML += html) : "";
    });
}; //* Show sản phẩm cho trang shop
//*! Chỗ lấy API show sản phẩm và danh mục cho trang chủ
const displayData = (products, container, categories) => {
    container.innerHTML = "";


    products.forEach((product) => {
        const imageUrl = product.image ? `/img/${product.image}` : "";
        const viPrice = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        });

        const price = product.price;
        const formattedPrice = viPrice.format(price);

        const category = categories.find((cat) => cat.id === product.cate_id);
        const categoryName = category ? category.title : "Unknown Category";

        const html = `
                <div class="col-md-6 col-lg-4 col-xl-3">
                    <div class="rounded position-relative fruite-item">
                        <div class="fruite-img" data-product-id="${product.id}">
                            <a href="/shop-detail?id=${product.id}" class="product-link">
                                <img src="${imageUrl}" class="img-fluid w-100 rounded-top" alt="IMG">
                            </a>
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
        container.innerHTML += html;
    });
};



//*! Chỗ lấy API show sản phẩm và danh mục cho load sản phẩm theo danh mục

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const [products, categories] = await Promise.all([fetchData("products"), fetchData("categories")]);
        const categoryTabs = document.getElementById('categoryTabs');
        const tabContent = document.getElementById('tabContent');
        let selectedCategoryId = null; // Biến để lưu trữ danh mục đã chọn

        if (categoryTabs && tabContent) {
            // Tạo tab cho tất cả sản phẩm
            const allProductsTabItem = document.createElement('li');
            allProductsTabItem.className = 'nav-item';

            const allProductsTabLink = document.createElement('a');
            allProductsTabLink.className = 'd-flex m-2 py-2 bg-light rounded-pill active'; // Mặc định là active
            allProductsTabLink.setAttribute('data-bs-toggle', 'pill');
            allProductsTabLink.href = '#tab-0';

            const allProductsSpanText = document.createElement('span');
            allProductsSpanText.className = 'text-dark';
            allProductsSpanText.style.width = '130px';
            allProductsSpanText.textContent = 'Tất cả sản phẩm';

            allProductsTabLink.appendChild(allProductsSpanText);
            allProductsTabItem.appendChild(allProductsTabLink);
            categoryTabs.appendChild(allProductsTabItem);

            // Tạo tab content cho tất cả sản phẩm
            const allProductsTabPane = document.createElement('div');
            allProductsTabPane.id = 'tab-0';
            allProductsTabPane.className = 'tab-pane fade show p-0 active'; // Mặc định là active

            const rowContainer = document.createElement('div');
            rowContainer.className = 'row g-4';

            const colContainer = document.createElement('div');
            colContainer.className = 'col-lg-12';

            const allProductsDataContainer = document.createElement('div');
            allProductsDataContainer.className = 'row g-4 products-data';

            colContainer.appendChild(allProductsDataContainer);
            rowContainer.appendChild(colContainer);
            allProductsTabPane.appendChild(rowContainer);
            tabContent.appendChild(allProductsTabPane);

            // Xử lý sự kiện click cho tab tất cả sản phẩm
            allProductsTabLink.addEventListener('click', async () => {
                // Kiểm tra xem đã chọn một tab khác chưa
                if (selectedCategoryId !== null) {
                    // Loại bỏ lớp active khỏi tab cũ
                    const oldTabLink = document.querySelector(`#tab-${selectedCategoryId} a`);
                    if (oldTabLink) {
                        oldTabLink.classList.remove('active');
                    }
                }

                // Gán selectedCategoryId bằng null để hiển thị tất cả sản phẩm
                selectedCategoryId = null;

                // Thêm lớp active cho tab tất cả sản phẩm
                allProductsTabLink.classList.add('active');

                // Hiển thị tất cả sản phẩm
                displayData(products, allProductsDataContainer, categories);
            });

            // Tạo tab và tab content cho từng danh mục
            categories.forEach(category => {
                const tabItem = document.createElement('li');
                tabItem.className = 'nav-item';

                const tabLink = document.createElement('a');
                tabLink.className = 'd-flex m-2 py-2 bg-light rounded-pill';
                tabLink.setAttribute('data-bs-toggle', 'pill');
                tabLink.href = `#tab-${category.id}`;

                const spanText = document.createElement('span');
                spanText.className = 'text-dark';
                spanText.style.width = '130px';
                spanText.textContent = category.title;

                tabLink.appendChild(spanText);
                tabItem.appendChild(tabLink);
                categoryTabs.appendChild(tabItem);

                const tabPane = document.createElement('div');
                tabPane.id = `tab-${category.id}`;
                tabPane.className = 'tab-pane fade show p-0';

                const rowContainer = document.createElement('div');
                rowContainer.className = 'row g-4';

                const colContainer = document.createElement('div');
                colContainer.className = 'col-lg-12';

                const productsDataContainer = document.createElement('div');
                productsDataContainer.className = 'row g-4 products-data';

                colContainer.appendChild(productsDataContainer);
                rowContainer.appendChild(colContainer);
                tabPane.appendChild(rowContainer);
                tabContent.appendChild(tabPane);

                // Xử lý sự kiện click cho mỗi tab danh mục
                tabLink.addEventListener('click', async () => {
                    // Kiểm tra xem đã chọn một tab khác chưa
                    if (selectedCategoryId !== null) {
                        // Loại bỏ lớp active khỏi tab cũ
                        const oldTabLink = document.querySelector(`#tab-${selectedCategoryId} a`);
                        if (oldTabLink) {
                            oldTabLink.classList.remove('active');
                        }
                    }

                    // Gán selectedCategoryId bằng id của danh mục được chọn
                    selectedCategoryId = category.id;

                    // Thêm lớp active cho tab danh mục được chọn
                    tabLink.classList.add('active');

                    // Lọc sản phẩm theo danh mục và hiển thị
                    const productsByCategory = products.filter(product => product.cate_id === category.id);
                    displayData(productsByCategory, productsDataContainer, categories);
                });
            });
        } else {
            console.error('Không tìm thấy phần tử với id là categoryTabs hoặc tabContent');
        }
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu danh mục hoặc sản phẩm:', error);
    }
});



//*! Chỗ lấy API show trang chi tiết sản phẩm

document.addEventListener("DOMContentLoaded", function () {
    const productLinks = document.querySelectorAll(".fruite-img .product-link");

    productLinks.forEach((link) => {
        ventListener("click", function (event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a
            const productId = this.parentElement.getAttribute("data-product-id");

            if (productId) {
                console.log("Product ID clicked:", productId);
                redirectToShopDetail(productId);
            } else {
                console.error("Product ID not found");
            }
        });
    });

    // Định nghĩa hàm redirectToShopDetail ở mức toàn cục
    function redirectToShopDetail(productId) {
        window.location.href = `/shop-detail?id=${productId}`;
    }
});

// Lấy id sản phẩm từ URL
const productId = getProductIdFromUrl();

// Tạo hai Promise cho products và categories
const productsPromise = fetchData("products");
const categoriesPromise = fetchData("categories");

// Khi cả hai Promise hoàn thành, tiến hành xử lý dữ liệu
Promise.all([productsPromise, categoriesPromise])
    .then(([products, categories]) => {
        // Hiển thị thông tin sản phẩm
        fetchProductDetail(productId)
            .then((productDetail) => {
                displayProductDetail(productDetail, categories);
            })
            .catch(handleError);
    })
    .catch(handleError);

// Hàm lấy id sản phẩm từ URL
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams ? urlParams.get("id") : "1";
}

// Hàm fetch thông tin sản phẩm
async function fetchProductDetail(productId) {
    const apiUrl = API_URL + `products/${productId}`;

    try {
        const response = await axios.get(apiUrl);

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching product detail:", error);
        throw error;
    }
}

function displayProductDetail(product, categories) {
    const productDetailElement = document.querySelector("#product-detail");

    if (!productDetailElement) {
        console.error("Error: productDetailElement is null");
        return;
    }

    // Tìm thông tin danh mục tương ứng bằng vòng lặp
    let categoryName = "Unknown Category";
    for (const cat of categories) {
        if (cat.id === product.cate_id) {
            categoryName = cat.title;
            break;
        }
    }

    const formattedPrice = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(product.price);

    productDetailElement.innerHTML = `
    <div class="col-lg-8 col-xl-9">
                <div class="row g-4">
                    <div class="col-lg-6">
                        <div class="border rounded">
                             <img src="img/${product.image}" class="img-fluid rounded" alt="Image">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <h4 class="fw-bold mb-3">${product.name}</h4>
                        <p class="mb-3">Category: ${categoryName}</p>
                        <h5 class="fw-bold mb-3">${formattedPrice}</h5>
                        <div class="d-flex mb-4">
                            <i class="fa fa-star text-secondary"></i>
                            <i class="fa fa-star text-secondary"></i>
                            <i class="fa fa-star text-secondary"></i>
                            <i class="fa fa-star text-secondary"></i>
                            <i class="fa fa-star"></i>
                        </div>
                        <p class="mb-4">${product.detail}</p>
                        <div class="input-group quantity mb-5" style="width: 100px;">
                            <div class="input-group-btn">
                                <button id="decrementButton" class="btn btn-sm btn-minus rounded-circle bg-light border">
                                    <i class="fa fa-minus"></i>
                                </button>
                            </div>
                            <input type="text" id="quantityInput" class="form-control form-control-sm text-center border-0" value="1">
                            <div class="input-group-btn">
                                <button id="incrementButton" class="btn btn-sm btn-plus rounded-circle bg-light border">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                     <a href="#" class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"><i
                                class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                    </div>
                    <div class="col-lg-12">
                        <nav>
                            <div class="nav nav-tabs mb-3">
                                <button class="nav-link active border-white border-bottom-0" type="button" role="tab"
                                    id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                                    aria-controls="nav-about" aria-selected="true">Description</button>
                                <button class="nav-link border-white border-bottom-0" type="button" role="tab"
                                    id="nav-mission-tab" data-bs-toggle="tab" data-bs-target="#nav-mission"
                                    aria-controls="nav-mission" aria-selected="false">Reviews</button>
                            </div>
                        </nav>
                        <div class="tab-content mb-5">
                            <div class="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                <p>T${product.detail} </p>
                            </div>
                            <div class="tab-pane" id="nav-mission" role="tabpanel" aria-labelledby="nav-mission-tab">
                                <div class="d-flex">
                                    <img src="img/avatar.jpg" class="img-fluid rounded-circle p-3"
                                        style="width: 100px; height: 100px;" alt="">
                                    <div class="">
                                        <p class="mb-2" style="font-size: 14px;">April 12, 2024</p>
                                        <div class="d-flex justify-content-between">
                                            <h5>Jason Smith</h5>
                                            <div class="d-flex mb-3">
                                                <i class="fa fa-star text-secondary"></i>
                                                <i class="fa fa-star text-secondary"></i>
                                                <i class="fa fa-star text-secondary"></i>
                                                <i class="fa fa-star text-secondary"></i>
                                                <i class="fa fa-star"></i>
                                            </div>
                                        </div>
                                        <p>The generated Lorem Ipsum is therefore always free from repetition injected
                                            humour, or non-characteristic
                                            words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <img src="img/avatar.jpg" class="img-fluid rounded-circle p-3"
                                        style="width: 100px; height: 100px;" alt="">
                                    <div class="">
                                        <p class="mb-2" style="font-size: 14px;">April 12, 2024</p>
                                        <div class="d-flex justify-content-between">
                                            <h5>Sam Peters</h5>
                                            <div class="d-flex mb-3">
                                                <i class="fa fa-star text-secondary"></i>
                                                <i class="fa fa-star text-secondary"></i>
                                                <i class="fa fa-star text-secondary"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </div>
                                        </div>
                                        <p class="text-dark">The generated Lorem Ipsum is therefore always free from
                                            repetition injected humour, or non-characteristic
                                            words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="nav-vision" role="tabpanel">
                                <p class="text-dark">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor
                                    sit. Aliqu diam
                                    amet diam et eos labore. 3</p>
                                <p class="mb-0">Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore.
                                    Clita erat ipsum et lorem et sit</p>
                            </div>
                        </div>
                    </div>
                    <form action="#">
                        <h4 class="mb-5 fw-bold">Leave a Reply</h4>
                        <div class="row g-4">
                            <div class="col-lg-6">
                                <div class="border-bottom rounded">
                                    <input type="text" class="form-control border-0 me-4" placeholder="Yur Name *">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="border-bottom rounded">
                                    <input type="email" class="form-control border-0" placeholder="Your Email *">
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="border-bottom rounded my-4">
                                    <textarea name="" id="" class="form-control border-0" cols="30" rows="8"
                                        placeholder="Your Review *" spellcheck="false"></textarea>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="d-flex justify-content-between py-3 mb-5">
                                    <div class="d-flex align-items-center">
                                        <p class="mb-0 me-3">Please rate:</p>
                                        <div class="d-flex align-items-center" style="font-size: 12px;">
                                            <i class="fa fa-star text-muted"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                        </div>
                                    </div>
                                    <a href="#" class="btn border border-secondary text-primary rounded-pill px-4 py-3">
                                        Post Comment</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-lg-4 col-xl-3">
                <div class="row g-4 fruite">
                    <div class="col-lg-12">
                        <div class="input-group w-100 mx-auto d-flex mb-4">
                            <input type="search" class="form-control p-3" placeholder="keywords"
                                aria-describedby="search-icon-1">
                            <span id="search-icon-1" class="input-group-text p-3"><i class="fa fa-search"></i></span>
                        </div>
                        <div class="mb-4">
                            <h4>Categories</h4>
                            <ul class="list-unstyled fruite-categorie">
                                <li>
                                    <div class="d-flex justify-content-between fruite-name">
                                        <a href="#"><i class="fas fa-apple-alt me-2"></i>Apples</a>
                                        <span>(3)</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="d-flex justify-content-between fruite-name">
                                        <a href="#"><i class="fas fa-apple-alt me-2"></i>Oranges</a>
                                        <span>(5)</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="d-flex justify-content-between fruite-name">
                                        <a href="#"><i class="fas fa-apple-alt me-2"></i>Strawbery</a>
                                        <span>(2)</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="d-flex justify-content-between fruite-name">
                                        <a href="#"><i class="fas fa-apple-alt me-2"></i>Banana</a>
                                        <span>(8)</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="d-flex justify-content-between fruite-name">
                                        <a href="#"><i class="fas fa-apple-alt me-2"></i>Pumpkin</a>
                                        <span>(5)</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <h4 class="mb-4">Featured products</h4>
                        <div class="d-flex align-items-center justify-content-start">
                            <div class="rounded" style="width: 100px; height: 100px;">
                                <img src="img/featur-1.jpg" class="img-fluid rounded" alt="Image">
                            </div>
                            <div>
                                <h6 class="mb-2">Big Banana</h6>
                                <div class="d-flex mb-2">
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                                <div class="d-flex mb-2">
                                    <h5 class="fw-bold me-2">2.99 $</h5>
                                    <h5 class="text-danger text-decoration-line-through">4.11 $</h5>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-start">
                            <div class="rounded" style="width: 100px; height: 100px;">
                                <img src="img/featur-2.jpg" class="img-fluid rounded" alt="">
                            </div>
                            <div>
                                <h6 class="mb-2">Big Banana</h6>
                                <div class="d-flex mb-2">
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                                <div class="d-flex mb-2">
                                    <h5 class="fw-bold me-2">2.99 $</h5>
                                    <h5 class="text-danger text-decoration-line-through">4.11 $</h5>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-start">
                            <div class="rounded" style="width: 100px; height: 100px;">
                                <img src="img/featur-3.jpg" class="img-fluid rounded" alt="">
                            </div>
                            <div>
                                <h6 class="mb-2">Big Banana</h6>
                                <div class="d-flex mb-2">
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                                <div class="d-flex mb-2">
                                    <h5 class="fw-bold me-2">2.99 $</h5>
                                    <h5 class="text-danger text-decoration-line-through">4.11 $</h5>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-start">
                            <div class="rounded me-4" style="width: 100px; height: 100px;">
                                <img src="img/vegetable-item-4.jpg" class="img-fluid rounded" alt="">
                            </div>
                            <div>
                                <h6 class="mb-2">Big Banana</h6>
                                <div class="d-flex mb-2">
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                                <div class="d-flex mb-2">
                                    <h5 class="fw-bold me-2">2.99 $</h5>
                                    <h5 class="text-danger text-decoration-line-through">4.11 $</h5>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-start">
                            <div class="rounded me-4" style="width: 100px; height: 100px;">
                                <img src="img/vegetable-item-5.jpg" class="img-fluid rounded" alt="">
                            </div>
                            <div>
                                <h6 class="mb-2">Big Banana</h6>
                                <div class="d-flex mb-2">
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                                <div class="d-flex mb-2">
                                    <h5 class="fw-bold me-2">2.99 $</h5>
                                    <h5 class="text-danger text-decoration-line-through">4.11 $</h5>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-start">
                            <div class="rounded me-4" style="width: 100px; height: 100px;">
                                <img src="img/vegetable-item-6.jpg" class="img-fluid rounded" alt="">
                            </div>
                            <div>
                                <h6 class="mb-2">Big Banana</h6>
                                <div class="d-flex mb-2">
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                                <div class="d-flex mb-2">
                                    <h5 class="fw-bold me-2">2.99 $</h5>
                                    <h5 class="text-danger text-decoration-line-through">4.11 $</h5>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center my-4">
                            <a href="#"
                                class="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Vew
                                More</a>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="position-relative">
                            <img src="img/banner-fruits.jpg" class="img-fluid w-100 rounded" alt="">
                            <div class="position-absolute" style="top: 50%; right: 10px; transform: translateY(-50%);">
                                <h3 class="text-secondary fw-bold">Fresh <br> Fruits <br> Banner</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
    const decrementButton = document.getElementById('decrementButton');
    const incrementButton = document.getElementById('incrementButton');
    const quantityInput = document.getElementById('quantityInput');

    decrementButton.addEventListener('click', decrementQuantity);
    incrementButton.addEventListener('click', incrementQuantity);
    quantityInput.addEventListener('input', function () {
        validateQuantityInput(this);
    });
}

function handleError(error) {
    console.error("Error fetching product detail:", error);
    const productDetailElement = document.getElementById("product-detail");
    productDetailElement
        ? (productDetailElement.innerHTML = "<p>Error fetching product detail</p>")
        : "";
}
