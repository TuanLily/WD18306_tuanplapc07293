import fetchData, { API_URL } from './api.js';
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
                                    <button class="btnAddToCart btn border border-secondary rounded-pill px-3 text-primary" data-product-id="${product.id}">
                                        <i class="fa fa-shopping-bag me-2 text-primary"></i>Add to cart
                                    </button>

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
    container ? container.innerHTML = "" : "";
    if (products) {
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
                                <button class="btnAddToCart btn border border-secondary rounded-pill px-3 text-primary" data-product-id="${product.id}">
                                     <i class="fa fa-shopping-bag me-2 text-primary"></i>Thêm giỏ hàng
                                 </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });
    } else {
        console.error('products is undefined or null.');
    }

    //* Sử lý nút thêm giỏ hàng
    // Sau khi HTML được thêm vào container, thêm sự kiện cho nút "Thêm giỏ hàng"
    const addToCartButtons = container.querySelectorAll(".btnAddToCart");

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Lấy data-product-id từ thuộc tính data của button để biết id của sản phẩm
            const productId = parseInt(button.getAttribute("data-product-id"), 10);

            if (!isNaN(productId)) {
                // Nếu productId là một số hợp lệ, thì mới gọi addToCart
                addToCart(productId);
            }

        });
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

            // Nếu trang được tải lại, tự động kích hoạt tab-0 và hiển thị dữ liệu tương ứng
            if (sessionStorage.getItem('isPageReloaded')) {
                allProductsTabLink.click();
                sessionStorage.removeItem('isPageReloaded');
            }

        } else {
            console.error('Cannot find elements with IDs categoryTabs or tabContent');
        }
    } catch (error) {
        console.error('Error fetching category or product data:', error);
    }
});

