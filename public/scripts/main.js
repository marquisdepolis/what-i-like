// main.js

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login');
    const registerButton = document.getElementById('register');
    const authHelloDevButton = document.getElementById('auth-hello-dev');
    const productForm = document.getElementById('product-form');
    const productInputSection = document.getElementById('product-input-section');

    // Function to update UI after login
    function updateUIAfterLogin() {
        productInputSection.style.display = 'block';
    }

    // Function to handle authentication with hello.dev
    function authenticateWithHelloDev() {
        hello('hello_dev').login().then(
            function(auth) {
                // Authentication success
                console.log('You are logged in to hello.dev');
                updateUIAfterLogin();
            },
            function(e) {
                // Authentication error
                console.error('Signin error: ' + e.error.message);
            }
        );
    }

    // Event listener for hello.dev authentication
    authHelloDevButton.addEventListener('click', function() {
        authenticateWithHelloDev();
    });

    // Event listener for login button
    loginButton.addEventListener('click', function() {
        // Implement login functionality
        console.log('Login functionality to be implemented');
    });

    // Event listener for register button
    registerButton.addEventListener('click', function() {
        // Implement register functionality
        console.log('Register functionality to be implemented');
    });

    // Event listener for product form submission
    productForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Collect product information
        const productName = document.getElementById('product-name').value;
        const productCategory = document.getElementById('product-category').value;
        const productLink = document.getElementById('product-link').value;
        const productDescription = document.getElementById('product-description').value;

        // Send product information to the server
        fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') // Assuming the token is stored in localStorage
            },
            body: JSON.stringify({
                name: productName,
                category: productCategory,
                link: productLink,
                description: productDescription
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Product added:', data);
            // Clear the form
            productForm.reset();
            // Optionally, update the UI to show the added product
        })
        .catch(error => {
            console.error('Error adding product:', error);
        });
    });

    // Function to populate categories dynamically (assuming an endpoint /api/categories exists)
    function populateCategories() {
        fetch('/api/categories', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token') // Assuming the token is stored in localStorage
            }
        })
        .then(response => response.json())
        .then(categories => {
            const categorySelect = document.getElementById('product-category');
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id; // Assuming each category has an id
                option.textContent = category.name; // Assuming each category has a name
                categorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
    }

    // Call the function to populate categories on page load
    populateCategories();
});
