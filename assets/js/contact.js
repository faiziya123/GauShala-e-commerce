document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
        document.body.classList.toggle('overflow-hidden');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target) && !navMenu.classList.contains('hidden')) {
            navMenu.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    });

    // Form submission handling
    const contactForm = document.querySelector('.php-email-form');
    const loadingDiv = contactForm.querySelector('.loading');
    const errorDiv = contactForm.querySelector('.error-message');
    const sentDiv = contactForm.querySelector('.sent-message');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Show loading message
        loadingDiv.style.display = 'block';
        errorDiv.style.display = 'none';
        sentDiv.style.display = 'none';

        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => formObject[key] = value);

        try {
            // Simulate form submission (replace with actual API endpoint)
            const response = await fetch('forms/contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Hide loading and show success message
            loadingDiv.style.display = 'none';
            sentDiv.style.display = 'block';

            // Reset form
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                sentDiv.style.display = 'none';
            }, 5000);

        } catch (error) {
            // Hide loading and show error message
            loadingDiv.style.display = 'none';
            errorDiv.textContent = 'There was an error sending your message. Please try again.';
            errorDiv.style.display = 'block';
        }
    });

    // Form validation
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.classList.add('invalid');
        });

        input.addEventListener('input', function() {
            if (this.validity.valid) {
                this.classList.remove('invalid');
            }
        });
    });
});