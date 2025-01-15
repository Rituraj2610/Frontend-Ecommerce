// auth.js
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    try {
        const response = await fetch("http://localhost:8080/seller/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        
        if (response.ok) {
            const token = await response.text();
            // Store JWT token in localStorage
            localStorage.setItem("token", token);
            
            // Redirect to dashboard after successful login
            window.location.href = "dashboard.html";
        } else {
            alert("Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred during login.");
    }
});
