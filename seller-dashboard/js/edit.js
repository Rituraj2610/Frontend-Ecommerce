// dashboard.js
function editProduct(productId) {
    // Find the specific product from the products list
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const productToEdit = products.find(product => product.id === productId);
    
    if (productToEdit) {
        // Store the specific product data
        localStorage.setItem("productToEdit", JSON.stringify(productToEdit));
        window.location.href = "edit.html";
    } else {
        alert("Product not found!");
    }
}

// Add this to your product list rendering function
function renderProducts(products) {
    const productList = document.getElementById("productList"); // Adjust ID as needed
    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <!-- Your existing product card HTML -->
            <button onclick="editProduct(${product.id})" class="btn btn-primary">
                Edit
            </button>
        </div>
    `).join("");
}

// edit.js
document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the product data from localStorage
    const product = JSON.parse(localStorage.getItem("productToEdit"));

    // If product data exists, populate the form fields
    if (product) {
        document.getElementById("name").value = product.name;
        document.getElementById("price").value = product.price;
        document.getElementById("category").value = product.category;
        document.getElementById("description").value = product.description;
        document.getElementById("stock").value = product.stock;
        document.getElementById("imageUrls").value = product.imageUrls?.join(", ") || "";
        
        // Store the product ID in a hidden field
        const hiddenIdField = document.createElement("input");
        hiddenIdField.type = "hidden";
        hiddenIdField.id = "productId";
        hiddenIdField.value = product.id;
        document.getElementById("edit-product-form").appendChild(hiddenIdField);
    } else {
        alert("No product data found.");
        window.location.href = "dashboard.html";
        return;
    }

    // Handle form submission
    const form = document.getElementById("edit-product-form");
    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        try {
            // Get the product ID from the hidden field
            const productId = document.getElementById("productId").value;
            
            // Prepare the JSON data
            const updatedProduct = {
                id: parseInt(productId), // Ensure ID is included and is a number
                name: product.name,
                newName: document.getElementById("name").value,
                newPrice: parseFloat(document.getElementById("price").value),
                newCategory: document.getElementById("category").value,
                newDescription: document.getElementById("description").value,
                newStock: parseInt(document.getElementById("stock").value),
                imagesToDelete: document.getElementById("imageUrls").value
                    .split(",")
                    .map(url => url.trim())
                    .filter(url => url !== "")
            };

            // Create FormData object
            const formData = new FormData();

            // Add the JSON data as a Blob
            const jsonBlob = new Blob([JSON.stringify(updatedProduct)], {
                type: 'application/json'
            });
            formData.append("jsonData", jsonBlob);

            // Add images if they exist
            const imageFiles = document.getElementById("images").files;
            if (imageFiles.length > 0) {
                for (let i = 0; i < imageFiles.length; i++) {
                    formData.append("images", imageFiles[i]);
                }
            } else {
                formData.append("images", new Blob([], { type: 'application/octet-stream' }));
            }

            // Send the request
            const response = await fetch("http://localhost:8080/api/v1/seller/product", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: formData
            });

            if (response.ok) {
                // Clear the productToEdit from localStorage
                localStorage.removeItem("productToEdit");
                alert('Product updated successfully!');
                window.location.href = 'dashboard.html';
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update product');
            }

        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product: " + error.message);
        }
    });

    // Add a cleanup function when leaving the page
    window.addEventListener('beforeunload', function() {
        localStorage.removeItem("productToEdit");
    });
});