// Lưu flag isPageReloaded vào sessionStorage khi trang được tải lại
window.onload = function () {
    sessionStorage.setItem('isPageReloaded', 'true');
};


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
    const apiUrl = `${API_URL}/products.json`;

    try {
        const response = await axios.get(apiUrl, {
            params: {
                orderBy: '"id"',
                equalTo: productId,
                print: "pretty"
            }
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const productDataArray = Object.values(response.data); // Chuyển đổi thành mảng
        const productData = productDataArray[0]; // Lấy phần tử đầu tiên (vì chỉ có một phần tử)

        console.log(productData);

        // Lưu ý: Bạn cần xử lý dữ liệu tại đây để trích xuất thông tin cụ thể của sản phẩm

        return productData;
    } catch (error) {
        console.error("Error fetching product detail:", error);
        throw error;
    }
}


// async function fetchProductDetail(productId) {
//     const apiUrl = API_URL + `products/${productId}`;

//     try {
//         const response = await axios.get(apiUrl);

//         if (response.status !== 200) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         return response.data;
//     } catch (error) {
//         console.error("Error fetching product detail:", error);
//         throw error;
//     }
// }

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




//! Làm giỏ hàng
// Hàm để lấy dữ liệu từ API
const fetchProducts = async () => {
    try {
        const response = await fetchData("products");
        const data = await response;
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};


// Sử dụng hàm fetchProducts để lấy dữ liệu
const productsData = await fetchProducts();

// Lưu trữ danh sách sản phẩm trong giỏ hàng trong localStorage
const productInCart = localStorage.getItem("product") ? JSON.parse(localStorage.getItem("product")) : [];

const saveToLocalStorage = () => {
    localStorage.setItem("product", JSON.stringify(productInCart));
}

// Hàm thêm sản phẩm vào giỏ hàng
const addToCart = (id) => {
    let checkProduct = productInCart.some(value => value.id === id);
    if (!checkProduct) {
        // Tìm thông tin sản phẩm từ danh sách sản phẩm theo ID
        let findProduct = productsData.find(product => product.id === id);
        productInCart.unshift({
            ...findProduct,
            quantity: 1
        });
        saveToLocalStorage();
        calculatorTotal();
    } else {
        const getIndex = productInCart.findIndex(value => value.id === id);
        const product = productInCart.find(value => value.id === id);
        productInCart[getIndex] = {
            ...product,
            quantity: ++product.quantity
        };
        saveToLocalStorage();
        calculatorTotal();
    }
};

// Sử lý tăng số lượng sản phẩm trên nút giỏ hàng
let calculatorTotal = () => {
    document.getElementById("total").innerHTML = productInCart.length;
}

let indexLoadPage = () => {
    calculatorTotal();
    displayData();
}

window.onload = () => {
    indexLoadPage();
};
//Xử lý trang giỏ hàng

const updateDataOnBothPages = (data) => {
    // Cập nhật dữ liệu cho trang cart
    if (document.getElementById("products-cart")) {
        document.getElementById("products-cart").innerHTML = data;
    }

    // Cập nhật dữ liệu cho trang checkout
    else if (document.getElementById("infor_Productart")) {
        document.getElementById("infor_Productart").innerHTML = data;
    }
};


const renderProductsCart = () => {
    let data = '';

    productInCart.forEach((value, index) => {
        const viPrice = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        });

        const price = value.price;
        const formattedPrice = viPrice.format(price);

        const total_money = value.quantity * value.price;
        const formatTotalPrice = viPrice.format(total_money);

        data += `
            <tr>
                <th scope="row">
                    <div class="d-flex align-items-center">
                        <img src="img/${value.image}" class="img-fluid me-5 rounded-circle"
                            style="width: 80px; height: 80px;" alt="">
                    </div>
                </th>
                <td>
                    <p class="mb-0 mt-4">${value.name}</p>
                </td>
                <td>
                    <p class="mb-0 mt-4">${formattedPrice}</p>
                </td>
                <td>
                    <div class="input-group quantity mt-4" style="width: 100px;">
                        <div class="input-group-btn">
                            <button  id="minusBtn${index}_${value.quantity}" class="minusBtn btn btn-sm btn-minus rounded-circle bg-light border">
                                <i class="fa fa-minus"></i>
                            </button>
                        </div>
                        <input type="text" id="quantityInput2" class="form-control form-control-sm text-center border-0" value="${value.quantity}">
                        <div class="input-group-btn">
                            <button  id="plusBtn${index}" class="plusBtn btn btn-sm btn-plus rounded-circle bg-light border">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </td>
                <td>
                    <p class="mb-0 mt-4"><strong>${formatTotalPrice}</strong></p>
                </td>
                <td>
                    <button id="deleteProductInCart${index}" class="btn btn-md rounded-circle bg-light border mt-4">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    updateDataOnBothPages(data);
    // Sau khi đã thêm dữ liệu vào DOM, thêm sự kiện cho các nút
    productInCart.forEach((value, index) => {
        document.getElementById(`minusBtn${index}_${value.quantity}`).addEventListener('click', () => minusQuantity(index, value.quantity));
        document.getElementById(`plusBtn${index}`).addEventListener('click', () => plusQuantity(index));
        document.getElementById(`deleteProductInCart${index}`).addEventListener('click', () => deleteProductInCart(index));

    });

    // Bắt sự kiện sau khi tất cả sản phẩm đã được tạo
};




const minusQuantity = (index, quantity) => {
    if (quantity > 1) {
        productInCart[index] = {
            ...productInCart[index],
            quantity: --productInCart[index].quantity
        };
        saveToLocalStorage();
        renderProductsCart();
        totalMoney();
    } else {
        productInCart[index] = {
            ...productInCart[index],
            quantity: 1
        };
        saveToLocalStorage();
        renderProductsCart();
        totalMoney();
    }
}

const plusQuantity = (index) => {
    productInCart[index] = {
        ...productInCart[index],
        quantity: ++productInCart[index].quantity
    };
    saveToLocalStorage();
    renderProductsCart();
    totalMoney()
}

const deleteProductInCart = (index) => {
    productInCart.splice(index, 1);
    saveToLocalStorage();
    renderProductsCart();
    totalMoney();
}
const totalMoney = () => {
    if (productInCart != []) {
        let total = 0;
        for (let i = 0; i < productInCart.length; i++) {
            const total_money = productInCart[i].quantity * productInCart[i].price;
            total += total_money;
        }

        // Định dạng và hiển thị tổng tiền
        const viTotal = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(total);

        const totalMoneyElements = document.querySelectorAll(".total-money");
        totalMoneyElements.forEach(element => {
            element.innerHTML = viTotal;
        });
    }

}

if (document.getElementById("products-cart")) {
    renderProductsCart();
    calculatorTotal();
    totalMoney();

}


//! Xử lý trang chi tiết đơn hàng
const renderCheckout = () => {
    let data = '';
    let total = 0; // Thêm biến total để tính tổng giá trị

    productInCart.forEach((value, index) => {
        const viPrice = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        });

        const price = value.price;
        const formattedPrice = viPrice.format(price);

        const total_money = value.quantity * value.price;
        const formatTotalPrice = viPrice.format(total_money);

        // Thêm giá trị vào total
        total += total_money;

        data += `
            <tr>
                <th scope="row">
                    <div class="d-flex align-items-center mt-2">
                        <img src="img/${value.image}" class="img-fluid rounded-circle"
                            style="width: 90px; height: 90px;" alt="">
                    </div>
                </th>
                <td class="py-5">${value.name}</td>
                <td class="py-5">${formattedPrice}</td>
                <td class="py-5" align="center">${value.quantity}</td>
                <td class="py-5">${formatTotalPrice}</td>
            </tr>
        `;
    });

    // Thêm hàng Subtotal vào cuối biến data
    const viTotal = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(total);

    data += `
        <tr>
            <th scope="row"></th>
            <td class="py-5">
            <p class="mb-0 text-dark py-3">Thành tiền</p>
            </td>
            <td class="py-5"></td>
            <td class="py-5"></td>
            <td class="py-5">
                <div class="py-3 border-bottom border-top">
                    <strong><p class="mb-0 text-dark">${viTotal}</p></strong>
                </div>
            </td>
        </tr>
    `;

    updateDataOnBothPages(data);

    // Bắt sự kiện sau khi tất cả sản phẩm đã được tạo
};
if (document.getElementById("infor_Productart") != null) {
    renderCheckout();
}


// * Xử lý form thông tin giao hàng

// Lắng nghe sự kiện khi người dùng rời khỏi trường input
document.getElementById('fullName').addEventListener('blur', validateFullName);
document.getElementById('address').addEventListener('blur', validateAddress);
document.getElementById('phoneNumber').addEventListener('blur', validatePhoneNumber);
document.getElementById('email').addEventListener('blur', validateEmail);

// Hàm kiểm tra Họ và tên
function validateFullName() {
    const fullName = document.getElementById('fullName').value.trim();
    console.log(fullName);
    const fullNameError = document.getElementById('fullNameError');

    if (fullName === '') {
        fullNameError.textContent = 'Họ và tên không được để trống';
    } else {
        fullNameError.textContent = '';
    }
}

// Hàm kiểm tra Địa chỉ
function validateAddress() {
    const address = document.getElementById('address').value.trim();
    console.log(address);

    const addressError = document.getElementById('addressError');

    if (address === '') {
        addressError.textContent = 'Địa chỉ không được để trống';
    } else {
        addressError.textContent = '';
    }
}

// Hàm kiểm tra Số điện thoại
function validatePhoneNumber() {
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    console.log(phoneNumber);
    const phoneNumberError = document.getElementById('phoneNumberError');

    if (phoneNumber === '') {
        phoneNumberError.textContent = 'Số điện thoại không được để trống';
    } else {
        phoneNumberError.textContent = '';
    }
}

// Hàm kiểm tra Email
function validateEmail() {
    const email = document.getElementById('email').value.trim();
    console.log(email);
    const emailError = document.getElementById('emailError');

    if (email === '') {
        emailError.textContent = 'Email không được để trống';
    } else {
        emailError.textContent = '';
    }
}

