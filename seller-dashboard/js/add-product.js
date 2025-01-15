document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addProductForm');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const categoryDropdown = document.getElementById('category'); // Get the dropdown element

    // Array to hold selected images
    const images = [];

    // Preview images when selected
    imageUpload.addEventListener('change', function(event) {
        imagePreview.innerHTML = ''; // Clear existing previews
        images.length = 0; // Clear the images array

        const files = event.target.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                images.push(file); // Add file to images array

                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.className = 'preview-image';
                    imagePreview.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        }
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Reset error messages
        document.querySelectorAll('.error-message').forEach(elem => {
            elem.style.display = 'none';
        });

        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const category = categoryDropdown.value; // Use the value of categoryDropdown
        const stock = document.getElementById('stock').value;
        const description = document.getElementById('description').value;

        // Validate form inputs
        let isValid = true;

        if (!category) {
            document.getElementById('categoryError').style.display = 'block';
            isValid = false;
        }
        if (!images.length) {
            document.getElementById('imageError').style.display = 'block';
            isValid = false;
        }
        if (!name) {
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        }
        if (!price || price <= 0) {
            document.getElementById('priceError').style.display = 'block';
            isValid = false;
        }
        if (!stock || stock < 0) {
            document.getElementById('stockError').style.display = 'block';
            isValid = false;
        }
        if (!description) {
            document.getElementById('descriptionError').style.display = 'block';
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        // Create FormData object
        const formData = new FormData();
        const productData = {
            name: name,
            price: parseFloat(price),
            category: category,
            stock: parseInt(stock),
            description: description
        };

        // Add JSON data as a Blob with explicit MIME type
        const jsonBlob = new Blob([JSON.stringify(productData)], { type: 'application/json' });
        formData.append('jsonData', jsonBlob, "productData.json");

        // Add images to FormData
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You are not logged in. Please log in first.');
                window.location.href = 'login.html';
                return;
            }

            const response = await fetch('http://localhost:8080/api/v1/seller/product', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                alert('Product added successfully!');
                // window.location.href = 'dashboard.html';
            } else {
                const errorData = await response.text();
                alert(`Failed to add product: ${errorData}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add product. Please try again.');
        }
    });
});
