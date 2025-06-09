document.addEventListener('DOMContentLoaded', function() {
    // Get the hamburger button and mobile menu
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle mobile menu when hamburger is clicked
    hamburgerBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('show');
        // Toggle the hamburger icon class
        const icon = hamburgerBtn.querySelector('i');
        if (mobileMenu.classList.contains('show')) {
            icon.classList.remove('bi-list');
            icon.classList.add('bi-x');
        } else {
            icon.classList.remove('bi-x');
            icon.classList.add('bi-list');
        }
    });

    // Handle dropdown toggles on mobile
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('a');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                dropdown.classList.toggle('dropdown-open');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('show');
            const icon = hamburgerBtn.querySelector('i');
            icon.classList.remove('bi-x');
            icon.classList.add('bi-list');
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            mobileMenu.classList.remove('show');
            const icon = hamburgerBtn.querySelector('i');
            icon.classList.remove('bi-x');
            icon.classList.add('bi-list');
            // Remove dropdown-open class from all dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('dropdown-open');
            });
        }
    });
});