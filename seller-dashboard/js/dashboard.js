document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("You are not logged in. Please log in first.");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/v1/seller/get-product", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const products = await response.json();
            loadProducts(products);
            displayProducts(products);
        } else {
            alert("Failed to fetch products. Please check your login status.");
            console.error("Error:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
});

function loadProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts(products);
}

function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ''; // Clear existing products

    products.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.className = "col-md-4 product-card";

        // Create unique ID for this carousel using both product ID and index
        const uniqueCarouselId = `productCarousel_${product.id}_${index}`;

        // Create indicator buttons for each image
        const indicators = product.imageUrls.map((_, imgIndex) => `
            <button type="button" 
                    data-bs-target="#${uniqueCarouselId}" 
                    data-bs-slide-to="${imgIndex}" 
                    ${imgIndex === 0 ? 'class="active" aria-current="true"' : ''} 
                    aria-label="Slide ${imgIndex + 1}">
            </button>
        `).join('');

        // Create the carousel images
        const images = product.imageUrls.map((url, imgIndex) => `
            <div class="carousel-item ${imgIndex === 0 ? 'active' : ''}">
                <img src="${url}" class="d-block w-100" alt="${product.name} image ${imgIndex + 1}">
            </div>
        `).join('');

        const productCardHTML = `
            <div class="card">
                <div id="${uniqueCarouselId}" class="carousel slide" data-bs-interval="false">
                    <!-- Indicators -->
                    <div class="carousel-indicators">
                        ${indicators}
                    </div>
                    
                    <!-- Images -->
                    <div class="carousel-inner">
                        ${images}
                    </div>
                    
                    <!-- Controls -->
                    <button class="carousel-control-prev" type="button" data-bs-target="#${uniqueCarouselId}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#${uniqueCarouselId}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

                <div class="card-body">
                    <div class="product-details">
                        <h5 class="card-title">${product.name}</h5>
                        <p><strong>Price:</strong> $${product.price}</p>
                        <p><strong>Category:</strong> ${product.category}</p>
                        <p><strong>Stock:</strong> ${product.stock}</p>
                        <p><strong>Description:</strong> ${product.description}</p>
                        <div>
                            <button class="btn btn-warning btn-sm" onclick="editProduct(${product.id})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.name}')">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        productDiv.innerHTML = productCardHTML;
        productList.appendChild(productDiv);

        // Initialize this specific carousel
        const carouselElement = document.getElementById(uniqueCarouselId);
        if (carouselElement) {
            new bootstrap.Carousel(carouselElement, {
                interval: false, // Disable auto sliding
                keyboard: true,  // Allow keyboard navigation
                wrap: true,      // Allow continuous cycling
                pause: 'hover'   // Pause on mouse enter
            });
        }
    });
}   
